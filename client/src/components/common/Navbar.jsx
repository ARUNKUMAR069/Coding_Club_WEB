import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { FiMenu, FiX, FiCode, FiLogOut, FiUser, FiPlay } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' }
  ];

  const adminItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiCode /> },
    { name: 'Members', path: '/admin/members', icon: <FiUser /> },
    { name: 'Games', path: '/games', icon: <FiPlay className="mr-2" />, requiresAuth: true }
  ];

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <FiCode className="text-primary-500 text-2xl" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Coding Club</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary-500 font-medium'
                    : 'text-gray-600 hover:text-primary-500 transition-colors dark:text-gray-300'
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Auth buttons */}
            {user ? (
              <div className="relative group ml-2">
                <button className="flex items-center space-x-2 text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-lg transition-colors">
                  <span>{user.username}</span>
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-20 hidden group-hover:block">
                  {user.role === 'admin' && adminItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </NavLink>
                  ))}
                  
                  <button 
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiLogOut />
                    <span className="ml-2">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 pb-4"
          >
            <div className="flex flex-col px-4 pt-2 pb-3 space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-primary-500 font-medium'
                      : 'text-gray-600 hover:text-primary-500 dark:text-gray-300'
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              
              {user ? (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <p className="text-sm text-gray-500 mb-2">Signed in as {user.username}</p>
                    
                    {user.role === 'admin' && adminItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className="flex items-center py-2 text-gray-700 dark:text-gray-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </NavLink>
                    ))}
                    
                    <button 
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center py-2 text-red-600 dark:text-red-400"
                    >
                      <FiLogOut />
                      <span className="ml-2">Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg inline-block text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;