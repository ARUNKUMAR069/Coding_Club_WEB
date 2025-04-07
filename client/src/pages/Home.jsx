import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Gallery from '../components/home/Gallery';
import UpcomingEvents from '../components/home/UpcomingEvents';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <section className="py-16 bg-white dark:bg-gray-900">
        <Features />
      </section>
      
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <UpcomingEvents />
      </section>
      
      <section className="py-16 bg-white dark:bg-gray-900">
        <Gallery />
      </section>
    </motion.div>
  );
};

export default Home;