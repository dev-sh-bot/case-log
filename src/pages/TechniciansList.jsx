import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch, FaTools, FaFilter, FaSave, FaUserTie } from 'react-icons/fa';
import { triggerToast } from '../utils/helper';
import { api } from '../utils/api';
import { itemsPerPage } from '../utils/constants';
import Pagination from '../components/Pagination';

const TechniciansList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManager, setSelectedManager] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [technicians, setTechnicians] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch technicians from API
  const fetchTechnicians = async (page = 1, search = '', managerId = 'all') => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        per_page: itemsPerPage.toString()
      });
      
      if (search) {
        queryParams.append('search', search);
      }
      
      if (managerId && managerId !== 'all') {
        queryParams.append('manager_id', managerId);
      }
      
      const response = await api.getTechnicians(queryParams.toString());
      
      if (response.success) {
        setTechnicians(response.data || []);
        setTotalItems(response.total || 0);
        setTotalPages(response.last_page || 0);
      } else {
        throw new Error(response.message || 'Failed to fetch technicians');
      }
    } catch (error) {
      console.error('Error fetching technicians:', error);
      triggerToast('Failed to load technicians', 'error');
      setTechnicians([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch managers for dropdown
  const fetchManagers = async () => {
    try {
      const response = await api.getManagerList();
      if (response.success) {
        setManagers(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching managers:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchManagers();
    fetchTechnicians(currentPage, searchTerm, selectedManager);
  }, []);

  // Fetch data when page, search, or manager filter changes
  useEffect(() => {
    fetchTechnicians(currentPage, searchTerm, selectedManager);
  }, [currentPage, searchTerm, selectedManager]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleManagerFilterChange = (e) => {
    setSelectedManager(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Calculate pagination values
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + technicians.length;


  const AddTechnicianModal = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch
    } = useForm({
      defaultValues: {
        user_name: editingTechnician?.fullName || '',
        email: editingTechnician?.email || '',
        manager_id: editingTechnician?.managerId || '',
        password: ''
      }
    });

    const selectedManagerId = watch('manager_id');

    const onSubmit = async (data) => {
      setIsSubmitting(true);
      try {

        if (editingTechnician) {
          // Update existing technician
          const response = await api.updateTechnician(editingTechnician.id, data);
          if (response.success) {
            triggerToast('Technician updated successfully', 'success');
            // Refresh the technicians list
            fetchTechnicians(currentPage, searchTerm, selectedManager);
          } else {
            throw new Error('Failed to update technician');
          }
        } else {
          // Add new technician
          const response = await api.createTechnician(data);
          if (response.success) {
            triggerToast(response.message, 'success');
            // Refresh the technicians list
            fetchTechnicians(currentPage, searchTerm, selectedManager);
          } else {
            throw new Error('Failed to create technician');
          }
        }

        setIsAddModalOpen(false);
        setEditingTechnician(null);
        reset();
      } catch (error) {
        console.error('Error saving technician:', error);
        triggerToast(`Failed to ${editingTechnician ? 'update' : 'create'} technician`, 'error');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingTechnician ? 'Edit Technician' : 'Add New Technician'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Manager Selection */}
            <div>
              <label htmlFor="manager_id" className="block text-sm font-medium text-gray-700 mb-2">
                Assign Manager *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserTie className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="manager_id"
                  {...register('manager_id', {
                    required: 'Please select a manager'
                  })}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.manager_id ? 'border-red-300' : 'border-gray-300'
                    }`}
                >
                  <option value="">Select a manager</option>
                  {managers.map(manager => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.manager_id && (
                <p className="mt-1 text-sm text-red-600">{errors.manager_id.message}</p>
              )}
              {selectedManagerId && (
                <p className="mt-1 text-sm text-green-600">
                  ✓ Assigned to {managers.find(m => m.id === parseInt(selectedManagerId))?.name}
                </p>
              )}
            </div>

            {/* User Name Field */}
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTools className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="user_name"
                  {...register('user_name', {
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
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.user_name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Enter full name"
                />
              </div>
              {errors.user_name && (
                <p className="mt-1 text-sm text-red-600">{errors.user_name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            {!editingTechnician && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingTechnician(null);
                  reset();
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 bg-slate-800 dark:bg-facebook-dark hover:bg-slate-700 dark:hover:bg-facebook-hover"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingTechnician ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    {editingTechnician ? 'Update Technician' : 'Create Technician'}
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
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search technicians..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Manager Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={selectedManager}
              onChange={handleManagerFilterChange}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
            >
              <option value="all">All Managers</option>
              {managers.map(manager => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 text-white rounded-lg transition-colors bg-slate-800 dark:bg-facebook-dark hover:bg-slate-700 dark:hover:bg-facebook-hover"
        >
          <FaPlus className="mr-2" size={14} />
          Add Technician
        </button>
      </div>



      {/* Technicians Table */}
      <div className="page-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg font-medium">Loading technicians...</p>
                  </td>
                </tr>
              ) : technicians.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    <FaTools className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium">No technicians found</p>
                    <p className="text-sm">
                      {searchTerm || selectedManager !== 'all'
                        ? 'Try adjusting your search or filter criteria'
                        : 'Get started by adding your first technician'
                      }
                    </p>
                  </td>
                </tr>
              ) : (
                technicians.map((technician) => (
                    <tr key={technician.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {technician.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaTools className="h-4 w-4 text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {technician.full_name || technician.fullName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {technician.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {technician.created_at ? new Date(technician.created_at).toLocaleDateString() : 'N/A'}
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

      {/* Add/Edit Technician Modal */}
      {isAddModalOpen && <AddTechnicianModal />}
    </div>
  );
};

export default TechniciansList;