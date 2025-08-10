import { ColorRing } from "react-loader-spinner";
import PropTypes from 'prop-types';

export const LoadingSpinner = () => (
  <div className="h-screen w-full flex justify-center items-center">
    <ColorRing
      visible={true}
      height="180"
      width="180"
      colors={['#3B82F6', "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A"]}
      wrapperStyle={{ margin: "0 auto" }}
    />
  </div>
);

// Compact loading spinner for forms and buttons
export const FormLoadingSpinner = ({ size = 4 }) => (
  <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-white`}></div>
);

// Inline loading spinner with text
export const InlineLoader = ({ text = "Loading...", iconSize = 6, className = "" }) => (
  <div className={`flex items-center justify-center space-x-3 ${className}`}>
    <div className={`animate-spin rounded-full h-${iconSize} w-${iconSize} border-b-2 border-blue-500`}></div>
    <span className="text-gray-600 dark:text-facebook-textSecondary">{text}</span>
  </div>
);

// Table loading state
export const TableLoader = ({ columns = 4, message = "Loading data..." }) => (
  <tr>
    <td colSpan={columns} className="px-6 py-12 text-center text-gray-500 dark:text-facebook-textSecondary">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-lg font-medium text-gray-700 dark:text-facebook-text">{message}</p>
    </td>
  </tr>
);

// Chart/Widget loading state
export const WidgetLoader = ({ message = "Loading...", height = "full" }) => (
  <div className={`flex items-center justify-center h-${height}`}>
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-facebook-textSecondary">{message}</p>
    </div>
  </div>
);

// Page section loading state
export const PageLoader = ({ message = "Loading..." }) => (
  <div className="page-section">
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-facebook-textSecondary">{message}</p>
      </div>
    </div>
  </div>
);

// Button loading state
export const ButtonLoader = ({ text = "Loading...", size = 4 }) => (
  <>
    <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-white mr-2`}></div>
    {text}
  </>
);

// PropTypes
FormLoadingSpinner.propTypes = {
  size: PropTypes.number
};

InlineLoader.propTypes = {
  text: PropTypes.string,
  iconSize: PropTypes.number,
  className: PropTypes.string
};

TableLoader.propTypes = {
  columns: PropTypes.number,
  message: PropTypes.string
};

WidgetLoader.propTypes = {
  message: PropTypes.string,
  height: PropTypes.string
};

PageLoader.propTypes = {
  message: PropTypes.string
};

ButtonLoader.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number
};
