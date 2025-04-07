import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiAlertCircle,
  FiUserX,
  FiUserCheck,
  FiUser
} from 'react-icons/fi';

const MembersPage = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const location = useLocation();

  // Load members
  useEffect(() => {
    fetchMembers();
    // Check for notification from state (e.g., after deletion)
    if (location.state?.message) {
      setNotification(location.state.message);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Filter members when search term or status filter changes
  useEffect(() => {
    if (members.length > 0) {
      let result = [...members];
      
      // Filter by status
      if (statusFilter !== 'all') {
        const isActive = statusFilter === 'active';
        result = result.filter(member => member.active === isActive);
      }
      
      // Filter by search term
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        result = result.filter(member => 
          member.firstName.toLowerCase().includes(searchTermLower) ||
          member.lastName.toLowerCase().includes(searchTermLower) ||
          member.email.toLowerCase().includes(searchTermLower) ||
          (member.memberId && member.memberId.toString().includes(searchTermLower))
        );
      }
      
      setFilteredMembers(result);
    }
  }, [members, searchTerm, statusFilter]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/members');
      if (res.data.success) {
        setMembers(res.data.data);
        setFilteredMembers(res.data.data);
      } else {
        setError('Failed to load members');
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      setError(err.response?.data?.message || 'Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/members/${memberToDelete._id}`);
      // Remove from state
      const updatedMembers = members.filter(m => m._id !== memberToDelete._id);
      setMembers(updatedMembers);
      setFilteredMembers(updatedMembers.filter(m => 
        statusFilter === 'all' || 
        (statusFilter === 'active' && m.active) || 
        (statusFilter === 'inactive' && !m.active)
      ));
      setNotification(`Member ${memberToDelete.firstName} ${memberToDelete.lastName} has been deleted.`);
      setShowDeleteModal(false);
      setMemberToDelete(null);
    } catch (err) {
      console.error('Error deleting member:', err);
      setError(err.response?.data?.message || 'Failed to delete member');
      setShowDeleteModal(false);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex flex-wrap justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Members</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Manage coding club members
          </p>
        </div>
        <Link
          to="/admin/members/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600"
        >
          <FiPlus className="-ml-1 mr-2 h-5 w-5" />
          Add Member
        </Link>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-44">
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Members</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {notification && (
        <div className="px-4 py-3 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md mx-4 my-2">
          <div className="flex">
            <FiUserCheck className="h-5 w-5 mr-2" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="px-4 py-3 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md mx-4 my-2">
          <div className="flex">
            <FiAlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {filteredMembers.length > 0 ? (
        <motion.ul
          className="divide-y divide-gray-200 dark:divide-gray-700"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredMembers.map((member) => (
            <motion.li 
              key={member._id} 
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        {member.firstName} {member.lastName}
                      </h4>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.active
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {member.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/members/${member._id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                  >
                    <FiEdit2 className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(member)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
                  >
                    <FiTrash2 className="mr-2 h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300 sm:mt-0">
                    <span className="mr-1">Member ID:</span>
                    <span className="font-medium">{member.memberId || 'N/A'}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-300 sm:mt-0">
                  <span className="mr-1">Joined:</span>
                  <span>{formatDate(member.joinDate)}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <div className="text-center py-12">
          <FiUserX className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No members found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {loading ? 'Loading members...' : 'No members match your criteria.'}
          </p>
          {!loading && (
            <div className="mt-6">
              <Link
                to="/admin/members/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Add Member
              </Link>
            </div>
          )}
        </div>
      )}
      
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                    <FiAlertCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Delete Member
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete {memberToDelete?.firstName} {memberToDelete?.lastName}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersPage;