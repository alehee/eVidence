import { Env } from "../Env";

export default class FetchService {
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
}
