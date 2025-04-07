import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center">
          <FiAlertCircle className="h-20 w-20 text-primary-500" />
        </div>
        
        <h1 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
          404
        </h1>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="mt-4 text-center text-md text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FiHome className="mr-2 -ml-1 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;