import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  itemsPerPage,
  showingStart,
  showingEnd 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      // Adjust if we're near the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-facebook-card border-t border-gray-200 dark:border-facebook-border">
      {/* Items info */}
      <div className="flex items-center text-sm text-gray-700 dark:text-facebook-textSecondary">
        <span>
          Showing {showingStart} to {showingEnd} of {totalItems} results
        </span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
            ${currentPage === 1
              ? 'text-gray-400 dark:text-facebook-textMuted cursor-not-allowed'
              : 'text-gray-700 dark:text-facebook-text hover:bg-gray-100 dark:hover:bg-facebook-hover'
            }
          `}
        >
          <FaChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers[0] > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-facebook-text hover:bg-gray-100 dark:hover:bg-facebook-hover rounded-lg transition-colors"
              >
                1
              </button>
              {pageNumbers[0] > 2 && (
                <span className="px-2 text-gray-500 dark:text-facebook-textMuted">...</span>
              )}
            </>
          )}

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                px-3 py-2 text-sm font-medium rounded-lg transition-colors
                ${page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-facebook-text hover:bg-gray-100 dark:hover:bg-facebook-hover'
                }
              `}
            >
              {page}
            </button>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="px-2 text-gray-500 dark:text-facebook-textMuted">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-facebook-text hover:bg-gray-100 dark:hover:bg-facebook-hover rounded-lg transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
            ${currentPage === totalPages
              ? 'text-gray-400 dark:text-facebook-textMuted cursor-not-allowed'
              : 'text-gray-700 dark:text-facebook-text hover:bg-gray-100 dark:hover:bg-facebook-hover'
            }
          `}
        >
          Next
          <FaChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination; 