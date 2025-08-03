import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-facebook-dark dark:to-slate-800 px-4">
      <div className="max-w-md w-full text-center">
        {/* SVG Logo */}
        <div className="mb-8">
          <svg
            className="mx-auto w-32 h-32 text-slate-400 dark:text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01"
            />
          </svg>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-slate-800 dark:text-facebook-text mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-facebook-textSecondary mb-4">
          Page Not Found
        </h2>

        {/* Quote */}
        <div className="mb-8 p-6 bg-white dark:bg-facebook-card rounded-xl shadow-sm border border-slate-200 dark:border-facebook-border">
          <blockquote className="text-slate-600 dark:text-facebook-textSecondary italic">
            &quot;The only impossible journey is the one you never begin.&quot;
          </blockquote>
          <cite className="block mt-2 text-sm text-slate-500 dark:text-facebook-textMuted">
            — Tony Robbins
          </cite>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-facebook-textSecondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist. But don&apos;t worry, every great journey starts with a single step.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <FaHome className="mr-2" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-facebook-border text-gray-700 dark:text-facebook-text bg-white dark:bg-facebook-surface rounded-lg hover:bg-gray-50 dark:hover:bg-facebook-hover shadow-sm hover:shadow-md transition-all"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-slate-500 dark:text-facebook-textMuted">
          <p>Need help? Contact our support team</p>
          <a 
                            href="mailto:support@everpase.com" 
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            support@everpase.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 