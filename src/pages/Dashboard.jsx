import { useState, useEffect } from 'react';
import {
  FaTools,
  FaExclamationTriangle,
  FaClipboardList,
  FaUsers,
} from 'react-icons/fa';
import { api } from '../utils/api';
import { triggerToast } from '../utils/helper';
import CaseChart from '../components/CaseChart';
import { PageLoader } from '../components/Loaders';
import StatCard from '../components/StatCard'; // Import the new component

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await api.getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      triggerToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Loading state
  if (loading) {
    return <PageLoader message="Loading dashboard data..." />;
  }

  return (
    <div className="page-section">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaExclamationTriangle size={24} />}
          title="High Priority Cases"
          value="12"
          color="red"
        />
        <StatCard
          icon={<FaClipboardList size={24} />}
          title="Pending Reviews"
          value="8"
          color="blue"
        />
        <StatCard
          icon={<FaUsers size={24} />}
          title="Active Managers"
          value={dashboardData?.managers || '0'}
          color="purple"
        />
        <StatCard
          icon={<FaTools size={24} />}
          title="Active Technicians"
          value={dashboardData?.technicians || '0'}
          color="green"
        />
      </div>

      {/* Chart */}
      <CaseChart />
    </div>
  );
};

export default Dashboard;