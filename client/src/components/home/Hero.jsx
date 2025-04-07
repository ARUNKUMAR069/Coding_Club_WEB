import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCode, FiArrowRight, FiCalendar } from 'react-icons/fi';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-28 lg:py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="bg-primary-500 p-4 rounded-full">
                <FiCode className="h-10 w-10 text-white" />
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
            >
              Welcome to the <span className="text-primary-400">Coding Club</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Join our community of passionate developers, learn new skills, 
              collaborate on exciting projects, and grow your coding expertise.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/about" 
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition-all duration-200 flex items-center justify-center"
              >
                Learn More
                <FiArrowRight className="ml-2" />
              </Link>
              <Link 
                to="/events" 
                className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-600 md:py-4 md:text-lg md:px-10 transition-all duration-200 flex items-center justify-center"
              >
                Upcoming Events
                <FiCalendar className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
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
  );
};

export default Hero;