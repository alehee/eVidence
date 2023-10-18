import { Env } from "../Env";

export default class FetchService {
  static keycardCheck(callback, keycard) {
    // TODO
    fetch(Env.API_HOST + "/x/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((array) => callback(array));
  }
}
