import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  FaUserTie, 
  FaTools, 
  FaExclamationTriangle, 
  FaClipboardList,
  FaChartBar,
  FaArrowUp,
  FaSpinner
} from 'react-icons/fa';
import { api } from '../utils/api';
import { triggerToast } from '../utils/helper';
import CaseChart from '../components/CaseChart';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDark = useSelector(state => state.theme.isDark);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
      triggerToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Generate stats from API data
  const getStats = () => {
    if (!dashboardData) return [];
    
    return [
      {
        title: 'Total Technicians',
        value: dashboardData.technicians?.toString() || '0',
        change: 'Active in system',
        changeType: 'neutral',
        icon: FaTools,
        color: 'bg-blue-600'
      },
      {
        title: 'Total Managers',
        value: dashboardData.managers?.toString() || '0',
        change: 'Managing teams',
        changeType: 'neutral',
        icon: FaUserTie,
        color: 'bg-green-600'
      },
      {
        title: 'Total Issues',
        value: dashboardData.issues?.toString() || '0',
        change: 'Reported issues',
        changeType: 'neutral',
        icon: FaExclamationTriangle,
        color: 'bg-yellow-600'
      },
      {
        title: 'Total Cases',
        value: dashboardData.cases?.toString() || '0',
        change: 'In the system',
        changeType: 'neutral',
        icon: FaClipboardList,
        color: 'bg-purple-600'
      }
    ];
  };

  const stats = getStats();

  const recentCases = [
    {
      id: 1,
      caseNumber: '#CASE-2024-001',
      title: 'Network Connectivity Issue',
      technician: 'John Smith',
      manager: 'Mike Johnson',
      priority: 'high',
      status: 'in_progress',
      time: '2 min ago'
    },
    {
      id: 2,
      caseNumber: '#CASE-2024-002',
      title: 'Software Installation Problem',
      technician: 'Sarah Wilson',
      manager: 'David Brown',
      priority: 'medium',
      status: 'completed',
      time: '5 min ago'
    },
    {
      id: 3,
      caseNumber: '#CASE-2024-003',
      title: 'Hardware Replacement',
      technician: 'Michael Davis',
      manager: 'Lisa Anderson',
      priority: 'low',
      status: 'pending',
      time: '12 min ago'
    },
    {
      id: 4,
      caseNumber: '#CASE-2024-004',
      title: 'Security Audit',
      technician: 'Emma Thompson',
      manager: 'Robert Wilson',
      priority: 'high',
      status: 'completed',
      time: '15 min ago'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'technician_added',
      message: 'New technician added: John Smith',
      time: '2 min ago',
      icon: FaTools,
      color: 'text-blue-500'
    },
    {
      id: 2,
      type: 'case_created',
      message: 'New case created: Network Connectivity Issue',
      time: '5 min ago',
      icon: FaClipboardList,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'case_completed',
      message: 'Case completed: Software Installation Problem',
      time: '8 min ago',
      icon: FaClipboardList,
      color: 'text-green-500'
    },
    {
      id: 4,
      type: 'issue_reported',
      message: 'New issue reported: Server downtime',
      time: '12 min ago',
      icon: FaExclamationTriangle,
      color: 'text-red-500'
    },
    {
      id: 5,
      type: 'manager_assigned',
      message: 'Manager assigned to case #CASE-2024-005',
      time: '15 min ago',
      icon: FaUserTie,
      color: 'text-purple-500'
    }
  ];

  const topTechnicians = [
    {
      id: 1,
      name: 'Mike Johnson',
      manager: 'Sarah Williams',
      casesCompleted: 156,
      efficiency: '98%',
      status: 'active',
      avatar: 'MJ'
    },
    {
      id: 2,
      name: 'David Brown',
      manager: 'Lisa Anderson',
      casesCompleted: 142,
      efficiency: '95%',
      status: 'active',
      avatar: 'DB'
    },
    {
      id: 3,
      name: 'Lisa Anderson',
      manager: 'Robert Wilson',
      casesCompleted: 128,
      efficiency: '92%',
      status: 'inactive',
      avatar: 'LA'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return isDark ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-100';
      case 'in_progress':
        return isDark ? 'text-blue-400 bg-blue-900/20' : 'text-blue-600 bg-blue-100';
      case 'pending':
        return isDark ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-600 bg-yellow-100';
      default:
        return isDark ? 'text-facebook-textSecondary bg-facebook-surface' : 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return isDark ? 'text-red-400 bg-red-900/20' : 'text-red-600 bg-red-100';
      case 'medium':
        return isDark ? 'text-yellow-400 bg-yellow-900/20' : 'text-yellow-600 bg-yellow-100';
      case 'low':
        return isDark ? 'text-green-400 bg-green-900/20' : 'text-green-600 bg-green-100';
      default:
        return isDark ? 'text-facebook-textSecondary bg-facebook-surface' : 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="page-section">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <FaSpinner className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
            <p className="text-gray-600 dark:text-facebook-textSecondary">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="page-section">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <FaExclamationTriangle className="mx-auto mb-4 text-red-600" size={40} />
            <p className="text-gray-900 dark:text-facebook-text font-medium mb-2">Dashboard Error</p>
            <p className="text-gray-600 dark:text-facebook-textSecondary mb-4">{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">

      {/* Header */}
      <div className="page-header mb-6">
        <div>
          <h1 className="page-title">EverPase Dashboard</h1>
          <p className="page-subtitle mt-1">
            Welcome back! Here&apos;s an overview of your case management system.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-facebook-border rounded-lg bg-white dark:bg-facebook-surface text-gray-900 dark:text-facebook-text focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="page-card p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-facebook-textSecondary">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-facebook-text mt-2">
                  {stat.value}
                </p>
                <p className="text-sm mt-2 text-gray-500 dark:text-facebook-textMuted">
                  {stat.change}
                </p>
              </div>
              <div className={`p-4 rounded-full ${stat.color} text-white shadow-lg`}>
                <stat.icon size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className="lg:col-span-2">
          <div className="page-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-facebook-text">
                Recent Cases
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentCases.map((caseItem) => (
                <div key={caseItem.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-facebook-surface rounded-lg hover:bg-gray-100 dark:hover:bg-facebook-hover transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaClipboardList className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-facebook-text">
                        {caseItem.caseNumber}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-facebook-textSecondary">
                        {caseItem.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-facebook-textMuted">
                        Technician: {caseItem.technician} • {caseItem.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority.toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}>
                      {getStatusText(caseItem.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-1">
          <div className="page-card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-facebook-text mb-6">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
                    <activity.icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-facebook-text">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-facebook-textMuted mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Top Technicians */}
        <div className="page-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-facebook-text">
              Top Technicians
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topTechnicians.map((technician) => (
              <div key={technician.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-facebook-surface rounded-lg hover:bg-gray-100 dark:hover:bg-facebook-hover transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    {technician.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-facebook-text">
                      {technician.name}
                    </p>
                                         <div className="flex items-center space-x-2 mt-1">
                       <FaArrowUp className="text-green-500 text-xs" />
                       <span className="text-sm text-gray-600 dark:text-facebook-textSecondary">
                         {technician.efficiency} ({technician.casesCompleted} cases)
                       </span>
                     </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-facebook-textSecondary">
                    Manager: {technician.manager}
                  </p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    technician.status === 'active' 
                      ? 'text-green-600 bg-green-100' 
                      : 'text-gray-600 bg-gray-100'
                  }`}>
                    {technician.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Overview */}
        <div className="page-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-facebook-text mb-6">
            System Overview
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <FaChartBar className="text-blue-600 dark:text-blue-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900 dark:text-facebook-text">94.2%</p>
                <p className="text-sm text-gray-600 dark:text-facebook-textSecondary">Resolution Rate</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <FaArrowUp className="text-green-600 dark:text-green-400 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900 dark:text-facebook-text">2.3h</p>
                <p className="text-sm text-gray-600 dark:text-facebook-textSecondary">Avg Response Time</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-facebook-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaExclamationTriangle className="text-red-600 dark:text-red-400" />
                  <span className="text-sm text-gray-900 dark:text-facebook-text">High Priority Cases</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-facebook-text">12</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-facebook-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaClipboardList className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-gray-900 dark:text-facebook-text">Pending Reviews</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-facebook-text">8</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-facebook-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaTools className="text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-900 dark:text-facebook-text">Active Technicians</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-facebook-text">{dashboardData?.technicians || '0'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Case Analytics Chart */}
        <div className="lg:col-span-2">
          <CaseChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;