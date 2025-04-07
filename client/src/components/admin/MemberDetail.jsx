import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiEdit2, FiArrowLeft, FiUser, FiMail, FiCalendar, FiTag, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/members/${id}`);
        setMember(response.data.data);
      } catch (err) {
        console.error('Error fetching member:', err);
        setError('Failed to load member details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Member Details</h3>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center justify-center">
            <FiAlertCircle className="h-12 w-12 text-red-500 mr-3" />
            <h3 className="text-xl font-medium text-red-500">{error}</h3>
          </div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Member Details</h3>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center justify-center">
            <FiUser className="h-12 w-12 text-gray-400 mr-3" />
            <h3 className="text-xl font-medium text-gray-500">Member not found</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
    >
      <div className="px-4 py-5 sm:px-6 flex justify-between">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Member Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Personal information and details
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/admin/members')}
            className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
          <Link
            to={`/admin/members/${id}/edit`}
            className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
          >
            <FiEdit2 className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
              <img 
                className="h-24 w-24 rounded-full"
                src={member.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.firstName + '+' + member.lastName)}&background=0D8ABC&color=fff&size=128`} 
                alt={`${member.firstName} ${member.lastName}`}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {member.firstName} {member.lastName}
              </h1>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {member.role}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  {member.uniqueId || 'No ID'}
                </span>
                {member.active ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <FiCheckCircle className="mr-1 h-3 w-3" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    <FiXCircle className="mr-1 h-3 w-3" />
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
              <FiMail className="mr-2 h-4 w-4" />
              Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              <a href={`mailto:${member.email}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                {member.email}
              </a>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
              <FiCalendar className="mr-2 h-4 w-4" />
              Joined
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {new Date(member.joinDate).toLocaleDateString(undefined, { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
              })}
            </dd>
          </div>
          {member.skills && member.skills.length > 0 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                <FiTag className="mr-2 h-4 w-4" />
                Skills
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          )}
          {member.bio && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Bio
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {member.bio}
              </dd>
            </div>
          )}
          {member.projects && member.projects.length > 0 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Projects
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700">
                  {member.projects.map((project, idx) => (
                    <li key={idx} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">{project.title}</span>
                      </div>
                      {project.link && (
                        <div className="ml-4 flex-shrink-0">
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                          >
                            View
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {member.achievements && member.achievements.length > 0 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Achievements
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700">
                  {member.achievements.map((achievement, idx) => (
                    <li key={idx} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <FiClock className="flex-shrink-0 h-4 w-4 text-gray-400" />
                        <span className="ml-2 flex-1 w-0 truncate">
                          {achievement.title} - {new Date(achievement.date).toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </motion.div>
  );
};

export default MemberDetail;