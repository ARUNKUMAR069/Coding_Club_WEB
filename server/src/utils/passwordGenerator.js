const crypto = require('crypto');

/**
 * Utility to generate secure random passwords
 */

// Generate a random password with specified options
exports.generatePassword = (options = {}) => {
  const length = options.length || 10;
  const useUppercase = options.useUppercase !== false; // Default to true
  const useLowercase = options.useLowercase !== false; // Default to true
  const useNumbers = options.useNumbers !== false; // Default to true
  const useSpecials = options.useSpecials !== false; // Default to true
  
  // Character sets
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXY';
  const lowercase = 'abcdefghijkmnopqrstuvwxyz';
  const numbers = '23456789';
  const special = '!@#$%^&*_-+=';
  
  // Combine selected character sets
  let chars = '';
  if (useLowercase) chars += lowercase;
  if (useUppercase) chars += uppercase;
  if (useNumbers) chars += numbers;
  if (useSpecials) chars += special;
  
  // Generate password
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return password;
};

// Generate a username based on name
exports.generateUsername = (firstName, lastName, options = {}) => {
  const useNumbers = options.useNumbers !== false;
  
  // Create base username
  let username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
  
  // Add random number if required
  if (useNumbers) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    username += randomNum;
  }
  
  return username;
};