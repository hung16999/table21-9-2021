import React from "react";
import { Pagination } from "react-bootstrap";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const Panigation = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) => {
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

  return <Pagination>{paginate()}</Pagination>;
};
