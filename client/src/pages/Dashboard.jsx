import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar, FiCheckSquare, FiInfo } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth'; // Make sure path is correct

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
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

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Welcome, {user?.firstName || 'Member'}!
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Manage your coding club activities and track your progress.
          </p>
        </div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            variants={itemVariants}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-3">
                  <FiCalendar className="h-6 w-6 text-primary-600 dark:text-primary-300" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Events</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    View and register for upcoming workshops and meetups.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => navigate('/events')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                >
                  View events
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            variants={itemVariants}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-3">
                  <FiUser className="h-6 w-6 text-primary-600 dark:text-primary-300" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">My Profile</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your information and preferences.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => navigate('/profile')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                >
                  View profile
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
            variants={itemVariants}
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 rounded-md p-3">
                  <FiCheckSquare className="h-6 w-6 text-primary-600 dark:text-primary-300" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">My Activities</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Track your progress and completed workshops.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => navigate('/activities')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                >
                  View activities
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Club Information</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Stay updated with the latest news and announcements.</p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiInfo className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Next Club Meeting</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Our next regular meeting is scheduled for Friday at 5:00 PM in the Tech Building, Room 301. 
                  We'll be discussing upcoming projects and workshop ideas.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                    Learn more about our regular meetings <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;