import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import LoadingComponent from "../components/Essentials/LoadingComponent";
import toast from "react-hot-toast";
import Login from "../components/Administration/Login";
import TopBar from "../components/Administration/TopBar";
import { Link } from "react-router-dom";

export default class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
    };

    this.retryAuthenticate = this.retryAuthenticate.bind(this);
    this.buildLinksByPermissions = this.buildLinksByPermissions.bind(this);
  }

  componentDidMount() {
    this.retryAuthenticate();
  }

  retryAuthenticate() {
    let user = AuthenticationService.getActiveUser();
    if (user === null) {
      toast("Zaloguj się na swoje konto administratora");
    }
    this.setState({ isLoading: false, user: user });
  }

  buildLinksByPermissions() {
    let links = [];

    links.push(
      <Link to={"/administration/admins"} className="nav-element d-block">
        Zarządzanie administatorami
      </Link>
    );

    if (AuthenticationService.hasPermissionTo("administrator")) {
      links.push(
        <Link
          to={"/administration/temporarycards"}
          className="nav-element d-block"
        >
          Zarządzanie kartami tymczasowymi
        </Link>
      );
    }

    if (AuthenticationService.hasPermissionTo("users")) {
      links.push(
        <Link to={"/administration/users"} className="nav-element d-block">
          Zarządzanie użytkownikami
        </Link>
      );
    }

    if (AuthenticationService.hasPermissionTo("administrator")) {
      links.push(
        <Link to={"/administration/structure"} className="nav-element d-block">
          Zarządzanie działami i grupami
        </Link>
      );
    }

    if (AuthenticationService.hasPermissionTo("process")) {
      links.push(
        <Link to={"/administration/processes"} className="nav-element d-block">
          Zarządzanie procesami
        </Link>
      );
    }

    if (AuthenticationService.hasPermissionTo("report")) {
      links.push(
        <Link to={"/administration/reports"} className="nav-element d-block">
          Raporty
        </Link>
      );
    }

    return (
      <div className="text-center">
        <div className="h5">MODUŁY PANELU</div>
        {links}
      </div>
    );
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.user === null)
      return <Login callback={this.retryAuthenticate} />;

    return (
      <div>
        <TopBar />
        <div className="text-center my-4 h4 fst-italic">
          Witaj w panelu administracyjnym
        </div>
        <div className="row">
          <div className="col">{this.buildLinksByPermissions()}</div>
          <div className="col-8"></div>
        </div>
      </div>
    );
  }
}
