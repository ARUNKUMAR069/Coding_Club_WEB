import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiFilter, FiSearch } from 'react-icons/fi';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Get status filter for API
        const statusFilter = filter === 'upcoming' ? 'upcoming' : 
                             filter === 'past' ? 'completed' : '';
        
        // Fetch events from API with filters
        const res = await axios.get(`/api/events${statusFilter ? `?status=${statusFilter}` : ''}`);
        setEvents(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
        setLoading(false);
        
        // Fallback to mock data for demo
        setEvents([
          {
            _id: '1',
            title: 'Web Development Workshop',
            description: 'Learn how to build modern web applications with React and Node.js. This workshop is perfect for beginners who want to get started with web development.',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            location: 'Tech Building, Room 301',
            capacity: 30,
            status: 'upcoming',
            registrations: Array(12).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
          },
          {
            _id: '2',
            title: 'Introduction to Machine Learning',
            description: 'A beginner-friendly workshop on the basics of machine learning algorithms and their applications in solving real-world problems.',
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
            location: 'Science Center, Room 105',
            capacity: 25,
            status: 'upcoming',
            registrations: Array(19).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
          },
          {
            _id: '3',
            title: 'Mobile App Development Hackathon',
            description: 'Team up and build innovative mobile applications in just 48 hours. Prizes will be awarded to the top three teams!',
            date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
            location: 'Innovation Hub',
            capacity: 50,
            status: 'upcoming',
            registrations: Array(32).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
          },
          {
            _id: '4',
            title: 'JavaScript Fundamentals',
            description: 'A deep dive into JavaScript fundamentals covering variables, functions, objects, and asynchronous programming.',
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
            location: 'Tech Building, Room 302',
            capacity: 35,
            status: 'completed',
            registrations: Array(28).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
          },
          {
            _id: '5',
            title: 'Git & GitHub Workshop',
            description: 'Learn version control with Git and collaboration with GitHub, essential skills for any developer.',
            date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
            location: 'Library, Computer Lab 3',
            capacity: 20,
            status: 'completed',
            registrations: Array(18).fill().map((_, i) => ({ member: { _id: `m${i}` } }))
          }
        ]);
      }
    };

    fetchEvents();
  }, [filter]);

  // Filter events by search term
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date and time
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Coding Club Events
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-100">
              Join our workshops, hackathons, and tech talks to enhance your skills
            </p>
          </motion.div>
        </div>
        
        {/* Wave SVG separator */}
        <div className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto transform translate-y-1">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,58.7C840,64,960,64,1080,56C1200,48,1320,32,1380,24L1440,16L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              className="dark:fill-gray-900"
            ></path>
          </svg>
        </div>
      </div>

      {/* Filters and Search */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <FiFilter className="text-gray-500 dark:text-gray-400" />
              <div className="inline-flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm rounded-l-md ${filter === 'all' ? 'bg-primary-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setFilter('upcoming')}
                  className={`px-4 py-2 text-sm ${filter === 'upcoming' ? 'bg-primary-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setFilter('past')}
                  className={`px-4 py-2 text-sm rounded-r-md ${filter === 'past' ? 'bg-primary-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  Past
                </button>
              </div>
            </div>
            
            <div className="relative w-full md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 dark:text-red-400">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Try Again
              </button>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <FiCalendar className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">No events found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms' : 'Check back soon for new events!'}
              </p>
            </div>
          ) : (
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredEvents.map(event => (
                <motion.div
                  key={event._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`h-2 ${event.status === 'upcoming' ? 'bg-green-500' : event.status === 'ongoing' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
                  <div className="p-6 flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'upcoming' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        event.status === 'ongoing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {event.registrations.length} / {event.capacity}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar className="mr-2 flex-shrink-0" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-2 flex-shrink-0" />
                        <span>{formatTime(event.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiMapPin className="mr-2 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <a 
                      href={`/events/${event._id}`}
                      className="block w-full text-center px-4 py-2 rounded-md transition-colors font-medium
                        ${event.status === 'upcoming' ? 'bg-primary-500 hover:bg-primary-600 text-white' :
                          'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }"
                    >
                      {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;