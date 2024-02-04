import React from "react";

const ReportProcessesRow = ({ processRow }) => {
  function formatDate(str) {
    let arr = str.split("T");
    return arr[0] + " " + arr[1].split(".")[0];
  }

  let nameCols = [];
  if (processRow.temporaryEntrance !== null) {
    nameCols.push(<td>{processRow.temporaryEntrance.name}</td>);
    nameCols.push(<td>{processRow.temporaryEntrance.surname}</td>);
  } else {
    nameCols.push(<td>{processRow.account.name}</td>);
    nameCols.push(<td>{processRow.account.surname}</td>);
  }

  return (
    <tr>
      <td>{processRow.department.name}</td>
      {nameCols}
      <td>
        <span
          className="badge"
          style={{ backgroundColor: processRow.process.color }}
        >
          {processRow.process.name}
        </span>
      </td>
      <td>{formatDate(processRow.start)}</td>
      <td>{processRow.stop === null ? "brak" : formatDate(processRow.stop)}</td>
    </tr>
  );
};

export default ReportProcessesRow;
