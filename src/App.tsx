import React, { useEffect, useState } from "react";
import { FormControl, FormSelect, InputGroup } from "react-bootstrap";
import data from "./constants/users.json";
import { MainTable } from "./components/MainTable";
import { Panigation } from "./components/Pagination";

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
  const [users] = useState<User[]>(data as User[]);
  const totalPages = Math.ceil(users.length / 10);
  let [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<keyof User>("id");
  const [textSearch, setTextSearch] = useState<string>("");

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

  const filterUsers = (): User[] => {
    if (textSearch) {
      return users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(textSearch.toLowerCase()) ||
          user.lastName.toLowerCase().includes(textSearch.toLowerCase()) ||
          user.gender.toLowerCase().includes(textSearch.toLowerCase()) ||
          user.birthday.toLowerCase().includes(textSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(textSearch.toLowerCase()) ||
          user.phone.includes(textSearch.toLowerCase()) ||
          user.salary.toString().includes(textSearch.toLowerCase()) ||
          user.id.toString().includes(textSearch.toLowerCase())
      );
    }

    return users;
  };

  const paginateData = (): User[] => {
    if (!textSearch) {
      return filterUsers().slice(
        (currentPage - 1) * 10,
        (currentPage - 1) * 10 + 10
      );
    }
    return users.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);
  };

  const sortUsers = (): User[] => {
    return paginateData().sort((a, b) => {
      if (typeof a[sortBy] === "number") {
        return (a[sortBy] as number) - (b[sortBy] as number);
      }

      return (("" + a[sortBy]) as string).localeCompare(b[sortBy] as string);
    });
  };

  return (
    <div className="container">
      <h2>A simple web app</h2>

      <FormSelect
        className="form-orderby mb-3"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setSortBy(event.target.value as keyof User);
        }}
      >
        {headingTable.map((heading) => (
          <option key={heading.key} value={heading.key}>
            {heading.name}
          </option>
        ))}
      </FormSelect>

      <InputGroup size="sm" className="mb-3">
        <FormControl onChange={(event) => setTextSearch(event.target.value)} />
      </InputGroup>

      {/* tối ưu cái này */}
      <MainTable users={sortUsers()} headingTable={headingTable} />
      <MainTable users={filterUsers()} headingTable={headingTable} />

      <Panigation
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
