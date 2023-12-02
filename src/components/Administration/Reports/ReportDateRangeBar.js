import React from "react";

const ReportDateRangeBar = ({ callback }) => {
  const [start, setStart] = useState(null);
  const [stop, setStop] = useState(null);

  function handleRefreshButton() {
    if (start === null || stop === null) {
      toast("Wypełnij obie daty generowania!");
      return;
    }

    if (new Date(stop) < new Date(start)) {
      toast("Data końca generowania nie może być wcześniej niż początku!");
      return;
    }

    callback(start, stop);
  }

  return (
    <div>
      Od{" "}
      <input
        type="date"
        class="form-control"
        value={start}
        onChange={(event) => {
          setStart(event.target.value);
        }}
      />
      do{" "}
      <input
        type="date"
        class="form-control"
        value={stop}
        onChange={(event) => {
          setStop(event.target.value);
        }}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          handleRefreshButton();
        }}
      >
        Odśwież
      </button>
    </div>
  );
};

export default ReportDateRangeBar;
