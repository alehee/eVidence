import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Essentials/LoadingComponent";
import TopBar from "../../components/Administration/TopBar";
import DepartmentsList from "../../components/Administration/Structure/DepartmentsList";
import GroupsList from "../../components/Administration/Structure/GroupsList";

export default class Structure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
    };
  }

  componentDidMount() {
    let user = AuthenticationService.getActiveUser();
    if (user !== null) {
      if (!AuthenticationService.hasPermissionTo("administrator")) user = null;
    }

    this.setState({ isLoading: false, user: user });
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.user === null) return <Navigate to={"/administration"} />;

    return (
      <div>
        <TopBar />
        <div className="text-center my-4 h4 fst-italic text-first">
          Zarządzanie działami i grupami
        </div>
        <div>
          <div className="w-75 mx-auto border border-dark rounded m-2">
            <DepartmentsList />
          </div>
          <div className="w-75 mx-auto border border-dark rounded m-2">
            <GroupsList />
          </div>
        </div>
      </div>
    );
  }
}
