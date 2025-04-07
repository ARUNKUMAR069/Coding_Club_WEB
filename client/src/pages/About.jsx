import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiUsers, FiTarget, FiAward, FiCalendar } from 'react-icons/fi';

const About = () => {
  // Team members data (replace with actual data)
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'President',
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
      bio: 'Computer Science senior specializing in web development and AI.'
    },
    {
      name: 'Taylor Smith',
      role: 'Vice President',
      image: 'https://images.unsplash.com/photo-1581992652564-44c42f5ad3ad',
      bio: 'Software Engineering junior with a passion for mobile app development.'
    },
    {
      name: 'Jordan Lee',
      role: 'Secretary',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      bio: 'Data Science sophomore focusing on machine learning algorithms.'
    },
    {
      name: 'Casey Wilson',
      role: 'Treasurer',
      image: 'https://images.unsplash.com/photo-1548449112-96a38a643324',
      bio: 'Information Systems senior with experience in project management.'
    }
  ];

  // Timeline events
  const timelineEvents = [
    {
      year: '2018',
      title: 'Club Founded',
      description: 'Started with just 10 members meeting in the library.'
    },
    {
      year: '2019',
      title: 'First Hackathon',
      description: 'Organized our inaugural 24-hour coding event with 50 participants.'
    },
    {
      year: '2020',
      title: 'Virtual Transition',
      description: 'Adapted to online workshops and meetings during the pandemic.'
    },
    {
      year: '2021',
      title: 'Industry Partnerships',
      description: 'Established connections with local tech companies for sponsorships.'
    },
    {
      year: '2022',
      title: 'Expanded Curriculum',
      description: 'Added new tracks for data science, mobile development, and cybersecurity.'
    },
    {
      year: '2023',
      title: 'Community Outreach',
      description: 'Launched initiatives to teach coding to underserved communities.'
    }
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              About Our Coding Club
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-primary-100">
              Building a community of passionate developers since 2018
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

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemAnimation} className="flex flex-col">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FiTarget className="h-8 w-8 text-primary-600 dark:text-primary-300" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                To foster a collaborative environment where students can develop their programming skills, 
                explore emerging technologies, and build meaningful connections with peers and industry professionals.
              </p>
            </motion.div>
            
            <motion.div variants={itemAnimation} className="flex flex-col">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FiCode className="h-8 w-8 text-primary-600 dark:text-primary-300" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                To become the premier platform for technology education and innovation on campus, 
                equipping members with the skills and network they need to succeed in the rapidly evolving 
                field of technology.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Journey</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              How our coding club has grown and evolved over the years
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary-300 dark:bg-primary-700"></div>
            
            {/* Timeline events */}
            <motion.div
              variants={containerAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-12"
            >
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index} 
                  variants={itemAnimation}
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 flex justify-center md:justify-end md:pr-8">
                    <div className={`w-full max-w-md p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <span className="inline-block px-4 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 font-bold text-sm mb-3">
                        {event.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{event.title}</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 relative flex justify-center">
                    <div className="hidden md:block absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-white dark:border-gray-800"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              The dedicated leaders behind our coding club
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemAnimation}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">{member.role}</p>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="bg-primary-700 dark:bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-100">
              Ready to level up your coding skills? Join our next meeting and become part of our growing community!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/events" 
                className="px-8 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                <FiCalendar className="inline-block mr-2" />
                Upcoming Meetings
              </a>
              <a 
                href="/about#contact" 
                className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
              >
                <FiUsers className="inline-block mr-2" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;