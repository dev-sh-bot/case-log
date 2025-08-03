import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  showingStart,
  showingEnd,
}) => {
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // react-paginate uses 0-based indexing
    onPageChange(selectedPage);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-facebook-card border-t border-gray-200 dark:border-facebook-border">
      {/* Items info */}
      <div className="flex items-center text-sm text-gray-700 dark:text-facebook-textSecondary">
        <span>
          Showing {showingStart} to {showingEnd} of {totalItems} results
        </span>
      </div>

      {/* Pagination controls */}
      <ReactPaginate
        previousLabel={
          <div className="flex items-center">
            <FaChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </div>
        }
        nextLabel={
          <div className="flex items-center">
            Next
            <FaChevronRight className="w-4 h-4 ml-1" />
          </div>
        }
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1} // Convert to 0-based indexing
        containerClassName="flex items-center space-x-2"
        pageClassName="px-3 py-2 text-sm font-medium text-gray-700 dark:text-facebook-text hover:bg-gray-100 dark:hover:bg-facebook-hover rounded-lg transition-colors"
        pageLinkClassName="block"
        activeClassName="bg-blue-600 dark:bg-blue-600 text-white"
        activeLinkClassName="block"
        previousClassName="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-facebook-text hover:bg-gray-100 dark:hover:bg-facebook-hover rounded-lg transition-colors"
        previousLinkClassName="block"
        nextClassName="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-facebook-text hover:bg-gray-100 dark:hover:bg-facebook-hover rounded-lg transition-colors"
        nextLinkClassName="block"
        disabledClassName="text-gray-400 dark:text-facebook-textMuted cursor-not-allowed opacity-50"
        disabledLinkClassName="block"
        breakClassName="px-2 text-gray-500 dark:text-facebook-textMuted"
        breakLinkClassName="block"
      />
    </div>
  );
};

// PropTypes definition
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  showingStart: PropTypes.number.isRequired,
  showingEnd: PropTypes.number.isRequired,
};

export default Pagination; 