import React, { useState } from "react";
import toast from "react-hot-toast";

const AdministratorRow = ({ administrator }) => {
  console.log(administrator);
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
      toast.success("Aktualizacja wykonana pomyślnie");
    } else {
      toast.error("Wystąpił problem podczas aktualizacji");
    }
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
        <div className="row d-block">
          <input
            class="form-check-input"
            type="checkbox"
            checked={permissionAdministrator}
          />
          <label class="form-check-label">Uprawnienia administatora</label>
        </div>
        <div className="row d-block">
          <input
            class="form-check-input"
            type="checkbox"
            checked={permissionUser}
          />
          <label class="form-check-label">Uprawnienia użytkowników</label>
        </div>
        <div className="row d-block">
          <input
            class="form-check-input"
            type="checkbox"
            checked={permissionProcess}
          />
          <label class="form-check-label">
            Uprawnienia procesów i struktury
          </label>
        </div>
        <div className="row d-block">
          <input
            class="form-check-input"
            type="checkbox"
            checked={permissionReport}
          />
          <label class="form-check-label">Uprawnienia podsumowań</label>
        </div>
      </div>
      <div className="col-2">
        <div className="row">
          <button
            className="btn btn-primary"
            onClick={() => {
              // TODO
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
            className="btn btn-danger"
            onClick={() => {
              // TODO
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
