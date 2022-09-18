import React from "react";

const Pagination = ({
  page = 1,
  pageCount = 1,
  onNextPage = () => {},
  onPrevPage = () => {},
}) => {
  return (
    <div className="btn-group">
      <button
        onClick={() => onPrevPage(page - 1)}
        disabled={page === 1}
        className="btn btn-md"
      >
        👈
      </button>
      <button className="btn btn-md">Página {page}</button>
      <button
        onClick={() => onNextPage(page + 1)}
        disabled={page === pageCount}
        className="btn btn-md"
      >
        👉
      </button>
    </div>
  );
};

export default Pagination;
