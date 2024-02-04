import React, { useState } from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const UsersRow = ({ user, departments, callbackRefresh }) => {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [departmentId, setDepartmentId] = useState(user.department.id);
  const [isChanged, setIsChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  function callbackUpdate(response) {
    setIsUpdating(false);
    setIsChanged(false);

    if (response.success) {
      toast.success("Aktualizacja wykonana pomyślnie");
      callbackRefresh();
    } else {
      toast.error("Wystąpił problem podczas aktualizacji");
    }
  }

  function confirmResetKeycard() {
    confirmAlert({
      message:
        "Czy na pewno chcesz wyczyścić kartę użytkownika `" +
        name +
        " " +
        surname +
        "` z ID " +
        user.id +
        "?",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            FetchService.accountResetKeycard(callbackUpdate, user.id);
          },
        },
        {
          label: "Nie",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }

  function selectDepartment() {
    let options = [];
    Object.keys(departments).forEach((key) => {
      options.push(
        <option className="text-dark" value={key}>
          {departments[key]}
        </option>
      );
    });
    return (
      <select
        className="form-select text-dark"
        value={departmentId}
        onChange={(event) => {
          setDepartmentId(event.target.value);
          setIsChanged(true);
        }}
        disabled={isUpdating}
      >
        {options}
      </select>
    );
  }

  return (
    <div className="row my-3">
      <div className="col-1 text-center">ID {user.id}</div>
      <div className="col">
        <input
          type="text"
          class="form-control"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setIsChanged(true);
          }}
          disabled={isUpdating}
        />
      </div>
      <div className="col">
        <input
          type="text"
          class="form-control"
          value={surname}
          onChange={(event) => {
            setSurname(event.target.value);
            setIsChanged(true);
          }}
          disabled={isUpdating}
        />
      </div>
      <div className="col">{selectDepartment()}</div>
      <div className="col text-center">
        {user.keycard === null ? "brak karty" : user.keycard}{" "}
        <button
          className="btn btn-warning"
          onClick={() => confirmResetKeycard()}
          disabled={isUpdating}
          hidden={user.keycard === null}
        >
          Wyczyść kartę
        </button>
      </div>
      <div className="col">
        <button
          className="btn btn-primary"
          onClick={() => {
            FetchService.accountEdit(callbackUpdate, {
              id: user.id,
              name: name,
              surname: surname,
              departmentId: departmentId,
            });
          }}
          disabled={!isChanged}
        >
          Aktualizuj
        </button>
        <div
          class="spinner-border mx-2"
          role="status"
          hidden={!isUpdating}
        ></div>
      </div>
    </div>
  );
};

export default UsersRow;
