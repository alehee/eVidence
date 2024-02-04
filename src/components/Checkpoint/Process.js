import React from "react";

const Process = ({ process, callback }) => {
  return (
    <div
      className="d-inline-block text-center p-3 m-1 cursor-pointer border rounded"
      style={{ backgroundColor: process.color }}
      onClick={() => callback(process.id)}
    >
      {process.name}
    </div>
  );
};
export default Process;
