const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function updateUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://yadavanubhav848:alm15lfJPPtmob4k@cluster0.szpod3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');

    // Delete all existing users
    await User.deleteMany({});
    console.log('Deleted all existing users');

    // Create new user with updated credentials
    const newUser = new User({
      name: 'User',
      email: 'ayodhyashg04@gmail.com',
      password: 'shgayodhya',
      role: 'user'
    });

    await newUser.save();
    console.log('Created new user with updated credentials');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

updateUser(); 
