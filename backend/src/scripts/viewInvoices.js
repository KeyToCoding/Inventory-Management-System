const mongoose = require('mongoose');
const Invoice = require('../models/Invoice');
require('dotenv').config();

async function viewInvoices() {
  try {
    // Connect to MongoDB
    const uri = process.env.MONGODB_URI || 'mongodb+srv://yadavanubhav848:alm15lfJPPtmob4k@cluster0.szpod3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Get all invoices
    const invoices = await Invoice.find()
      .populate('createdBy', 'name email')
      .populate('items.productId', 'name price');

    console.log('\nInvoices in database:');
    console.log('=====================');
    
    if (invoices.length === 0) {
      console.log('No invoices found in the database.');
    } else {
      invoices.forEach((invoice, index) => {
        console.log(`\nInvoice ${index + 1}:`);
        console.log(`ID: ${invoice._id}`);
        console.log(`Customer: ${invoice.customer}`);
        console.log(`Amount: ₹${invoice.amount.toFixed(2)}`);
        console.log(`Date: ${invoice.date}`);
        console.log(`Status: ${invoice.status}`);
        console.log(`Created By: ${invoice.createdBy?.name || 'Unknown'}`);
        console.log('\nItems:');
        invoice.items.forEach((item, itemIndex) => {
          console.log(`  ${itemIndex + 1}. ${item.productId?.name || 'Unknown Product'}`);
          console.log(`     Quantity: ${item.quantity}`);
          console.log(`     Price: ₹${item.price.toFixed(2)}`);
        });
        console.log('---------------------');
      });
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

viewInvoices(); 
