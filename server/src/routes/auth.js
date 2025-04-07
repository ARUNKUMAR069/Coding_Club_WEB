const express = require('express');
const { login, getMe, seedUsers } = require('../controllers/authController');
const passport = require('passport');

const router = express.Router();

// Routes
router.post('/login', login);
router.get('/me', passport.authenticate('jwt', { session: false }), getMe);

// Development route for creating test users (remove in production)
router.post('/seed', seedUsers);

module.exports = router;