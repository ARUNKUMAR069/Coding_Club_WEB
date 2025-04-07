import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiImage, FiCalendar, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filter, setFilter] = useState('all'); // all, workshop, hackathon, social

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Fetch gallery photos from API
        const res = await axios.get(`/api/gallery${filter !== 'all' ? `?category=${filter}` : ''}`);
        setPhotos(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to load gallery photos');
        setLoading(false);
        
        // Fallback to mock data for demo purposes
        setPhotos([
          { 
            id: '1', 
            url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
            caption: 'Coding Workshop Spring 2023',
            event: 'Spring Workshop',
            category: 'workshop',
            date: '2023-04-15'
          },
          {
            id: '2',
            url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
            caption: 'Team Collaboration Session',
            event: 'Hackathon Prep',
            category: 'hackathon',
            date: '2023-05-20'
          },
          {
            id: '3',
            url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
            caption: 'Web Development Bootcamp',
            event: 'Summer Bootcamp',
            category: 'workshop',
            date: '2023-06-10'
          },
          {
            id: '4',
            url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
            caption: 'Guest Speaker: AI in Modern Development',
            event: 'Tech Talk Series',
            category: 'social',
            date: '2023-07-05'
          },
          {
            id: '5',
            url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998',
            caption: 'Mobile App Development Workshop',
            event: 'App Development Series',
            category: 'workshop',
            date: '2023-08-12'
          },
          {
            id: '6',
            url: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc',
            caption: 'End of Year Celebration',
            event: 'Annual Party',
            category: 'social',
            date: '2023-12-15'
          },
          {
            id: '7',
            url: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c',
            caption: 'Blockchain Workshop',
            event: 'Tech Exploration Series',
            category: 'workshop',
            date: '2024-01-22'
          },
          {
            id: '8',
            url: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1',
            caption: 'Python Coding Challenge',
            event: 'Winter Hackathon',
            category: 'hackathon',
            date: '2024-02-18'
          },
          {
            id: '9',
            url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
            caption: 'Industry Networking Event',
            event: 'Career Connect',
            category: 'social',
            date: '2024-03-10'
          }
        ]);
      }
    };

    fetchGallery();
  }, [filter]);

  // Filter photos based on selected filter
  const filteredPhotos = photos.filter(photo => 
    filter === 'all' || photo.category === filter
  );

  const openPhotoModal = (photo, index) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
    setSelectedIndex(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  const navigatePhoto = (direction) => {
    const newIndex = selectedIndex + direction;
    if (newIndex >= 0 && newIndex < filteredPhotos.length) {
      setSelectedPhoto(filteredPhotos[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      
      if (e.key === 'ArrowLeft') {
        navigatePhoto(-1);
      } else if (e.key === 'ArrowRight') {
        navigatePhoto(1);
      } else if (e.key === 'Escape') {
        closePhotoModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, selectedIndex, filteredPhotos]);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Coding Club Gallery
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-100">
              Memories from our workshops, hackathons, and social events
            </p>
          </motion.div>
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

      {/* Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                filter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Photos
            </button>
            <button
              onClick={() => setFilter('workshop')}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                filter === 'workshop' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Workshops
            </button>
            <button
              onClick={() => setFilter('hackathon')}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                filter === 'hackathon' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Hackathons
            </button>
            <button
              onClick={() => setFilter('social')}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                filter === 'social' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Social Events
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 dark:text-red-400">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Try Again
              </button>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center py-20">
              <FiImage className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">No photos found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try selecting a different category
              </p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="group cursor-pointer overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openPhotoModal(photo, index)}
                >
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{photo.caption}</h3>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{photo.event}</span>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiCalendar className="mr-1" />
                        <span>{new Date(photo.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={closePhotoModal}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
          
          {/* Navigation buttons */}
          {selectedIndex > 0 && (
            <button
              onClick={() => navigatePhoto(-1)}
              className="absolute left-4 transform -translate-y-1/2 top-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <FiChevronLeft size={24} />
            </button>
          )}
          
          {selectedIndex < filteredPhotos.length - 1 && (
            <button
              onClick={() => navigatePhoto(1)}
              className="absolute right-4 transform -translate-y-1/2 top-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <FiChevronRight size={24} />
            </button>
          )}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-5xl w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedPhoto.caption}</h3>
              <div className="mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-gray-700 dark:text-gray-300">{selectedPhoto.event}</div>
                <div className="flex items-center mt-2 sm:mt-0 text-gray-500 dark:text-gray-400">
                  <FiCalendar className="mr-2" />
                  <span>{new Date(selectedPhoto.date).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {selectedPhoto.description || 'Photo from the Coding Club collection.'}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Gallery;