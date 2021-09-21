import React from "react";
import { FormSelect } from "react-bootstrap";

interface Props {
  headingTable: { key: string; name: string }[];
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

export const OrderBy = ({ headingTable, setSortBy }: Props) => {
  const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="form-order-by mb-3">
      <h3>OrderBy</h3>
      <FormSelect onChange={changeSelect}>
        {headingTable.map((heading) => (
          <option key={heading.key} value={heading.key}>
            {heading.name}
          </option>
        ))}
      </FormSelect>
    </div>
  );
};
