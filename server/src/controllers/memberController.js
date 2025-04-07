const Member = require('../models/Member');
const User = require('../models/User');
const { generatePassword } = require('../utils/passwordGenerator');

// @desc    Get all members
// @route   GET /api/members
// @access  Private/Admin
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ joinDate: -1 });
    
    res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Private
exports.getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Check if user is admin or the member themselves
    if (req.user.role !== 'admin' && req.user.memberId.toString() !== member._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this member'
      });
    }

    res.status(200).json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Get member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new member
// @route   POST /api/members
// @access  Private/Admin
exports.createMember = async (req, res) => {
  try {
    // Extract member data
    const { firstName, lastName, email, role: memberRole, skills } = req.body;
    const createAccount = req.body.createAccount || false;
    
    // Create member
    const member = await Member.create({
      firstName,
      lastName,
      email,
      role: memberRole,
      skills: skills || []
    });
    
    // If createAccount flag is true, create user account
    if (createAccount) {
      // Generate username (firstName_lastName)
      const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;
      
      // Generate random password
      const password = generatePassword();
      
      // Create user
      const user = await User.create({
        username,
        password,
        role: 'member',
        memberId: member._id
      });
      
      return res.status(201).json({
        success: true,
        data: member,
        user: {
          username,
          password, // Only return password once when creating account
          role: 'member'
        },
        message: 'Member created with user account'
      });
    }
    
    res.status(201).json({
      success: true,
      data: member,
      message: 'Member created successfully'
    });
  } catch (error) {
    console.error('Create member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Private/Admin
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }
    
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: updatedMember
    });
  } catch (error) {
    console.error('Update member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Private/Admin
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }
    
    // Delete associated user account if exists
    await User.findOneAndDelete({ memberId: member._id });
    
    // Delete member
    await member.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};