import React, { useState } from "react";
import toast from "react-hot-toast";
import FetchService from "../../../services/FetchService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdministratorRow = ({ administrator, callbackRefresh }) => {
  const [login, setLogin] = useState(administrator.login);
  const [permissionAdministrator, setPermissionAdministrator] = useState(
    administrator.permissionAdministrator
  );
  const [permissionUser, setPermissionUser] = useState(
    administrator.permissionUser
  );
  const [permissionProcess, setPermissionProcess] = useState(
    administrator.permissionProcess
  );
  const [permissionReport, setPermissionReport] = useState(
    administrator.permissionReport
  );
  const [isChanged, setIsChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  function callbackUpdate(response) {
    setIsUpdating(false);
    setIsChanged(false);

    if (response.success) {
      toast.success("Aktualizacja wykonana pomyślnie!");
    } else {
      toast.error("Wystąpił problem podczas aktualizacji");
    }
  }

  function callbackDelete(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas usuwania administratora");
      return;
    }
    toast.success("Administrator usunięty pomyślnie!");
    callbackRefresh();
  }

  function confirmPasswordReset() {
    confirmAlert({
      message:
        "Czy jesteś pewien, że chcesz zresetować hasło dla administratora `" +
        administrator.login +
        "`?",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            FetchService.administrationPasswordReset(
              callbackUpdate,
              administrator.id
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

  function confirmDeleteAdministrator() {
    confirmAlert({
      message:
        "Czy jesteś pewien, że chcesz usunąć administratora `" +
        administrator.login +
        "`?",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            FetchService.administrationDeleteAdministrator(
              callbackDelete,
              administrator.id
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
    <div className="row my-3">
      <div className="col-4">
        <div>Login</div>
        <input
          type="text"
          class="form-control"
          value={login}
          onChange={(event) => {
            setLogin(event.target.value);
            setIsChanged(true);
          }}
          disabled={isUpdating}
        />
      </div>
      <div className="col form-check">
        <div className="d-block">
          <input
            class="form-check-input"
            type="checkbox"
            checked={permissionAdministrator}
            onChange={() => {
              setPermissionAdministrator(!permissionAdministrator);
              setIsChanged(true);
            }}
          />
          <label class="form-check-label">Uprawnienia administatora</label>
        </div>
        <div className="d-block">
          <input
            class="form-check-input"
            type="checkbox"
            checked={permissionUser}
            onChange={() => {
              setPermissionUser(!permissionUser);
              setIsChanged(true);
            }}
          />
          <label class="form-check-label">Uprawnienia użytkowników</label>
        </div>
        <div className="d-block">
          <input
            class="form-check-input"
            type="checkbox"
            checked={permissionProcess}
            onChange={() => {
              setPermissionProcess(!permissionProcess);
              setIsChanged(true);
            }}
          />
          <label class="form-check-label">
            Uprawnienia procesów i struktury
          </label>
        </div>
        <div className="d-block">
          <input
            class="form-check-input"
            type="checkbox"
            checked={permissionReport}
            onChange={() => {
              setPermissionReport(!permissionReport);
              setIsChanged(true);
            }}
          />
          <label class="form-check-label">Uprawnienia podsumowań</label>
        </div>
      </div>
      <div className="col-2">
        <div className="row">
          <button
            className="btn btn-primary"
            onClick={() => {
              FetchService.administrationEditAdministrator(callbackUpdate, {
                id: administrator.id,
                login: login,
                permissions: {
                  administator: permissionAdministrator,
                  user: permissionUser,
                  process: permissionProcess,
                  report: permissionReport,
                },
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
        <div className="row">
          <button
            className="btn btn-warning"
            onClick={() => {
              confirmPasswordReset();
            }}
          >
            Resetuj hasło
          </button>
          <div
            class="spinner-border mx-2"
            role="status"
            hidden={!isUpdating}
          ></div>
        </div>
        <div className="row">
          <button
            className="btn btn-danger"
            onClick={() => {
              confirmDeleteAdministrator();
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
export default AdministratorRow;
