import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Essentials/LoadingComponent";
import TopBar from "../../components/Administration/TopBar";
import FetchService from "../../services/FetchService";
import toast from "react-hot-toast";

export default class Processes extends React.Component {
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
      if (!AuthenticationService.hasPermissionTo("process")) user = null;
    }

    this.setState({ isLoading: false, user: user });
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.user === null) return <Navigate to={"/administration"} />;

    return (
      <div>
        <TopBar />
        <div className="text-center my-4 h4 fst-italic">
          Zarządzanie procesami
        </div>
        <div></div>
      </div>
    );
  }
}
