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

  //#endregion

  //#region Departments and groups

  static getDepartments(callback) {
    fetch(Env.API_HOST + "/structure/department", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((array) => callback(array));
  }

  static getGroupsForDepartment(callback, departmentId) {
    fetch(Env.API_HOST + "/structure/department/" + departmentId + "/groups", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((array) => callback(array));
  }

  //#region

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

  //#region Checkpoint

  static checkpointAccountCheck(callback, accountId) {
    const params = new URLSearchParams();
    params.set("id", accountId);

    fetch(Env.API_HOST + "/checkpoint/check?" + params.toString(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static checkpointAccountProcessStart(
    callback,
    departmentId,
    accountId,
    processId
  ) {
    const params = new URLSearchParams();
    params.set("accountId", accountId);
    params.set("departmentId", departmentId);

    fetch(
      Env.API_HOST + "/checkpoint/start/" + processId + "?" + params.toString(),
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static checkpointAccountProcessStop(callback, accountId) {
    const params = new URLSearchParams();
    params.set("accountId", accountId);

    fetch(Env.API_HOST + "/checkpoint/stop?" + params.toString(), {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static checkpointTemporaryCheck(callback, temporaryEntranceHistoryId) {
    const params = new URLSearchParams();
    params.set("id", temporaryEntranceHistoryId);

    fetch(Env.API_HOST + "/checkpoint/temporary/check?" + params.toString(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static checkpointTemporaryProcessStart(
    callback,
    departmentId,
    temporaryEntranceHistoryId,
    processId
  ) {
    const params = new URLSearchParams();
    params.set("temporaryEntranceHistoryId", temporaryEntranceHistoryId);
    params.set("departmentId", departmentId);

    fetch(
      Env.API_HOST +
        "/checkpoint/temporary/start/" +
        processId +
        "?" +
        params.toString(),
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static checkpointTemporaryProcessStop(callback, temporaryEntranceHistoryId) {
    const params = new URLSearchParams();
    params.set("temporaryEntranceHistoryId", temporaryEntranceHistoryId);

    fetch(Env.API_HOST + "/checkpoint/temporary/stop?" + params.toString(), {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static getProcessesForGroup(callback, groupId) {
    fetch(Env.API_HOST + "/process/group/" + groupId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((array) => callback(array));
  }

  //#endregion

  //#region Administration

  static administrationLogin(callback, login, password) {
    const params = new URLSearchParams();
    params.set("login", login);
    params.set("password", password);

    fetch(Env.API_HOST + "/administrator/authenticate?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static administrationPasswordChangeOwn(
    callback,
    login,
    oldPassword,
    newPassword
  ) {
    const params = new URLSearchParams();
    params.set("login", login);
    params.set("oldPassword", oldPassword);
    params.set("newPassword", newPassword);

    fetch(Env.API_HOST + "/administrator/changepassword?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static administrationPasswordReset(callback, id) {
    fetch(Env.API_HOST + "/administrator/" + id + "/resetpassword", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static administrationCreateAdministrator(callback, administator) {
    const params = new URLSearchParams();
    params.set("login", administator.login);
    params.set("password", administator.password);

    if (administator.permissions !== undefined) {
      params.set(
        "permissionAdministrator",
        administator.permissions.administator
      );
      params.set("permissionUser", administator.permissions.user);
      params.set("permissionProcess", administator.permissions.process);
      params.set("permissionReport", administator.permissions.report);
    }

    fetch(Env.API_HOST + "/administrator?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static administrationGetAdministrators(callback) {
    fetch(Env.API_HOST + "/administrator/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static administrationEditAdministrator(callback, administator) {
    const params = new URLSearchParams();
    params.set("login", administator.login);
    params.set(
      "permissionAdministrator",
      administator.permissions.administator
    );
    params.set("permissionUser", administator.permissions.user);
    params.set("permissionProcess", administator.permissions.process);
    params.set("permissionReport", administator.permissions.report);

    fetch(
      Env.API_HOST +
        "/administrator/" +
        administator.id +
        "?" +
        params.toString(),
      {
        method: "PUT",
      }
    )
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static administrationDeleteAdministrator(callback, id) {
    fetch(Env.API_HOST + "/administrator/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  //#endregion

  //#region Account

  static accountGetAll(callback) {
    fetch(Env.API_HOST + "/account", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static accountGet(callback, id) {
    fetch(Env.API_HOST + "/account/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static accountEdit(callback, account) {
    const params = new URLSearchParams();
    params.set("departmentId", account.departmentId);
    params.set("name", account.name);
    params.set("surname", account.surname);
    fetch(Env.API_HOST + "/account/" + account.id + "?" + params.toString(), {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static accountResetKeycard(callback, id) {
    fetch(Env.API_HOST + "/account/" + id + "/resetkeycard", {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static accountDelete(callback, id) {
    fetch(Env.API_HOST + "/account/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  //#endregion

  //#region Temporary Card management

  static temporaryCardGetAll(callback) {
    fetch(Env.API_HOST + "/account/temporary", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static temporaryCardGetUsed(callback) {
    fetch(Env.API_HOST + "/account/temporary/used", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static temporaryCardCreate(callback, keycard) {
    const params = new URLSearchParams();
    params.set("keycard", keycard);
    fetch(Env.API_HOST + "/account/temporary?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static temporaryCardReset(callback, id) {
    fetch(Env.API_HOST + "/account/temporary/" + id + "/resetkeycard", {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static temporaryCardDelete(callback, id) {
    fetch(Env.API_HOST + "/account/temporary/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  //#endregion

  //#region Processes

  static processAdd(callback, process) {
    const params = new URLSearchParams();
    params.set("groupId", process.groupId);
    params.set("name", process.name);
    params.set("shortName", process.shortName);
    params.set("colorCode", process.color);
    fetch(Env.API_HOST + "/process?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static processGetAll(callback) {
    fetch(Env.API_HOST + "/process", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static processGet(callback, id) {
    fetch(Env.API_HOST + "/process/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static processGetByGroup(callback, groupId) {
    fetch(Env.API_HOST + "/process/group/" + groupId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static processEdit(callback, process) {
    const params = new URLSearchParams();
    params.set("groupId", process.groupId);
    params.set("name", process.name);
    params.set("shortName", process.shortName);
    params.set("colorCode", process.color);
    fetch(Env.API_HOST + "/process/" + process.id + "?" + params.toString(), {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static processDelete(callback, id) {
    fetch(Env.API_HOST + "/process/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  //#endregion

  //#region Report

  static reportGetOnBoard(callback) {
    fetch(Env.API_HOST + "/report/onboard", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static reportGetEntrance(callback, startDate, stopDate) {
    const params = new URLSearchParams();
    params.set("start", startDate);
    params.set("stop", stopDate);
    fetch(Env.API_HOST + "/report/entrance?" + params.toString(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static reportGetProcess(callback, startDate, stopDate) {
    const params = new URLSearchParams();
    params.set("start", startDate);
    params.set("stop", stopDate);
    fetch(Env.API_HOST + "/report/process?" + params.toString(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  //#endregion

  //#region Structure

  static structureGroupGetAll(callback) {
    fetch(Env.API_HOST + "/structure/group", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static structureGroupAdd(callback, name) {
    const params = new URLSearchParams();
    params.set("name", name);
    fetch(Env.API_HOST + "/structure/group?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static structureGroupEdit(callback, group) {
    const params = new URLSearchParams();
    params.set("name", group.name);
    fetch(
      Env.API_HOST + "/structure/group/" + group.id + "?" + params.toString(),
      {
        method: "PUT",
      }
    )
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static structureGroupDelete(callback, id) {
    fetch(Env.API_HOST + "/structure/group/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static structureDepartmentGetAll(callback) {
    fetch(Env.API_HOST + "/structure/department", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static structureDepartmentAdd(callback, name) {
    const params = new URLSearchParams();
    params.set("name", name);
    fetch(Env.API_HOST + "/structure/department?" + params.toString(), {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static structureDepartmentEdit(callback, department) {
    const params = new URLSearchParams();
    params.set("name", department.name);
    fetch(
      Env.API_HOST +
        "/structure/department/" +
        department.id +
        "?" +
        params.toString(),
      {
        method: "PUT",
      }
    )
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static structureDepartmentDelete(callback, id) {
    fetch(Env.API_HOST + "/structure/department/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static structureGroupDepartmentAdd(callback, groupId, departmentId) {
    fetch(Env.API_HOST + "/structure/group/" + groupId + "/" + departmentId, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  static structureGroupDepartmentDelete(callback, groupId, departmentId) {
    fetch(Env.API_HOST + "/structure/group/" + groupId + "/" + departmentId, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => callback(result));
  }

  //#endregion
}
