import React from "react";
import styled from "styled-components";

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;

  .handle-pagination {
    border: none;
    background-color: #4c934c;
    color: white;
    padding: 5px 12px;
    border-radius: 5px;
    cursor: pointer;
  }

  .page-number {
    border: none;
    background-color: #ffffff;
    color: #4c934c;
    font-weight: normal;
    cursor: pointer;
    padding: 5px 10px;

    &.active {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <StyledPagination>
      <button
        className="handle-pagination"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="handle-pagination"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </StyledPagination>
  );
}
