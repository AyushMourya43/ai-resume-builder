import React, { useState, useRef, useEffect } from 'react';
import '../styles/pageContainer.css';

const PageContainer = ({ children, className = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const containerRef = useRef(null);
  const pageRef = useRef(null);

  // A4 page dimensions (in pixels at 96 DPI)
  const PAGE_WIDTH = 794; // A4 width
  const PAGE_HEIGHT = 1123; // A4 height
  const PAGE_MARGIN = 40; // Margin around content
  const CONTENT_HEIGHT = PAGE_HEIGHT - (PAGE_MARGIN * 2);

  useEffect(() => {
    const calculatePages = () => {
      if (containerRef.current) {
        const contentHeight = containerRef.current.scrollHeight;
        const pages = Math.ceil(contentHeight / CONTENT_HEIGHT);
        setTotalPages(Math.max(1, pages));
      }
    };

    // Calculate pages after content renders
    const timer = setTimeout(calculatePages, 300);
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Page Container */}
      <div
        ref={pageRef}
        className="page-container page-wrapper"
        style={{
          width: `${PAGE_WIDTH}px`,
          height: `${PAGE_HEIGHT}px`,
          backgroundColor: '#ffffff',
          border: '3px solid #374151',
          borderRadius: '8px',
          padding: `${PAGE_MARGIN}px`,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        {/* Page Border */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            border: '1px solid #d1d5db',
            pointerEvents: 'none',
            borderRadius: '5px',
          }}
        />
        
        {/* Content */}
        <div
          ref={containerRef}
          className="page-content content-overflow"
          style={{
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {children}
        </div>

        {/* Page Number */}
        <div className="page-number">
          Page {currentPage} of {totalPages}
        </div>

        {/* Page Border Indicator */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            border: '2px solid #e5e7eb',
            pointerEvents: 'none',
            borderRadius: '6px',
          }}
        />
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls flex items-center gap-4 mb-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </button>
          
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Print/Download Instructions */}
      <div className="print-instructions text-sm text-gray-600 text-center max-w-md bg-gray-50 p-4 rounded-lg border">
        <p className="mb-2 font-semibold text-gray-800">
          📄 Print/Download Instructions:
        </p>
        <ul className="list-disc list-inside text-left space-y-1">
          <li>Set page size to <strong>A4</strong></li>
          <li>Set margins to <strong>minimum (0.5 inches)</strong></li>
          <li>Disable headers and footers</li>
          <li>Use <strong>"Fit to page"</strong> scaling</li>
          <li>Ensure <strong>"Background graphics"</strong> is enabled</li>
        </ul>
      </div>

      {/* Page Limit Warning */}
      {totalPages > 1 && (
        <div className="page-warning mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
          <p className="font-medium">⚠️ Content exceeds single page limit</p>
          <p>Consider condensing content or removing less important sections to fit on one page for better professional presentation.</p>
        </div>
      )}
    </div>
  );
};

export default PageContainer; 