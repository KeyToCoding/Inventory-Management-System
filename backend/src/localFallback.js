const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getInitialData() {
  return {
    users: [
      {
        _id: 'user_admin_01',
        name: 'CDO Office',
        email: 'cdo@gmail.com',
        password: 'CDO',
        role: 'admin',
        status: 'active',
        company: 'Ayodhya SHG Management',
        phone: '9876543210',
        address: {
          street: 'Civil Lines',
          city: 'Ayodhya',
          state: 'Uttar Pradesh',
          zipCode: '224001',
          country: 'India'
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: 'user_reg_02',
        name: 'Regular User',
        email: 'user@scanify.com',
        password: 'user123',
        role: 'user',
        status: 'active',
        company: 'Scanify',
        phone: '1234567890',
        address: {
          street: 'Market Road',
          city: 'Ayodhya',
          state: 'Uttar Pradesh',
          zipCode: '224001',
          country: 'India'
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: 'user_reg_03',
        name: 'Ayodhya User',
        email: 'its@ayodhya',
        password: 'Jayshreeram',
        role: 'user',
        status: 'active',
        company: 'Ayodhya SHG',
        phone: '1234567890',
        address: {
          street: 'Temple View',
          city: 'Ayodhya',
          state: 'Uttar Pradesh',
          zipCode: '224001',
          country: 'India'
        },
        createdAt: new Date().toISOString()
      }
    ],
    products: [
      {
        _id: 'prod_001',
        productId: 'SHG-001',
        name: 'Ayodhya Terracotta Diya Set',
        price: 150,
        stock: 50,
        category: 'Handicrafts',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'prod_002',
        productId: 'SHG-002',
        name: 'Organic Jaggery (Gur) 1kg',
        price: 80,
        stock: 100,
        category: 'Food',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'prod_003',
        productId: 'SHG-003',
        name: 'Handcrafted Incense Sticks (AgProject)',
        price: 45,
        stock: 200,
        category: 'Pooja Items',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        _id: 'prod_004',
        productId: 'SHG-004',
        name: 'Pure Khadi Cotton Scarf',
        price: 350,
        stock: 35,
        category: 'Textiles',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    invoices: [
      {
        _id: 'inv_001',
        invoiceNumber: 'INV-1001',
        amount: 150,
        date: new Date().toISOString(),
        time: '12:00 PM',
        status: 'paid',
        paymentDate: new Date().toISOString(),
        paymentTime: '12:00 PM',
        createdBy: {
          _id: 'user_admin_01',
          name: 'CDO Office',
          email: 'cdo@gmail.com'
        },
        items: [
          {
            productId: {
              _id: 'prod_001',
              name: 'Ayodhya Terracotta Diya Set',
              price: 150
            },
            quantity: 1,
            price: 150
          }
        ]
      }
    ],
    bills: []
  };
}

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Failed reading DB file, resetting to initial data:', err);
    return getInitialData();
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed writing DB file:', err);
  }
}

// Local Auth Middleware
function localAuth(req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

// Local Admin Middleware
function localAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
  next();
}

/* ==========================================================================
   AUTH ROUTES (/api/auth)
   ========================================================================== */

// GET /api/auth/users
router.get('/auth/users', [localAuth, localAdmin], (req, res) => {
  const db = readDb();
  const safeUsers = db.users.map(({ password, ...u }) => u);
  res.json(safeUsers);
});

// POST /api/auth/login
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const db = readDb();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: {
      id: user._id,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    }
  });
});

// POST /api/auth/register
router.post('/auth/register', (req, res) => {
  const { name, email, password, company, phone, address, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const db = readDb();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    _id: 'user_' + Date.now(),
    name,
    email: email.toLowerCase(),
    password,
    role: role || 'user',
    status: 'active',
    company: company || '',
    phone: phone || '',
    address: address || {},
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  writeDb(db);

  const token = jwt.sign(
    { userId: newUser._id, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status
    }
  });
});

// GET /api/auth/me
router.get('/auth/me', localAuth, (req, res) => {
  const db = readDb();
  const user = db.users.find(u => u._id === req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { password, ...safeUser } = user;
  res.json({ user: safeUser });
});

// PATCH /api/auth/users/:id/status
router.patch('/auth/users/:id/status', [localAuth, localAdmin], (req, res) => {
  const db = readDb();
  const user = db.users.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.status = req.body.status;
  writeDb(db);
  const { password, ...safeUser } = user;
  res.json(safeUser);
});

// PUT /api/auth/users/:id
router.put('/auth/users/:id', [localAuth, localAdmin], (req, res) => {
  const db = readDb();
  const user = db.users.find(u => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { name, email, role, status, company, phone, address } = req.body;
  if (name) user.name = name;
  if (email) user.email = email.toLowerCase();
  if (role) user.role = role;
  if (status) user.status = status;
  if (company) user.company = company;
  if (phone) user.phone = phone;
  if (address) user.address = address;

  writeDb(db);
  const { password, ...safeUser } = user;
  res.json(safeUser);
});

// DELETE /api/auth/users/:id
router.delete('/auth/users/:id', [localAuth, localAdmin], (req, res) => {
  const db = readDb();
  const initialLen = db.users.length;
  db.users = db.users.filter(u => u._id !== req.params.id);
  if (db.users.length === initialLen) {
    return res.status(404).json({ message: 'User not found' });
  }
  writeDb(db);
  res.json({ message: 'User deleted successfully' });
});

/* ==========================================================================
   PRODUCT ROUTES (/api/products)
   ========================================================================== */

// GET /api/products
router.get('/products', localAuth, (req, res) => {
  const db = readDb();
  res.json(db.products);
});

// GET /api/products/search
router.get('/products/search', localAuth, (req, res) => {
  const query = (req.query.q || '').toLowerCase();
  const db = readDb();
  const filtered = db.products.filter(p =>
    (p.productId && p.productId.toLowerCase().includes(query)) ||
    (p.name && p.name.toLowerCase().includes(query)) ||
    (p.category && p.category.toLowerCase().includes(query))
  );
  res.json(filtered);
});

// GET /api/products/:id
router.get('/products/:id', localAuth, (req, res) => {
  const db = readDb();
  const product = db.products.find(p => p._id === req.params.id || p.productId === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// POST /api/products
router.post('/products', localAuth, (req, res) => {
  const { productId, name, price, stock, category } = req.body;
  if (!productId || !name || price === undefined || stock === undefined || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const db = readDb();
  if (db.products.some(p => p.productId === productId)) {
    return res.status(400).json({ message: 'Product ID already exists' });
  }

  const newProduct = {
    _id: 'prod_' + Date.now(),
    productId,
    name,
    price: Number(price),
    stock: Number(stock),
    category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.products.unshift(newProduct);
  writeDb(db);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put('/products/:id', localAuth, (req, res) => {
  const db = readDb();
  const product = db.products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { productId, name, price, stock, category } = req.body;
  if (productId && productId !== product.productId) {
    if (db.products.some(p => p.productId === productId && p._id !== req.params.id)) {
      return res.status(400).json({ message: 'Product ID already exists' });
    }
    product.productId = productId;
  }
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (category !== undefined) product.category = category;
  product.updatedAt = new Date().toISOString();

  writeDb(db);
  res.json(product);
});

// DELETE /api/products/:id
router.delete('/products/:id', localAuth, (req, res) => {
  const db = readDb();
  const initialLen = db.products.length;
  db.products = db.products.filter(p => p._id !== req.params.id);
  if (db.products.length === initialLen) {
    return res.status(404).json({ message: 'Product not found' });
  }
  writeDb(db);
  res.json({ message: 'Product deleted successfully' });
});

/* ==========================================================================
   BILLING & INVOICE ROUTES (/api/billing)
   ========================================================================== */

// GET /api/billing/invoices
router.get('/billing/invoices', [localAuth, localAdmin], (req, res) => {
  const db = readDb();
  res.json(db.invoices);
});

// GET /api/billing/invoices/recent
router.get('/billing/invoices/recent', localAuth, (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const db = readDb();
  const sorted = [...db.invoices].sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(sorted.slice(0, limit));
});

// GET /api/billing/invoices/:id
router.get('/billing/invoices/:id', localAuth, (req, res) => {
  const db = readDb();
  const inv = db.invoices.find(i => i._id === req.params.id);
  if (!inv) {
    return res.status(404).json({ message: 'Invoice not found' });
  }
  res.json(inv);
});

// POST /api/billing/invoices
router.post('/billing/invoices', localAuth, (req, res) => {
  const { amount, items, status, dueDate, time } = req.body;
  if (!amount || !items || !items.length) {
    return res.status(400).json({ message: 'Missing required fields: amount and items' });
  }

  const db = readDb();
  // Validate and update stock
  for (const item of items) {
    const pId = typeof item.productId === 'object' ? item.productId._id : item.productId;
    const prod = db.products.find(p => p._id === pId || p.productId === pId);
    if (!prod) {
      return res.status(404).json({ message: `Product not found: ${pId}` });
    }
    if (prod.stock < item.quantity) {
      return res.status(400).json({ message: `Insufficient stock for product: ${prod.name}` });
    }
    prod.stock -= item.quantity;
  }

  const currentUser = db.users.find(u => u._id === req.user.userId) || {
    _id: req.user.userId,
    name: 'User',
    email: 'user@example.com'
  };

  const newInvoice = {
    _id: 'inv_' + Date.now(),
    invoiceNumber: `INV-${Date.now()}`,
    amount: Number(amount),
    items: items.map(item => {
      const pId = typeof item.productId === 'object' ? item.productId._id : item.productId;
      const prod = db.products.find(p => p._id === pId || p.productId === pId);
      return {
        productId: {
          _id: prod ? prod._id : pId,
          name: prod ? prod.name : 'Unknown Product',
          price: prod ? prod.price : item.price
        },
        quantity: item.quantity,
        price: item.price
      };
    }),
    date: new Date().toISOString(),
    time: time || new Date().toLocaleTimeString(),
    dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    status: status || 'paid',
    paymentDate: (status === 'paid' || !status) ? new Date().toISOString() : undefined,
    paymentTime: (status === 'paid' || !status) ? new Date().toLocaleTimeString() : undefined,
    createdBy: {
      _id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email
    }
  };

  db.invoices.unshift(newInvoice);
  writeDb(db);
  res.status(201).json(newInvoice);
});

// PATCH /api/billing/invoices/:id/status
router.patch('/billing/invoices/:id/status', localAuth, (req, res) => {
  const { status } = req.body;
  const db = readDb();
  const inv = db.invoices.find(i => i._id === req.params.id);
  if (!inv) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  inv.status = status;
  if (status === 'paid') {
    inv.paymentDate = new Date().toISOString();
    inv.paymentTime = new Date().toLocaleTimeString();
  }

  writeDb(db);
  res.json(inv);
});

// DELETE /api/billing/invoices/:id
router.delete('/billing/invoices/:id', localAuth, (req, res) => {
  const db = readDb();
  const initialLen = db.invoices.length;
  db.invoices = db.invoices.filter(i => i._id !== req.params.id);
  if (db.invoices.length === initialLen) {
    return res.status(404).json({ message: 'Invoice not found' });
  }
  writeDb(db);
  res.json({ message: 'Invoice deleted successfully' });
});

// GET /api/billing
router.get('/billing', localAuth, (req, res) => {
  const db = readDb();
  const bills = (db.bills || []).filter(b => b.user === req.user.userId);
  res.json(bills);
});

module.exports = router;
