import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiCalendar, 
  FiImage, 
  FiUserPlus, 
  FiAlertCircle,
  FiArrowUp,
  FiArrowDown,
  FiClock
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    upcomingEvents: 0,
    totalEvents: 0,
    totalGalleryItems: 0,
    recentMembers: [],
    upcomingEventsList: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/stats');
        if (res.data.success) {
          setStats(res.data.data);
        } else {
          setError('Failed to load dashboard statistics');
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-red-50 dark:bg-red-900/30 p-4 rounded-md"
        >
          <div className="flex">
            <FiAlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Member Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-3">
                <FiUsers className="h-6 w-6 text-primary-600 dark:text-primary-300" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Members</dt>
                  <dd>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.totalMembers}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/members" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                View all members
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Active Members */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
                <FiUserPlus className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Members</dt>
                  <dd>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.activeMembers}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/members/new" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Add new member
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Events Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-md p-3">
                <FiCalendar className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Upcoming Events</dt>
                  <dd>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.upcomingEvents}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
            <div className="text-sm">
              <Link to="/admin/events" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                View all events
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg"
        >
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Members</h3>
          </div>
          {stats.recentMembers && stats.recentMembers.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {stats.recentMembers.map((member) => (
                <div key={member._id} className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-2">
                        <FiUser className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Joined {member.joinDate ? formatDate(member.joinDate) : 'N/A'}
                      </p>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.active 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {member.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="px-5 py-4 bg-gray-50 dark:bg-gray-700">
                <Link 
                  to="/admin/members" 
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  View all members
                </Link>
              </div>
            </div>
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">No members found</p>
            </div>
          )}
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 shadow rounded-lg"
        >
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Upcoming Events</h3>
          </div>
          {stats.upcomingEventsList && stats.upcomingEventsList.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {stats.upcomingEventsList.map((event) => (
                <div key={event._id} className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{event.location}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                        <FiClock className="mr-1 h-4 w-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {event.registrations?.length || 0} registered
                        {event.capacity ? ` / ${event.capacity}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="px-5 py-4 bg-gray-50 dark:bg-gray-700">
                <Link 
                  to="/admin/events" 
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  View all events
                </Link>
              </div>
            </div>
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">No upcoming events</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;