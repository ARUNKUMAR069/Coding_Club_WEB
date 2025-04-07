import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  FiSave, 
  FiX, 
  FiCalendar, 
  FiMapPin, 
  FiUsers, 
  FiCheckSquare,
  FiImage,
  FiInfo
} from 'react-icons/fi';

const EventForm = ({ event, isEditing = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    status: 'upcoming',
    capacity: '',
    coverImage: '',
    organizer: ''
  });
  
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Available statuses
  const statuses = ['upcoming', 'ongoing', 'completed', 'cancelled'];
  
  // Populate form if editing
  useEffect(() => {
    if (isEditing && event) {
      const eventDate = event.date 
        ? new Date(event.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: eventDate,
        location: event.location || '',
        status: event.status || 'upcoming',
        capacity: event.capacity || '',
        coverImage: event.coverImage || '',
        organizer: event.organizer?._id || event.organizer || ''
      });
    }
    
    fetchOrganizers();
  }, [event, isEditing]);
  
  const fetchOrganizers = async () => {
    try {
      const response = await axios.get('/api/members?active=true');
      setOrganizers(response.data.data);
    } catch (err) {
      console.error('Error fetching organizers:', err);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseInt(value, 10) : '') : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (isEditing && event) {
        // Update existing event
        await axios.put(`/api/events/${event._id}`, formData);
        setSuccess('Event updated successfully!');
      } else {
        // Create new event
        await axios.post('/api/events', formData);
        setSuccess('Event created successfully!');
      }
      
      setTimeout(() => {
        navigate('/admin/events');
      }, 1500);
    } catch (err) {
      console.error('Error saving event:', err);
      setError(err.response?.data?.message || 'An error occurred while saving the event.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          {isEditing ? 'Edit Event' : 'Add New Event'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          {isEditing ? 'Update the event information' : 'Enter the details for the new event'}
        </p>
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mb-6 bg-red-50 dark:bg-red-900/30 p-4 rounded-md"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <FiX className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        </motion.div>
      )}
      
      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mb-6 bg-green-50 dark:bg-green-900/30 p-4 rounded-md"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <FiCheckSquare className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">{success}</p>
            </div>
          </div>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Title */}
            <div className="sm:col-span-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>
            
            {/* Description */}
            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>
            
            {/* Date */}
            <div className="sm:col-span-3">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Event Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>
            
            {/* Location */}
            <div className="sm:col-span-3">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  placeholder="Room 301, Tech Building"
                />
              </div>
            </div>
            
            {/* Status */}
            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <div className="mt-1">
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Capacity */}
            <div className="sm:col-span-3">
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Capacity
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUsers className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  placeholder="Max number of participants"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Leave empty for unlimited capacity
              </p>
            </div>
            
            {/* Cover Image URL */}
            <div className="sm:col-span-6">
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cover Image URL
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiImage className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="coverImage"
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Optional: URL to an image for the event
              </p>
            </div>
            
            {/* Organizer */}
            <div className="sm:col-span-6">
              <label htmlFor="organizer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Organizer
              </label>
              <div className="mt-1">
                <select
                  id="organizer"
                  name="organizer"
                  required
                  value={formData.organizer}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                >
                  <option value="">Select an organizer</option>
                  {organizers.map((organizer) => (
                    <option key={organizer._id} value={organizer._id}>
                      {organizer.firstName} {organizer.lastName} - {organizer.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
          <button
            type="button"
            onClick={() => navigate('/admin/events')}
            className="inline-flex justify-center mr-3 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="mr-2 -ml-1 h-4 w-4" />
                {isEditing ? 'Update Event' : 'Save Event'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;