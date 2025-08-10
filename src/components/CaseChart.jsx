import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaExclamationTriangle } from 'react-icons/fa';
import { api } from '../utils/api';
import { triggerToast } from '../utils/helper';
import { WidgetLoader } from './Loaders';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CaseChart = () => {
  const [activeTab, setActiveTab] = useState('manager');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDark = useSelector(state => state.theme.isDark);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getCaseGraphData(activeTab);
      
      // Transform the API response from {key: value} to {labels: [], data: []}
      if (response && typeof response === 'object') {
        const labels = Object.keys(response);
        const data = Object.values(response);
        setChartData({ labels, data });
      } else {
        setChartData(null);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setError('Failed to load chart data');
      triggerToast('Failed to load chart data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [activeTab]);

  const getChartConfig = () => {
    if (!chartData || !chartData.labels || !chartData.data) {
      return null;
    }

    const baseColors = activeTab === 'manager' 
      ? ['#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED', '#0891B2', '#65A30D', '#EA580C']
      : ['#059669', '#2563EB', '#D97706', '#DC2626', '#6B7280'];

    // Generate colors that cycle through the base colors for any number of items
    const colors = chartData.labels.map((_, index) => baseColors[index % baseColors.length]);

    return {
      labels: chartData.labels,
      datasets: [
        {
          label: activeTab === 'manager' ? 'Cases by Manager' : 'Cases by Status',
          data: chartData.data,
          backgroundColor: colors,
          borderColor: colors.map(color => color + '80'),
          borderWidth: 1,
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: activeTab === 'manager' ? 'Cases Distribution by Manager' : 'Cases Distribution by Status',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: isDark ? '#E4E6EB' : '#374151',
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(36, 37, 38, 0.95)' : 'rgba(0, 0, 0, 0.8)',
        titleColor: isDark ? '#E4E6EB' : '#FFFFFF',
        bodyColor: isDark ? '#E4E6EB' : '#FFFFFF',
        borderColor: isDark ? '#3A3B3C' : '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} cases (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#B0B3B8' : '#6B7280',
          font: {
            size: 12,
          },
          maxRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? '#3A3B3C' : '#E5E7EB',
          borderDash: [2, 2],
        },
        ticks: {
          color: isDark ? '#B0B3B8' : '#6B7280',
          font: {
            size: 12,
          },
          stepSize: 1,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  const config = getChartConfig();

  return (
    <div className="page-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-facebook-text">
          Case Analytics
        </h2>
        <div className="flex space-x-1 bg-gray-100 dark:bg-facebook-surface rounded-lg p-1">
          <button
            onClick={() => setActiveTab('manager')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'manager'
                ? 'bg-white dark:bg-facebook-hover text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-facebook-textSecondary hover:text-gray-900 dark:hover:text-facebook-text'
            }`}
          >
            Manager
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'status'
                ? 'bg-white dark:bg-facebook-hover text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-facebook-textSecondary hover:text-gray-900 dark:hover:text-facebook-text'
            }`}
          >
            Status
          </button>
        </div>
      </div>

      <div className="h-80">
        {loading && (
          <WidgetLoader message="Loading chart data..." height="80" />
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FaExclamationTriangle className="mx-auto mb-4 text-red-600" size={32} />
              <p className="text-gray-900 dark:text-facebook-text font-medium mb-2">Chart Error</p>
              <p className="text-gray-600 dark:text-facebook-textSecondary mb-4">{error}</p>
              <button 
                onClick={fetchChartData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && config && (
          <Bar data={config} options={chartOptions} />
        )}

        {!loading && !error && !config && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-600 dark:text-facebook-textSecondary">No data available</p>
            </div>
          </div>
        )}
      </div>

      {!loading && !error && chartData && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-facebook-border">
          <div className="flex justify-between text-sm text-gray-600 dark:text-facebook-textSecondary">
            <span>
              Total Cases: {chartData.data ? chartData.data.reduce((a, b) => a + b, 0) : 0}
            </span>
            <span>
              Categories: {chartData.labels ? chartData.labels.length : 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseChart;