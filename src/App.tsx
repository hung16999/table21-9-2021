import React, { useState } from "react";
import { Form, Table } from "react-bootstrap";
import data from "./constants/users.json";

import "./App.css";

const App = () => {
  const [users] = useState(data);
  const headingTable = [
    "id",
    "First Name",
    "Last Name",
    "Email",
    "Gender",
    "Birthday",
    "Salary",
    "Phone",
  ];
  console.log(users);

  const parseDate = (dateString: string): string => {
    const date = dateString.split("T")[0].split("-");
    const [year, month, day] = date;

    return day + "/" + month + "/" + year;
  };

  const parsePhone = (phone: string): string => {
    const phoneNumber = phone.split("-");
    const numberRegion = "(+84)";

    return numberRegion + phoneNumber.join("");
  };

  return (
    <>
      <h2>A simple web app</h2>

      <div className="form-order-by mb-3">
        <h4>OrderBy</h4>
        <Form.Select>
          {headingTable.map((heading) => (
            <option key={heading} value={heading}>
              {heading}
            </option>
          ))}
        </Form.Select>
      </div>

      <Table striped={true} bordered={true} hover={true}>
        <thead>
          <tr>
            {headingTable.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{parseDate(user.birthday)}</td>
              <td>{user.salary}</td>
              <td>{parsePhone(user.phone)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default App;
