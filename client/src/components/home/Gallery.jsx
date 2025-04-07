import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiImage, FiEye } from 'react-icons/fi';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleryPhotos = async () => {
      try {
        // Fetch gallery photos from API
        const res = await axios.get('/api/gallery?limit=6');
        setPhotos(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gallery photos:', err);
        setError('Failed to load gallery photos');
        setLoading(false);
        
        // Fallback to mock data for demo purposes
        setPhotos([
          { 
            id: '1', 
            url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
            caption: 'Coding Workshop Spring 2023',
            event: 'Spring Workshop',
            date: '2023-04-15'
          },
          {
            id: '2',
            url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
            caption: 'Team Collaboration Session',
            event: 'Hackathon Prep',
            date: '2023-05-20'
          },
          {
            id: '3',
            url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
            caption: 'Web Development Bootcamp',
            event: 'Summer Bootcamp',
            date: '2023-06-10'
          },
          {
            id: '4',
            url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
            caption: 'Guest Speaker: AI in Modern Development',
            event: 'Tech Talk Series',
            date: '2023-07-05'
          },
          {
            id: '5',
            url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998',
            caption: 'Mobile App Development Workshop',
            event: 'App Development Series',
            date: '2023-08-12'
          },
          {
            id: '6',
            url: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc',
            caption: 'End of Year Celebration',
            event: 'Annual Party',
            date: '2023-12-15'
          }
        ]);
      }
    };

    fetchGalleryPhotos();
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Club Gallery
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          Memories from our workshops, hackathons, and social events.
        </p>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            variants={itemVariants}
          >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{photo.caption}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{photo.event} • {new Date(photo.date).toLocaleDateString()}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                to={`/gallery/${photo.id}`}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <FiEye className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View all button */}
      <div className="mt-12 text-center">
        <Link
          to="/gallery"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 transition-colors"
        >
          <FiImage className="mr-2" />
          View All Photos
        </Link>
      </div>
    </div>
  );
};

export default Gallery;