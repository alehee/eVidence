import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Essentials/LoadingComponent";
import TopBar from "../../components/Administration/TopBar";
import ReportPresence from "../../components/Administration/Reports/ReportPresence";
import ReportEntrances from "../../components/Administration/Reports/ReportEntrances";
import ReportProcesses from "../../components/Administration/Reports/ReportProcesses";

export default class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
      selectedView: "PRESENCE",
    };

    this.buildViewSelect = this.buildViewSelect.bind(this);
    this.buildView = this.buildView.bind(this);
  }

  componentDidMount() {
    let user = AuthenticationService.getActiveUser();
    if (user !== null) {
      if (!AuthenticationService.hasPermissionTo("report")) user = null;
    }

    this.setState({ isLoading: false, user: user });
  }

  buildViewSelect() {
    let options = [];

    options.push(
      <option className="text-dark" value="PRESENCE" selected>
        Obecność
      </option>
    );
    options.push(
      <option className="text-dark" value="ENTRANCE" selected>
        Rejestr wejść
      </option>
    );
    options.push(
      <option className="text-dark" value="PROCESS" selected>
        Rejestr procesów
      </option>
    );

    return (
      <select
        className="form-select text-dark"
        value={this.state.selectedView}
        onChange={(event) => {
          this.setState({ selectedView: event.target.value });
        }}
      >
        {options}
      </select>
    );
  }

  buildView() {
    switch (this.state.selectedView) {
      case "PRESENCE":
        return <ReportPresence />;

      case "ENTRANCE":
        return <ReportEntrances />;

      case "PROCESS":
        return <ReportProcesses />;

      default:
        return <div className="h5 text-center">Nie ma takiego raportu!</div>;
    }
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.user === null) return <Navigate to={"/administration"} />;

    return (
      <div>
        <TopBar />
        <div className="text-center my-4 h4 fst-italic text-first">Raporty</div>
        <div className="w-50 mx-auto">{this.buildViewSelect()}</div>
        <div className="w-75 mx-auto">{this.buildView()}</div>
      </div>
    );
  }
}
