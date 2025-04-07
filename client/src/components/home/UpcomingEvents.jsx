import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiCalendar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const res = await axios.get('/api/events?status=upcoming&limit=3');
        setEvents(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching upcoming events:', err);
        setError('Failed to load events');
        setLoading(false);
        
        // Fallback to mock data for demo purposes
        setEvents([
          {
            _id: '1',
            title: 'Web Development Workshop',
            description: 'Learn how to build modern web applications with React and Node.js',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            location: 'Tech Building, Room 301',
            capacity: 30,
            registrations: []
          },
          {
            _id: '2',
            title: 'Introduction to Machine Learning',
            description: 'A beginner-friendly workshop on the basics of machine learning algorithms',
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
            location: 'Science Center, Room 105',
            capacity: 25,
            registrations: []
          },
          {
            _id: '3',
            title: 'Mobile App Development Hackathon',
            description: 'Team up and build innovative mobile applications in just 48 hours',
            date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
            location: 'Innovation Hub',
            capacity: 50,
            registrations: []
          }
        ]);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50 }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Upcoming Events
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          Join us for these exciting workshops, hackathons, and tech talks.
        </p>
      </div>

      {events.length > 0 ? (
        <motion.div 
          className="mt-12 grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {events.map(event => (
            <motion.div 
              key={event._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col"
              variants={itemVariants}
            >
              <div className="p-6 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center text-primary-600 dark:text-primary-300">
                    <FiCalendar className="text-xl" />
                  </div>
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Upcoming
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {event.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {event.description}
                </p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiClock className="mr-2 flex-shrink-0" />
                    <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiMapPin className="mr-2 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiUsers className="mr-2 flex-shrink-0" />
                    <span>
                      {event.registrations.length} / {event.capacity} registered
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <Link
                  to={`/events/${event._id}`}
                  className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-2 px-4 rounded-md transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="mt-12 text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No upcoming events</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Check back soon for new events!</p>
        </div>
      )}

      {/* View all button */}
      <div className="mt-12 text-center">
        <Link
          to="/events"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 transition-colors"
        >
          <FiCalendar className="mr-2" />
          View All Events
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents;