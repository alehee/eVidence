import React from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import LoadingComponent from "../../Essentials/LoadingComponent";
import ProcessesRow from "./ProcessesRow";

export default class ProcessesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: null,
      processes: null,
      newProcessName: "",
      newProcessShortName: "",
      newProcessColor: "#ff0000",
    };

    this.callbackProcesses = this.callbackProcesses.bind(this);
    this.callbackDepartments = this.callbackDepartments.bind(this);
    this.callbackNewProcess = this.callbackNewProcess.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.handleProcessCreator = this.handleProcessCreator.bind(this);
    this.buildProcessCreator = this.buildProcessCreator.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  callbackDepartments(response) {
    if (!response.success) {
      toast.error(
        "Wystąpił problem podczas przetwarzania działów grupy " +
          this.props.group.name +
          "."
      );
      return;
    }

    this.setState({ departments: response.result });
  }

  callbackProcesses(response) {
    if (!response.success) {
      toast.error(
        "Wystąpił problem podczas przetwarzania procesów grupy " +
          this.props.group.name +
          "."
      );
      return;
    }

    this.setState({ processes: response.result });
  }

  callbackNewProcess(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas dodawania nowego procesu.");
      return;
    }
    toast.success("Poprawnie utworzono nowy proces!");
    this.refreshData();
  }

  refreshData() {
    FetchService.structureDepartmentGetByGroup(
      this.callbackDepartments,
      this.props.group.id
    );
    FetchService.processGetByGroup(this.callbackProcesses, this.props.group.id);
  }

  handleProcessCreator() {
    if (this.state.newProcessName.length == 0) {
      toast("Uzupełnij nazwę nowego procesu.");
      return;
    }

    if (
      this.state.newProcessShortName.length < 1 ||
      this.state.newProcessShortName.length > 11
    ) {
      toast("Skrócona nazwa procesu powinna mieć od 1 do 10 znaków.");
      return;
    }

    let processName = this.state.newProcessName;
    let processShortName = this.state.newProcessShortName;
    let processColor = this.state.newProcessColor;
    FetchService.processAdd(this.callbackNewProcess, {
      groupId: this.props.group.id,
      name: processName,
      shortName: processShortName,
      color: processColor,
    });

    this.setState({
      newProcessName: "",
      newProcessShortName: "",
      newProcessColor: "#ff0000",
    });
  }

  buildProcessCreator() {
    return (
      <div className="w-50 mx-auto">
        <div
          class="btn btn-success"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#processes-process-creator-" + this.props.group.id}
        >
          Dodaj nowy proces
        </div>
        <div
          class="collapse"
          id={"processes-process-creator-" + this.props.group.id}
        >
          <div className="d-block">
            <input
              type="text"
              class="form-control my-1"
              placeholder="Nazwa nowego procesu"
              value={this.state.newProcessName}
              onChange={(event) => {
                this.setState({ newProcessName: event.target.value });
              }}
            />
            <input
              type="text"
              class="form-control my-1"
              placeholder="Skrócona nazwa nowego procesu"
              value={this.state.newProcessShortName}
              onChange={(event) => {
                this.setState({ newProcessShortName: event.target.value });
              }}
            />
            <input
              type="color"
              class="form-control my-1 w-50 mx-auto"
              value={this.state.newProcessColor}
              onChange={(event) => {
                this.setState({ newProcessColor: event.target.value });
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                this.handleProcessCreator();
              }}
            >
              Utwórz
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.processes === null || this.state.departments === null)
      return <LoadingComponent />;

    let departmentNames = this.state.departments.map((department) => {
      return <span className="fst-italic mx-1">{department.name}</span>;
    });

    let processViews = this.state.processes.map((process) => {
      return (
        <ProcessesRow process={process} callbackRefresh={this.refreshData} />
      );
    });

    return (
      <div className="my-3 p-2 border border-dark rounded">
        <div className="text-center h5 fst-italic">
          <span className="h6 mx-2">ID {this.props.group.id}</span>
          Grupa {this.props.group.name}{" "}
        </div>
        <div className="text-center small">
          Przypisane działy: {departmentNames}
        </div>
        <div className="text-center my-2">{this.buildProcessCreator()}</div>
        <div>{processViews}</div>
      </div>
    );
  }
}
