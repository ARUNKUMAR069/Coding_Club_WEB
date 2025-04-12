const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('./config/passport');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Import route files
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const eventRoutes = require('./routes/events');

// Create Express app
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's URL
  credentials: true
}));

// Initialize Passport
app.use(passport.initialize());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/events', eventRoutes);

// Error handler middleware
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/coding-club', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4 // Force IPv4
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
  });

  app.get('/', (req, res) => {
    res.send('API is running...');
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});