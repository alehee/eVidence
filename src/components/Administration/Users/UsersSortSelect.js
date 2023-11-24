import React from "react";

const UsersSortSelect = ({ callback, selected }) => {
  function validateSortType(event) {
    const sortType = event.target.value;
    if (!["surname", "department"].includes(sortType)) return;
    callback(sortType);
  }

  return (
    <select
      className="form-select text-dark"
      onChange={validateSortType}
      value={selected}
    >
      <option className="text-dark" value="surname" selected>
        Wg nazwiska
      </option>
      <option className="text-dark" value="department">
        Wg działu
      </option>
    </select>
  );
};
export default UsersSortSelect;
