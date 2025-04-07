const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const MemberSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    default: () => `CC${nanoid(6).toUpperCase()}`,
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['President', 'Vice President', 'Secretary', 'Treasurer', 'Member', 'Mentor'],
    default: 'Member',
  },
  skills: [String],
  joinDate: {
    type: Date,
    default: Date.now,
  },
  profileImage: {
    type: String,
    default: 'default.jpg',
  },
  bio: {
    type: String,
    default: '',
  },
  projects: [{
    title: String,
    description: String,
    link: String,
  }],
  achievements: [{
    title: String,
    date: Date,
    description: String,
  }],
  active: {
    type: Boolean,
    default: true,
  },
});

// Create full name virtual
MemberSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Enable virtuals in JSON
MemberSchema.set('toJSON', { virtuals: true });
MemberSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Member', MemberSchema);