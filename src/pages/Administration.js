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
      <Link to={"/administration/admins"} className="d-block my-2">
        Zarządzanie administatorami
      </Link>
    );

    if (AuthenticationService.hasPermissionTo("administrator")) {
      links.push(
        <Link to={"/administration/temporarycards"} className="d-block my-2">
          Zarządzanie kartami tymczasowymi
        </Link>
      );
    }

    if (AuthenticationService.hasPermissionTo("users")) {
      links.push(
        <Link to={"/administration/users"} className="d-block my-2">
          Zarządzanie użytkownikami
        </Link>
      );
    }

    if (AuthenticationService.hasPermissionTo("administrator")) {
      links.push(
        <Link to={"/administration/structure"} className="d-block my-2">
          Zarządzanie działami i grupami
        </Link>
      );
    }

    if (AuthenticationService.hasPermissionTo("process")) {
      links.push(
        <Link to={"/administration/processes"} className="d-block my-2">
          Zarządzanie procesami
        </Link>
      );
    }

    if (AuthenticationService.hasPermissionTo("report")) {
      links.push(
        <Link to={"/administration/reports"} className="d-block my-2">
          Raporty
        </Link>
      );
    }

    return <div className="text-center">{links}</div>;
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.user === null)
      return <Login callback={this.retryAuthenticate} />;

    return (
      <div>
        <TopBar />
        <div className="text-center my-4 h4 fst-italic text-first">
          Witaj w panelu administracyjnym
        </div>
        <div>{this.buildLinksByPermissions()}</div>
      </div>
    );
  }
}
