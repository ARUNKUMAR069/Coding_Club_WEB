import React from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <FiCode className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold">Coding Club</span>
            </div>
            <p className="mt-4 text-gray-300 max-w-md">
              A community of passionate developers learning and growing together.
              Join us to enhance your coding skills, collaborate on projects, and build a network.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://github.com/coding-club" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiGithub className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com/company/coding-club" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com/coding_club" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com/coding_club" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Member Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-300">
                <span className="block">Email:</span>
                <a href="mailto:contact@codingclub.com" className="hover:text-white transition-colors">contact@codingclub.com</a>
              </li>
              <li className="text-gray-300">
                <span className="block">Meeting Times:</span>
                <span>Tuesdays & Thursdays, 4-6 PM</span>
              </li>
              <li className="text-gray-300">
                <span className="block">Location:</span>
                <span>Room 301, Tech Building</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Coding Club. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white mr-4">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;