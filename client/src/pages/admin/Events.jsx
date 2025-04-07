import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiAlertCircle,
  FiCalendar, FiClock, FiMapPin, FiUsers, FiFilter, FiCheckCircle
} from 'react-icons/fi';

const EventsAdminPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const location = useLocation();

  // Load events
  useEffect(() => {
    fetchEvents();
    // Check for notification from state (e.g., after deletion)
    if (location.state?.message) {
      setNotification(location.state.message);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Filter events when search term or status filter changes
  useEffect(() => {
    if (events.length > 0) {
      let result = [...events];

      // Filter by status
      if (statusFilter !== 'all') {
        result = result.filter(event => event.status === statusFilter);
      }

      // Filter by search term
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        result = result.filter(event =>
          event.title.toLowerCase().includes(searchTermLower) ||
          event.description.toLowerCase().includes(searchTermLower) ||
          event.location.toLowerCase().includes(searchTermLower)
        );
      }

      setFilteredEvents(result);
    }
  }, [events, searchTerm, statusFilter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/events');
      if (res.data.success) {
        setEvents(res.data.data);
        setFilteredEvents(res.data.data);
      } else {
        setError('Failed to load events');
        // Set mock data for development
        const mockEvents = [
          {
            _id: '1',
            title: 'Web Development Workshop',
            description: 'Learn how to build modern web applications with React and Node.js.',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Tech Building, Room 301',
            capacity: 30,
            status: 'upcoming',
            registrations: Array(12).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
          },
          {
            _id: '2',
            title: 'Introduction to Machine Learning',
            description: 'A beginner-friendly workshop on machine learning algorithms.',
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Science Center, Room 105',
            capacity: 25,
            status: 'upcoming',
            registrations: Array(19).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
          },
          {
            _id: '3',
            title: 'JavaScript Fundamentals',
            description: 'A deep dive into JavaScript fundamentals.',
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Tech Building, Room 302',
            capacity: 35,
            status: 'completed',
            registrations: Array(28).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
          }
        ];
        setEvents(mockEvents);
        setFilteredEvents(mockEvents);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.response?.data?.message || 'Failed to load events');

      // Mock data for development
      const mockEvents = [
        {
          _id: '1',
          title: 'Web Development Workshop',
          description: 'Learn how to build modern web applications with React and Node.js.',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Tech Building, Room 301',
          capacity: 30,
          status: 'upcoming',
          registrations: Array(12).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
        },
        {
          _id: '2',
          title: 'Introduction to Machine Learning',
          description: 'A beginner-friendly workshop on machine learning algorithms.',
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Science Center, Room 105',
          capacity: 25,
          status: 'upcoming',
          registrations: Array(19).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
        },
        {
          _id: '3',
          title: 'JavaScript Fundamentals',
          description: 'A deep dive into JavaScript fundamentals.',
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Tech Building, Room 302',
          capacity: 35,
          status: 'completed',
          registrations: Array(28).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
        }
      ];
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/events/${eventToDelete._id}`);
      // Remove from state
      const updatedEvents = events.filter(e => e._id !== eventToDelete._id);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents.filter(e =>
        statusFilter === 'all' || e.status === statusFilter
      ));
      setNotification(`Event "${eventToDelete.title}" has been deleted.`);
      setShowDeleteModal(false);
      setEventToDelete(null);
    } catch (err) {
      console.error('Error deleting event:', err);
      setError(err.response?.data?.message || 'Failed to delete event');
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex flex-wrap justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Events</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Manage workshops, hackathons, and meetups
          </p>
        </div>
        <Link
          to="/admin/events/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600"
        >
          <FiPlus className="-ml-1 mr-2 h-5 w-5" />
          Add Event
        </Link>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-44">
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {notification && (
        <div className="px-4 py-3 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md mx-4 my-2">
          <div className="flex">
            <FiCheckCircle className="h-5 w-5 mr-2" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="px-4 py-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md mx-4 my-2">
          <div className="flex">
            <FiAlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {filteredEvents.length > 0 ? (
        <motion.ul
          className="divide-y divide-gray-200 dark:divide-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {filteredEvents.map((event) => (
            <motion.li
              key={event._id}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <FiCalendar className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        event.status === 'ongoing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          event.status === 'completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {event.description.length > 100 ? `${event.description.substring(0, 100)}...` : event.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/events/${event._id}/edit`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                  >
                    <FiEdit2 className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(event)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
                  >
                    <FiTrash2 className="mr-2 h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiClock className="mr-1 h-4 w-4 flex-shrink-0" />
                    <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiMapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                  <FiUsers className="mr-1 h-4 w-4 flex-shrink-0" />
                  <span>{event.registrations?.length || 0} / {event.capacity}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <div className="text-center py-12">
          <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No events found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {loading ? 'Loading events...' : 'No events match your criteria.'}
          </p>
          {!loading && (
            <div className="mt-6">
              <Link
                to="/admin/events/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Event
              </Link>
            </div>
          )}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Delete Event
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete "{eventToDelete?.title}"? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsAdminPage;