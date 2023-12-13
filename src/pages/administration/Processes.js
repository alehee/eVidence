import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Essentials/LoadingComponent";
import TopBar from "../../components/Administration/TopBar";
import FetchService from "../../services/FetchService";
import toast from "react-hot-toast";
import ProcessesList from "../../components/Administration/Processes/ProcessesList";

export default class Processes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
      groups: null,
    };

    this.callbackGroups = this.callbackGroups.bind(this);
    this.sortName = this.sortName.bind(this);
  }

  componentDidMount() {
    let user = AuthenticationService.getActiveUser();
    if (user !== null) {
      if (!AuthenticationService.hasPermissionTo("process")) user = null;
    }

    FetchService.structureGroupGetAll(this.callbackGroups);
    this.setState({ isLoading: false, user: user });
  }

  callbackGroups(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania grup.");
      return;
    }

    let groups = response.result;
    groups.sort(this.sortName);
    this.setState({ groups: groups });
  }

  sortName(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.user === null) return <Navigate to={"/administration"} />;

    if (this.state.groups === null) return <LoadingComponent />;

    let groupViews = this.state.groups.map((group) => {
      return <ProcessesList group={group} />;
    });

    return (
      <div>
        <TopBar />
        <div className="text-center my-4 h4 fst-italic text-first">
          Zarządzanie procesami
        </div>
        <div className="w-75 mx-auto">{groupViews}</div>
      </div>
    );
  }
}
