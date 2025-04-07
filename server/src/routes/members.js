const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { protect, authorize } = require('../middleware/auth');

// Get all members
router.get('/', protect, memberController.getMembers);

// Get a single member by ID
router.get('/:id', protect, memberController.getMember);

// Create a new member
router.post('/', protect, authorize('admin'), memberController.createMember);

// Update a member by ID
router.put('/:id', protect, authorize('admin'), memberController.updateMember);

// Delete a member by ID
router.delete('/:id', protect, authorize('admin'), memberController.deleteMember);

module.exports = router;