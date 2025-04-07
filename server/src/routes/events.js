const express = require('express');
const { 
  getEvents, 
  getEvent, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  registerForEvent,
  addEventPhotos
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, authorize('admin'), createEvent);

router.route('/:id')
  .get(getEvent)
  .put(protect, authorize('admin'), updateEvent)
  .delete(protect, authorize('admin'), deleteEvent);

router.post('/:id/register', protect, registerForEvent);
router.post('/:id/photos', protect, authorize('admin'), addEventPhotos);

module.exports = router;