import React from 'react';
import styled from 'styled-components';

const Pagination = ({ currentPage, totalCount, onPageChange, totalPages }) => {
  const getPaginationNumbers = () => {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  return (
    <PaginationWrapper>
      <PageArrow
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </PageArrow>
      {getPaginationNumbers().map((page) => (
        <PageNumber
          key={page}
          $active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
      <PageArrow
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalCount === 0}
      >
        {'>'}
      </PageArrow>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  bottom: 20px;
  left: 11.5%;
  width: 100%;
  height: 100%;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PageArrow = styled.button`
  background: transparent;
  border: none;
  font-size: 12px;
  color: ${(props) => (props.disabled ? '#ccc' : '#000')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  &:hover {
    color: ${(props) => (props.disabled ? '#ccc' : '#333')};
  }
`;

const PageNumber = styled.button`
  background: transparent;
  border: none;
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  color: ${({ $active }) => ($active ? '#000' : '#999')};
  cursor: pointer;
  &:hover {
    color: #000;
  }
`;
