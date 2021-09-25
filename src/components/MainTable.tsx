import React from "react";
import { Table } from "react-bootstrap";
import { User } from "../App";
import { headingTable } from "../constants/heading";

interface Props {
  users: User[] | undefined;
}

export const MainTable = ({ users }: Props) => {
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
    <Table striped={true} bordered={true} hover={true}>
      <thead>
        <tr>
          {headingTable.map((heading) => (
            <th key={heading.key}>{heading.name}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {users ? (
          users.map((user) => (
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
          ))
        ) : (
          <tr></tr>
        )}
      </tbody>
    </Table>
  );
};
