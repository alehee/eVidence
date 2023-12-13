import React, { useState } from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DepartmentsRowGroups from "./DepartmentsRowGroups";

const DepartmentsRow = ({ department, groups, callbackRefresh }) => {
  const [name, setName] = useState(department.name);
  const [isChanged, setIsChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  function callbackUpdate(response) {
    setIsUpdating(false);
    setIsChanged(false);

    if (response.success) {
      toast.success("Aktualizacja działu wykonana pomyślnie!");
      callbackRefresh();
    } else {
      toast.error("Wystąpił problem podczas aktualizacji działu.");
    }
  }

  function callbackDelete(response) {
    setIsUpdating(false);
    setIsChanged(false);

    if (response.success) {
      toast.success("Dział usunięty pomyślnie!");
      callbackRefresh();
    } else {
      toast.error("Wystąpił problem podczas usuwania działu.");
    }
  }

  function confirmDelete() {
    confirmAlert({
      message:
        "Czy na pewno chcesz usunąć dział `" +
        name +
        "` z ID " +
        department.id +
        "?",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            FetchService.structureDepartmentDelete(
              callbackDelete,
              department.id
            );
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

  return (
    <div className="my-5">
      <div className="row m-2">
        <div className="col-1 text-center">ID {department.id}</div>
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
        <div className="col-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              FetchService.structureDepartmentEdit(callbackUpdate, {
                id: department.id,
                name: name,
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
        <div className="col-2">
          <button
            className="btn btn-danger"
            onClick={() => {
              confirmDelete();
            }}
          >
            Usuń
          </button>
          <div
            class="spinner-border mx-2"
            role="status"
            hidden={!isUpdating}
          ></div>
        </div>
      </div>
      <div className="row m-2">
        <div
          className="btn btn-info w-50 mx-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#structure-departments-groups-" + department.id}
        >
          Grupy działu
        </div>
        <div
          class="collapse"
          id={"structure-departments-groups-" + department.id}
        >
          <DepartmentsRowGroups
            department={department}
            groups={groups}
            callbackRefresh={callbackRefresh}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentsRow;
