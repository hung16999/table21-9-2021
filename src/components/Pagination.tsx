import React from "react";
import { Pagination } from "react-bootstrap";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const Panigation = (props: Props) => {
  const { totalPages, setCurrentPage } = props;
  let { currentPage } = props;
  const paginate = () => {
    const link = [];
    for (let i = 1; i <= totalPages; i++) {
      link.push(
        <Pagination.Item
          onClick={() => {
            setCurrentPage(i);
          }}
          key={i}
          active={i === currentPage}
        >
          {i}
        </Pagination.Item>
      );
    }
    return link;
  };

  const prevPage = () => {
    let prevNumber = currentPage - 1;
    setCurrentPage(prevNumber);
  };

  const nextPage = () => {
    let nextNumber = currentPage + 1;
    setCurrentPage(nextNumber);
  };

  return (
    <Pagination>
      <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />

      {paginate()}

      <Pagination.Next
        onClick={nextPage}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};
