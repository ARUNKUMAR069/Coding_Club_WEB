/**
 * Script to initialize the database with an admin user
 */
const mongoose = require('mongoose');
const User = require('../models/User');
const Member = require('../models/Member');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/coding-club');
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping creation.');
      await mongoose.disconnect();
      return;
    }
    
    console.log('Creating admin member profile...');
    // Create admin member
    const adminMember = new Member({
      firstName: 'Admin',
      lastName: 'User',
      email: process.env.ADMIN_EMAIL || 'admin@codingclub.com',
      role: 'President',
      skills: ['Leadership', 'Web Development', 'Programming'],
      active: true
    });
    
    await adminMember.save();
    
    console.log('Creating admin user account...');
    // Create admin user
    const adminUser = new User({
      username: 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin',
      memberId: adminMember._id
    });
    
    await adminUser.save();
    
    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: ' + (process.env.ADMIN_PASSWORD || 'admin123'));
    
    await mongoose.disconnect();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();