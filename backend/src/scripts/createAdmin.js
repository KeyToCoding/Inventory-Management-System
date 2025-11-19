const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://yadavanubhav848:alm15lfJPPtmob4k@cluster0.szpod3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'CDOayodhya@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create new admin user
    const adminUser = new User({
      name: 'CDO Office',
      email: 'CDOayodhya@gmail.com',
      password: 'CDOOFFICE',
      role: 'admin',
      company: 'Ayodhya SHG Management',
      phone: 'N/A',
      address: {
        street: 'N/A',
        city: 'Ayodhya',
        state: 'Uttar Pradesh',
        zipCode: 'N/A',
        country: 'India'
      }
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser(); 
