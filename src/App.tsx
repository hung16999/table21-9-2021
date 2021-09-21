import React, { useEffect, useState } from "react";

import data from "./constants/users.json";

import "./App.css";
import { MainTable } from "./components/Table";
import { OrderBy } from "./components/OrderBy";
import { Panigation } from "./components/Pagination";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: string;
  salary: number;
  phone: string;
}

const App = () => {
  const [users] = useState<User[]>(data);
  const totalPages = Math.ceil(users.length / 10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");

  const headingTable = [
    { key: "id", name: "ID" },
    { key: "firstName", name: "First Name" },
    { key: "lastName", name: "Last Name" },
    { key: "email", name: "Email" },
    { key: "gender", name: "Gender" },
    { key: "birthday", name: "Birthday" },
    { key: "salary", name: "Salary" },
    { key: "phone", name: "Phone" },
  ];

  const paginateData = (): User[] => {
    return users.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
  };

  const sortUsers = () => {
    switch (sortBy) {
      case "firstName":
        return paginateData().sort((a, b) =>
          ("" + a.firstName).localeCompare(b.firstName)
        );
      case "lastName":
        return paginateData().sort((a, b) =>
          ("" + a.lastName).localeCompare(b.lastName)
        );
      case "gender":
        return paginateData().sort((a, b) =>
          ("" + a.gender).localeCompare(b.gender)
        );
      case "phone":
        return paginateData().sort((a, b) =>
          ("" + a.phone).localeCompare(b.phone)
        );
      case "email":
        return paginateData().sort((a, b) =>
          ("" + a.email).localeCompare(b.email)
        );
      case "salary":
        return paginateData().sort((a, b) => a.salary - b.salary);
      case "birthday":
        return paginateData().sort((a, b) =>
          ("" + a.birthday).localeCompare(b.birthday)
        );
      default:
        return paginateData().sort((a, b) => a.id - b.id);
    }
  };

  return (
    <div className="container">
      <h2>A simple web app</h2>
      <OrderBy headingTable={headingTable} setSortBy={setSortBy} />
      <MainTable users={sortUsers()} headingTable={headingTable} />
      <Panigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default App;
