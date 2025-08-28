
import PropTypes from 'prop-types';

const StatCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className="bg-white dark:bg-facebook-card rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <div className={`bg-gradient-to-r ${colorClasses[color] || 'from-gray-500 to-gray-600'} p-4`}>
        <div className="flex items-center justify-between">
          <div className="text-white">
            {icon}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-white opacity-90">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.oneOf(['red', 'blue', 'purple', 'green']),
};

export default StatCard;
