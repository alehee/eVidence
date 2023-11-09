import React from "react";

const Process = ({ process, callback }) => {
  return (
    <div
      className="text-center my-2 w-25 mx-auto"
      style={{ backgroundColor: process.color }}
      onClick={() => callback(process.id)}
    >
      {process.name}
    </div>
  );
};
export default Process;
