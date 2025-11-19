const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

async function deleteAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://yadavanubhav848:alm15lfJPPtmob4k@cluster0.szpod3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');

    // Delete admin user
    await User.deleteOne({ email: 'cdo@ayodhya' });
    console.log('Admin user deleted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error deleting admin user:', error);
    process.exit(1);
  }
}

deleteAdminUser(); 
