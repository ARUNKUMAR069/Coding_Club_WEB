import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiCalendar, 
  FiSettings, 
  FiLogOut, 
  FiMenu,
  FiX,
  FiCode,
  FiImage,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
          window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items
  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
    { name: 'Members', href: '/admin/members', icon: FiUsers },
    { name: 'Events', href: '/admin/events', icon: FiCalendar },
    { name: 'Gallery', href: '/admin/gallery', icon: FiImage },
    { name: 'Settings', href: '/admin/settings', icon: FiSettings }
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  // Apply dark mode initially
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`md:hidden ${sidebarOpen ? 'fixed inset-0 flex z-40' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} 
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        {/* Sidebar */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary-700 dark:bg-gray-800 transition-all transform ease-in-out duration-300">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <FiX className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-shrink-0 flex items-center px-4">
            <Link to="/" className="flex items-center">
              <FiCode className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">Coding Club</span>
            </Link>
          </div>
          
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      active 
                        ? 'bg-primary-800 text-white' 
                        : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon 
                      className={`mr-4 h-6 w-6 ${
                        active ? 'text-primary-300' : 'text-primary-300'
                      }`} 
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-primary-800 p-4">
            <div className="flex items-center">
              <div>
                <div className="bg-primary-800 p-2 rounded-full">
                  <FiUsers className="text-primary-200 h-6 w-6" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm font-medium text-primary-200">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-primary-700 dark:bg-gray-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4">
              <Link to="/" className="flex items-center">
                <FiCode className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">Coding Club</span>
              </Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        active 
                          ? 'bg-primary-800 dark:bg-gray-700 text-white' 
                          : 'text-primary-100 hover:bg-primary-600 dark:hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <item.icon 
                        className={`mr-3 h-6 w-6 ${
                          active ? 'text-primary-300' : 'text-primary-300'
                        }`} 
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-primary-800 dark:border-gray-700 p-4">
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center flex-shrink-0">
                  <div>
                    <div className="bg-primary-800 dark:bg-gray-700 p-2 rounded-full">
                      <FiUsers className="text-primary-200 dark:text-gray-300 h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-3 truncate">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs font-medium text-primary-200 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-1 rounded-full text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white"
                >
                  <FiLogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow">
          <button
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <FiMenu className="h-6 w-6" />
          </button>
          
          {/* Top navbar */}
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
              </h1>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {isDarkMode ? (
                  <FiSun className="h-6 w-6" />
                ) : (
                  <FiMoon className="h-6 w-6" />
                )}
              </button>
              
              {/* Public site link */}
              <Link
                to="/"
                className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span className="sr-only">View public site</span>
                <FiCode className="h-6 w-6" />
              </Link>
              
              {/* Logout button (mobile) */}
              <button
                onClick={handleLogout}
                className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 md:hidden"
              >
                <span className="sr-only">Log out</span>
                <FiLogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;