const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET || 'nalaladnjnijnwninvinisvnihwnvhunwhduvnuhncvhudnvhudnhuvbushvuhsh',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// @desc    Login user using passport
// @route   POST /api/auth/login
// @access  Public
exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Passport authentication error:', err);
      return next(err);
    }
    
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.status(401).json({
        success: false,
        message: info.message || 'Invalid credentials'
      });
    }

    // User authenticated, generate token
    const token = generateToken(user._id);
    
    // Return user and token
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  })(req, res, next);
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = (req, res) => {
  // User is already available in req.user thanks to passport-jwt
  return res.status(200).json({
    success: true,
    data: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      profileImage: req.user.profileImage,
      bio: req.user.bio,
      skills: req.user.skills
    }
  });
};

// @desc    Create test users for development
// @route   POST /api/auth/seed
// @access  Public (Remove in production!)
exports.seedUsers = async (req, res) => {
  try {
    const users = [
      {
        username: "admin",
        email: "admin@codingclub.com",
        password: "Admin@123!",
        role: "admin",
        active: true,
        profileImage: "/images/profiles/admin.jpg",
        bio: "Coding Club Administrator",
        skills: ["JavaScript", "React", "Node.js"]
      },
      {
        username: "student2025",
        email: "member@codingclub.com",
        password: "Student@123!",
        role: "member",
        active: true,
        profileImage: "/images/profiles/default.jpg",
        bio: "Coding Club Member",
        skills: ["HTML", "CSS", "JavaScript"]
      }
    ];

    // Clear existing users (optional, remove if you don't want to clear)
    // await User.deleteMany({});

    // Create new users
    await User.create(users);

    res.status(201).json({
      success: true,
      message: 'Test users created successfully'
    });
  } catch (error) {
    console.error('Error creating test users:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating test users'
    });
  }
};