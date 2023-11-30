import React, { useState } from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ProcessesRow = ({ process, callbackRefresh }) => {
  const [name, setName] = useState(process.name);
  const [shortName, setShortName] = useState(process.shortName);
  const [color, setColor] = useState(process.color);
  const [isChanged, setIsChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  function callbackUpdate(response) {
    setIsUpdating(false);
    setIsChanged(false);

    if (response.success) {
      toast.success("Aktualizacja procesu wykonana pomyślnie!");
      callbackRefresh();
    } else {
      toast.error("Wystąpił problem podczas aktualizacji procesu.");
    }
  }

  function callbackDelete(response) {
    setIsUpdating(false);
    setIsChanged(false);

    if (response.success) {
      toast.success("Proces usunięty pomyślnie!");
      window.location.reload();
    } else {
      toast.error("Wystąpił problem podczas usuwania procesu.");
    }
  }

  function handleShortNameChange(newShortName) {
    if (newShortName.length < 1 || newShortName.length > 11) {
      toast("Skrócona nazwa procesu powinna zawierać od 1 do 10 znaków.");
      return;
    }
    setShortName(newShortName);
    setIsChanged(true);
  }

  function confirmDelete() {
    confirmAlert({
      message:
        "Czy na pewno chcesz usunąć proces `" +
        name +
        "` z ID " +
        process.id +
        "?",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            FetchService.processDelete(callbackDelete, process.id);
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
        <div className="col-1 text-center">ID {process.id}</div>
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
            value={shortName}
            onChange={(event) => {
              handleShortNameChange(event.target.value);
            }}
            disabled={isUpdating}
          />
        </div>
        <div className="col">
          <input
            type="color"
            class="form-control"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
              setIsChanged(true);
            }}
            disabled={isUpdating}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              FetchService.processEdit(callbackUpdate, {
                id: process.id,
                name: name,
                shortName: shortName,
                color: color,
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

export default ProcessesRow;
