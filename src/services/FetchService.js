import { Env } from "../Env";

export default class FetchService {
  //#region Common

  static keycardCheck(callback, keycard) {
    const params = new URLSearchParams();
    params.set("keycard", keycard);

    fetch(Env.API_HOST + "/account/check?" + params.toString(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((array) => callback(array));
  }

  static getDepartments(callback) {
    fetch(Env.API_HOST + "/structure/department", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((array) => callback(array));
  }

  //#endregion

  //#region Entrance

  static registerAccount(callback, keycard, name, surname, departmentId) {
    const params = new URLSearchParams();
    params.set("keycard", keycard);
    params.set("name", name);
    params.set("surname", surname);
    params.set("departmentId", departmentId);

    fetch(Env.API_HOST + "/account/register?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static entranceCheckAccount(callback, id) {
    const params = new URLSearchParams();
    params.set("id", id);

    fetch(Env.API_HOST + "/entrance/check?" + params.toString(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static entranceToggleAccount(callback, id, isEntering) {
    const params = new URLSearchParams();
    params.set("id", id);
    params.set("isEntering", isEntering);

    fetch(Env.API_HOST + "/entrance/toggle?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result, !isEntering));
  }

  static entranceCheckTemporary(callback, id) {
    const params = new URLSearchParams();
    params.set("id", id);

    fetch(Env.API_HOST + "/entrance/temporary/check?" + params.toString(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static entranceEnterTemporary(callback, id, name, surname) {
    const params = new URLSearchParams();
    params.set("id", id);
    params.set("name", name);
    params.set("surname", surname);

    fetch(Env.API_HOST + "/entrance/temporary/enter?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static entranceExitTemporary(callback, id) {
    const params = new URLSearchParams();
    params.set("id", id);

    fetch(Env.API_HOST + "/entrance/temporary/exit?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result, true));
  }

  //#endregion
}
