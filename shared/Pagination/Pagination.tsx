import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  resultsPerPage?: number;
  totalResults?: number;
}

const SharedPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  resultsPerPage = 10,
  totalResults = 0,
}: PaginationProps) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 7; // Show max 7 page numbers

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate range around current page
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      // Adjust range if too close to edges
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 5);
      } else if (currentPage >= totalPages - 3) {
        start = Math.max(2, totalPages - 4);
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      {/* Results summary */}
      <div className="text-sm text-gray-600 font-medium">
        {startResult}-{endResult} of {totalResults.toLocaleString()}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        {currentPage > 1 && !isLoading ? (
          <Link
            href={`?page=${currentPage - 1}`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <FiChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-lg opacity-50 cursor-not-allowed"
          >
            <FiChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        )}

        {/* Page Numbers */}
        <div className="flex items-center">
          {getVisiblePages().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-sm text-gray-500 bg-white border-t border-b border-gray-300">
                  ...
                </span>
              ) : (
                <Link
                  href={`?page=${page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page as number);
                  }}
                  className={`px-3 py-2 text-sm font-medium transition-colors inline-block ${
                    currentPage === page
                      ? "bg-blue-600 text-white border border-blue-600"
                      : "text-gray-700 bg-white border-t border-b border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {page}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        {currentPage < totalPages && !isLoading ? (
          <Link
            href={`?page=${currentPage + 1}`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            Next
            <FiChevronRight className="w-4 h-4 ml-1" />
          </Link>
        ) : (
          <button
            disabled
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-lg opacity-50 cursor-not-allowed"
          >
            Next
            <FiChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>

      {/* Results per page selector */}
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-gray-600">Results per page:</span>
        <select
          value={resultsPerPage}
          onChange={(e) => {
            // This will be handled by parent component
            const event = new CustomEvent("resultsPerPageChange", {
              detail: parseInt(e.target.value),
            });
            window.dispatchEvent(event);
          }}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default SharedPagination;
