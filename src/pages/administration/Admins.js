import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Essentials/LoadingComponent";
import TopBar from "../../components/Administration/TopBar";
import PasswordChangeOwn from "../../components/Administration/Admins/PasswordChangeOwn";
import AdministratorsList from "../../components/Administration/Admins/AdministratorsList";

export default class Admins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
    };

    this.buildAdministratorsList = this.buildAdministratorsList.bind(this);
  }

  componentDidMount() {
    let user = AuthenticationService.getActiveUser();
    this.setState({ isLoading: false, user: user });
  }

  buildAdministratorsList() {
    if (!AuthenticationService.hasPermissionTo("administrator")) return;
    return (
      <div className="w-75 mx-auto row text-center border border-dark rounded m-2">
        <AdministratorsList />
      </div>
    );
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.user === null) return <Navigate to={"/administration"} />;

    return (
      <div>
        <TopBar />
        <div className="text-center my-4 h4 fst-italic text-first">
          Zarządzanie administatorami
        </div>
        <div>
          <div className="w-75 mx-auto row text-center border border-dark rounded m-2">
            <PasswordChangeOwn />
          </div>
        </div>
        {this.buildAdministratorsList()}
      </div>
    );
  }
}
