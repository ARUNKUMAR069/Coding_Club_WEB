import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiUsers, FiLayers, FiAward, FiMonitor, FiCoffee } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiCode />,
      title: 'Coding Workshops',
      description: 'Regular hands-on coding sessions in various programming languages and technologies.'
    },
    {
      icon: <FiUsers />,
      title: 'Collaborative Projects',
      description: 'Work with fellow members on real-world projects to gain practical experience.'
    },
    {
      icon: <FiLayers />,
      title: 'Learning Resources',
      description: 'Access to curated learning materials, tutorials, and reference guides.'
    },
    {
      icon: <FiAward />,
      title: 'Hackathons',
      description: 'Participate in coding competitions and hackathons to test your skills.'
    },
    {
      icon: <FiMonitor />,
      title: 'Tech Talks',
      description: 'Guest lectures from industry professionals about latest technologies and trends.'
    },
    {
      icon: <FiCoffee />,
      title: 'Social Events',
      description: 'Networking opportunities and social gatherings with like-minded individuals.'
    }
  ];

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          What We Offer
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          Join our coding club and benefit from a wide range of activities designed
          to enhance your coding skills and expand your network.
        </p>
      </div>

      <motion.div 
        className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            variants={itemVariants}
          >
            <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mb-4 text-primary-600 dark:text-primary-300">
              <span className="text-2xl">{feature.icon}</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;