import React from 'react';

const Pagination = ({ totalPages, onClick }) => {
    return (
        <div className="pagination-container">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button key={pageNumber} onClick={() => onClick(pageNumber)} className="pagination-button">
              {pageNumber}
            </button>
          ))}
        </div>
      );
};

export default Pagination;
