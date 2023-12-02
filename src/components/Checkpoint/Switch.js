import React from "react";
import FetchService from "../../services/FetchService";
import toast from "react-hot-toast";
import LoadingComponent from "../Essentials/LoadingComponent";
import ProcessesGroup from "./ProcessesGroup";

export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      processesViews: null,
      lastActivity: undefined,
    };

    this.callbackGroups = this.callbackGroups.bind(this);
    this.callbackCheck = this.callbackCheck.bind(this);
    this.callbackActivityChange = this.callbackActivityChange.bind(this);
    this.handleClickProcess = this.handleClickProcess.bind(this);
    this.handleClickEndProcess = this.handleClickEndProcess.bind(this);
    this.build = this.build.bind(this);
  }

  componentDidMount() {
    FetchService.getGroupsForDepartment(
      this.callbackGroups,
      this.props.departmentId
    );

    let operator = this.props.operator;
    if (!operator.isTemp)
      FetchService.checkpointAccountCheck(this.callbackCheck, operator.id);
    else FetchService.checkpointTemporaryCheck(this.callbackCheck, operator.id);
  }

  callbackGroups(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania procesów działu.");
      this.props.resetView();
      return;
    }

    let groups = [];
    response.result.forEach((element) => {
      groups.push(
        <ProcessesGroup group={element} callback={this.handleClickProcess} />
      );
    });
    this.setState({ isLoading: false, processesViews: groups });
  }

  callbackCheck(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania operatora.");
      this.props.resetView();
      return;
    }

    if (response.result === null || response.result.stop !== null) {
      this.setState({ lastActivity: null });
      return;
    }

    this.setState({ lastActivity: response.result.process });
  }

  callbackActivityChange(response) {
    if (!response.success)
      toast.error("Wystąpił problem podczas wykonywania akcji.");
    else toast.success("Poprawnie wykonano akcję!");

    this.props.resetView();
  }

  handleClickProcess(processId) {
    if (!this.props.operator.isTemp) {
      FetchService.checkpointAccountProcessStart(
        this.callbackActivityChange,
        this.props.departmentId,
        this.props.operator.id,
        processId
      );
    } else {
      FetchService.checkpointTemporaryProcessStart(
        this.callbackActivityChange,
        this.props.departmentId,
        this.props.operator.id,
        processId
      );
    }
  }

  handleClickEndProcess() {
    if (!this.props.operator.isTemp) {
      FetchService.checkpointAccountProcessStop(
        this.callbackActivityChange,
        this.props.operator.id
      );
    } else {
      FetchService.checkpointTemporaryProcessStop(
        this.callbackActivityChange,
        this.props.operator.id
      );
    }
  }

  build() {
    if (this.state.isLoading || this.state.lastActivity === undefined)
      return <LoadingComponent />;

    let lastActivityView = null;
    if (this.state.lastActivity !== null) {
      lastActivityView = (
        <div className="text-center">
          Aktualny proces{" "}
          <span className="h5" style={{ color: this.state.lastActivity.color }}>
            {this.state.lastActivity.name}
          </span>
          <div
            className="badge bg-secondary"
            onClick={this.handleClickEndProcess}
          >
            Zakończ
          </div>
        </div>
      );
    }

    return (
      <div>
        {lastActivityView}
        {this.state.processesViews}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="text-center">
          Dział{" "}
          <span className="h5">{this.props.departmentName.toUpperCase()}</span>
        </div>
        {this.build()}
        <button className="btn btn-danger" onClick={this.props.resetView}>
          Anuluj
        </button>
      </div>
    );
  }
}
