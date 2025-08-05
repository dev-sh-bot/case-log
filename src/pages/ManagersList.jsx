import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaUserTie, FaSave } from 'react-icons/fa';
import { triggerToast } from '../utils/helper';
import { api } from '../utils/api';
import { itemsPerPage } from '../utils/constants';
import Pagination from '../components/Pagination';

const ManagersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingManager, setEditingManager] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch managers from API
  const fetchManagers = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        per_page: itemsPerPage.toString()
      });
      
      if (search) {
        queryParams.append('search', search);
      }
      
      const response = await api.getManagers(queryParams.toString());
      
      // Handle Laravel pagination response structure
      if (response && response.data) {
        setManagers(response.data || []);
        setTotalItems(response.total || 0);
        setTotalPages(response.last_page || 0);
        setCurrentPage(response.current_page || 1);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching managers:', error);
      triggerToast('Failed to load managers', 'error');
      setManagers([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page or search changes
  useEffect(() => {
    fetchManagers(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Calculate pagination values
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + managers.length;

  const AddManagerModal = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm({
      defaultValues: {
        name: editingManager?.name || '',
        email: editingManager?.email || '',
        password: ''
      }
    });

    const onSubmit = async (data) => {
      setIsSubmitting(true);
      try {
        if (editingManager) {
          // Update existing manager
          const response = await api.updateManager(editingManager.id, data);
          if (response && response.data) {
            triggerToast('Manager updated successfully', 'success');
            // Refresh the managers list
            fetchManagers(currentPage, searchTerm);
          } else {
            throw new Error('Failed to update manager');
          }
        } else {
          // Add new manager
          const response = await api.createManager(data);
          if (response && response.data) {
            triggerToast('Manager created successfully', 'success');
            // Refresh the managers list
            fetchManagers(currentPage, searchTerm);
          } else {
            throw new Error('Failed to create manager');
          }
        }

        setIsAddModalOpen(false);
        setEditingManager(null);
        reset();
      } catch (error) {
        console.error('Error saving manager:', error);
        triggerToast(`Failed to ${editingManager ? 'update' : 'create'} manager`, 'error');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-facebook-card rounded-lg p-6 w-full max-w-md border border-gray-200 dark:border-facebook-border">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-facebook-text mb-4">
            {editingManager ? 'Edit Manager' : 'Add New Manager'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-facebook-text mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserTie className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Full name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Full name must be less than 50 characters'
                    }
                  })}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-facebook-surface text-gray-900 dark:text-facebook-text ${errors.name ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-facebook-border'
                    }`}
                  placeholder="Enter full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-facebook-text mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-facebook-surface text-gray-900 dark:text-facebook-text ${errors.email ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-facebook-border'
                  }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            {!editingManager && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-facebook-text mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                    }
                  })}
                  className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-facebook-surface text-gray-900 dark:text-facebook-text ${errors.password ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-facebook-border'
                    }`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-facebook-textMuted">
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingManager(null);
                  reset();
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-facebook-textSecondary bg-gray-100 dark:bg-facebook-surface rounded-lg hover:bg-gray-200 dark:hover:bg-facebook-hover transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-all disabled:opacity-50 shadow-md hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingManager ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    {editingManager ? 'Update Manager' : 'Create Manager'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="page-section">

      {/* Header */}
      <div className="page-header mb-2">
        <div>
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search managers..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-facebook-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-facebook-surface text-gray-900 dark:text-facebook-text placeholder-gray-500 dark:placeholder-facebook-textMuted"
            />
          </div>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 text-white rounded-lg transition-all shadow-md hover:shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <FaPlus className="mr-2" size={14} />
          Add Manager
        </button>
      </div>

      {/* Managers Table */}
      <div className="page-card overflow-hidden shadow-sm border border-gray-200 dark:border-facebook-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-facebook-surface">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-facebook-textSecondary uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-facebook-textSecondary uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-facebook-textSecondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-facebook-textSecondary uppercase tracking-wider">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-facebook-card divide-y divide-gray-200 dark:divide-facebook-border">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-facebook-textSecondary">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-700 dark:text-facebook-text">Loading managers...</p>
                  </td>
                </tr>
              ) : managers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-facebook-textSecondary">
                    <FaUserTie className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 dark:text-facebook-text">No managers found</p>
                    <p className="text-sm text-gray-600 dark:text-facebook-textSecondary">
                      {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first manager'}
                    </p>
                  </td>
                </tr>
              ) : (
                managers.map((manager) => (
                  <tr key={manager.id} className="hover:bg-gray-50 dark:hover:bg-facebook-hover">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-facebook-text">
                      {manager.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaUserTie className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-facebook-text">
                            {manager.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-facebook-text">
                      {manager.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-facebook-textSecondary">
                      {manager.created_at ? new Date(manager.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            showingStart={startIndex + 1}
            showingEnd={Math.min(endIndex, totalItems)}
          />
        )}
      </div>

      {/* Add/Edit Manager Modal */}
      {isAddModalOpen && <AddManagerModal />}
    </div>
  );
};

export default ManagersList;