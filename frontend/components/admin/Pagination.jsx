"use client"

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
    <div className="text-sm text-gray-700">Trang {currentPage} / {totalPages}</div>
    <div className="flex space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Trước
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Sau
      </button>
    </div>
  </div>
)

export default Pagination


