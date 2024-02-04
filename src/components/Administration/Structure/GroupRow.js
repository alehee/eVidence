import React, { useState } from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const GroupRow = ({ group, callbackRefresh }) => {
  const [name, setName] = useState(group.name);
  const [isChanged, setIsChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  function callbackUpdate(response) {
    setIsUpdating(false);
    setIsChanged(false);

    if (response.success) {
      toast.success("Aktualizacja grupy wykonana pomyślnie!");
      callbackRefresh();
    } else {
      toast.error("Wystąpił problem podczas aktualizacji grupy.");
    }
  }

  function callbackDelete(response) {
    setIsUpdating(false);
    setIsChanged(false);

    if (response.success) {
      toast.success("Grupa została usunięta pomyślnie!");
      callbackRefresh();
    } else {
      toast.error("Wystąpił problem podczas usuwania grupy.");
    }
  }

  function confirmDelete() {
    confirmAlert({
      message:
        "Czy na pewno chcesz usunąć grupę `" +
        name +
        "` z ID " +
        group.id +
        "?",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            FetchService.structureGroupDelete(callbackDelete, group.id);
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
        <div className="col-1 text-center">ID {group.id}</div>
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
              FetchService.structureGroupEdit(callbackUpdate, {
                id: group.id,
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
    </div>
  );
};

export default GroupRow;
