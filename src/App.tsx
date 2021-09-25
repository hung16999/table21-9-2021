import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormSelect,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import data from "./constants/users.json";
import { MainTable } from "./components/MainTable";

import { headingTable } from "./constants/heading";

import "./App.css";

enum gender {
  Female = "Female",
  Male = "Male",
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: gender;
  birthday: string;
  salary: number;
  phone: string;
}

const App = () => {
  const [usersIsDisplay, setUsersIsDisplay] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<keyof User>("id");
  const [query, setQuery] = useState<string>("");
  const pageSize = 10;

  const sortUsers = (users: User[]): User[] => {
    return users.sort((a, b) => {
      if (typeof a[orderBy] === "number") {
        return (a[orderBy] as number) - (b[orderBy] as number);
      }

      return (("" + a[orderBy]) as string).localeCompare(b[orderBy] as string);
    });
  };

  const searchUsers = (users: User[]): User[] => {
    if (query) {
      return users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.gender.toLowerCase().includes(query.toLowerCase()) ||
          user.birthday.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.phone.includes(query.toLowerCase()) ||
          user.salary.toString().includes(query.toLowerCase()) ||
          user.id.toString().includes(query.toLowerCase())
      );
    } else {
      return data as User[];
    }
  };

  const paginateData = (users: User[]): User[] => {
    return users.slice(
      (currentPage - 1) * 10,
      (currentPage - 1) * 10 + pageSize
    );
  };

  const renderData = () => {
    const data1 = searchUsers(data as User[]);
    const data2 = sortUsers(data1);
    setTotalPages(data2.length / pageSize);

    setUsersIsDisplay(data2);
  };

  useEffect(() => {
    renderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, orderBy, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersIsDisplay]);

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
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
  };

  const nextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(newPage);
  };

  return (
    <div className="container">
      <h2>A simple web app</h2>
      <div className="d-flex">
        <FormSelect
          className="form-orderby mb-3"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setOrderBy(event.target.value as keyof User);
          }}
        >
          {headingTable.map((heading) => (
            <option key={heading.key} value={heading.key}>
              {heading.name}
            </option>
          ))}
        </FormSelect>

        <InputGroup size="sm" className="mb-3">
          <FormControl
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search query or type something"
          />
        </InputGroup>
      </div>

      <MainTable users={paginateData(usersIsDisplay)} />

      <Pagination>
        <Pagination.Prev onClick={prevPage}>prev</Pagination.Prev>
        {paginate()}
        <Pagination.Next onClick={nextPage}>next</Pagination.Next>
      </Pagination>
    </div>
  );
};

export default App;
