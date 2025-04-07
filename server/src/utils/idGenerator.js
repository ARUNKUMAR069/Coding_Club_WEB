/**
 * Utility to generate unique IDs
 */
const { nanoid } = require('nanoid');

// Generate club member ID with CC prefix (e.g., CC12AB34)
exports.generateMemberId = () => {
  return `CC${nanoid(6).toUpperCase()}`;
};

// Generate event ID with prefix (e.g., EVENT-2023-AB12CD)
exports.generateEventId = () => {
  const year = new Date().getFullYear();
  return `EVENT-${year}-${nanoid(6).toUpperCase()}`;
};