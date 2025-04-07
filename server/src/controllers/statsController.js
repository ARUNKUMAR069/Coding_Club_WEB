const Member = require('../models/Member');
const Event = require('../models/Event');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/stats
 * @access  Private/Admin
 */
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total members count
    const totalMembers = await Member.countDocuments();
    
    // Get active members count
    const activeMembers = await Member.countDocuments({ active: true });
    
    // Get upcoming events count
    const upcomingEvents = await Event.countDocuments({ status: 'upcoming' });
    
    // Get total events count
    const totalEvents = await Event.countDocuments();
    
    // Get total gallery photos (across all events)
    const events = await Event.find({}, 'photos');
    const totalGalleryItems = events.reduce((total, event) => {
      return total + (event.photos ? event.photos.length : 0);
    }, 0);
    
    // Get member registration stats (past 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const memberJoinsByMonth = await Member.aggregate([
      {
        $match: {
          joinDate: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$joinDate" },
            month: { $month: "$joinDate" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);
    
    // Format member joins by month for charts
    const memberJoinsData = {
      labels: [],
      data: []
    };
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Fill in data for past 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth() + 1; // JS months are 0-based
      
      // Add label
      memberJoinsData.labels.push(months[month - 1]);
      
      // Find data for this month
      const found = memberJoinsByMonth.find(
        item => item._id.year === year && item._id.month === month
      );
      
      memberJoinsData.data.push(found ? found.count : 0);
    }
    
    // Get event attendance stats
    const eventRegistrationsByMonth = await Event.aggregate([
      {
        $match: {
          date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          count: { $sum: { $size: "$registrations" } }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);
    
    // Format event registrations by month for charts
    const eventRegistrationsData = {
      labels: memberJoinsData.labels, // Reuse the same labels
      data: []
    };
    
    // Fill in data for past 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      
      // Find data for this month
      const found = eventRegistrationsByMonth.find(
        item => item._id.year === year && item._id.month === month
      );
      
      eventRegistrationsData.data.push(found ? found.count : 0);
    }
    
    // Get recent members
    const recentMembers = await Member.find()
      .sort({ joinDate: -1 })
      .limit(5)
      .select('firstName lastName role email joinDate active');
    
    // Get upcoming events
    const upcomingEventsList = await Event.find({ status: 'upcoming' })
      .sort({ date: 1 })
      .limit(5)
      .select('title description date location capacity registrations');
    
    // Return all stats
    res.status(200).json({
      success: true,
      data: {
        totalMembers,
        activeMembers,
        upcomingEvents,
        totalEvents,
        totalGalleryItems,
        memberJoinsData,
        eventRegistrationsData,
        recentMembers,
        upcomingEvents: upcomingEventsList
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};