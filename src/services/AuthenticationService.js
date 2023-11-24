export default class AuthenticationService {
  static setActiveUser(user) {
    sessionStorage.setItem("username", user.login);
    sessionStorage.setItem(
      "permissions",
      JSON.stringify({
        administrator: user.permissionAdministrator,
        process: user.permissionProcess,
        report: user.permissionReport,
        users: user.permissionUser,
      })
    );
  }

  static getActiveUser() {
    return sessionStorage.getItem("username");
  }

  static removeActiveUser() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("permissions");
  }

  static getAllPermissions() {
    return JSON.parse(sessionStorage.getItem("permissions"));
  }

  static hasPermissionTo(moduleName) {
    if (!["administrator", "process", "report", "user"].includes(moduleName))
      return false;

    let permissions = this.getAllPermissions();
    return permissions[moduleName];
  }
}
