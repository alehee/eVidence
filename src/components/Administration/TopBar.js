import React from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../../services/AuthenticationService";
import toast from "react-hot-toast";

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    AuthenticationService.removeActiveUser();
    toast.success("Pomyślnie wylogowano administratora.");
    window.location.reload();
  }

  render() {
    let username = AuthenticationService.getActiveUser();
    return (
      <div className="header">
        <Link
          to="/administration"
          className="float-start cursor-pointer header-element px-2"
        >
          Panel administratora
        </Link>

        <div
          className="float-end cursor-pointer header-element px-2"
          style={{ color: "gray" }}
          onClick={this.logout}
        >
          Wyloguj
        </div>
        <div className="float-end">{"Zalogowano jako " + username}</div>
      </div>
    );
  }
}
