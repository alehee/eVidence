import React from "react";

const ReportEntrancesRow = ({ entrance }) => {
  function formatDate(str) {
    let arr = str.split("T");
    return arr[0] + " " + arr[1].split(".")[0];
  }

  if (entrance.temporaryCard !== undefined) {
    return (
      <tr>
        <td>Nr karty {entrance.temporaryCard.id}</td>
        <td>{entrance.name}</td>
        <td>{entrance.surname}</td>
        <td>{formatDate(entrance.enter)}</td>
        <td>{entrance.exit === null ? "brak" : formatDate(entrance.exit)}</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{entrance.account.department.name}</td>
      <td>{entrance.account.name}</td>
      <td>{entrance.account.surname}</td>
      <td>{formatDate(entrance.enter)}</td>
      <td>{entrance.exit === null ? "brak" : formatDate(entrance.exit)}</td>
    </tr>
  );
};

export default ReportEntrancesRow;
