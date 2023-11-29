import React from "react";
import toast from "react-hot-toast";
import FetchService from "../../../services/FetchService";
import LoadingComponent from "../../Essentials/LoadingComponent";
import DepartmentsRow from "./DepartmentsRow";

export default class DepartmentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { departments: null, groups: null, newDepartment: "" };

    this.callbackDepartments = this.callbackDepartments.bind(this);
    this.callbackGroups = this.callbackGroups.bind(this);
    this.callbackNewDepartment = this.callbackNewDepartment.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.handleDepartmentCreator = this.handleDepartmentCreator.bind(this);
    this.buildDepartmentCreator = this.buildDepartmentCreator.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  callbackDepartments(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania działów.");
      return;
    }

    this.setState({ departments: response.result });
  }

  callbackGroups(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania grup działów.");
      return;
    }

    this.setState({ groups: response.result });
  }

  callbackNewDepartment(response) {
    console.log(response);
    if (!response.success) {
      toast.error("Wystąpił problem podczas dodawania nowego działu.");
      return;
    }
    toast.success("Poprawnie utworzono nowy dział!");
    this.refreshData();
  }

  refreshData() {
    FetchService.structureDepartmentGetAll(this.callbackDepartments);
    FetchService.structureGroupGetAll(this.callbackGroups);
  }

  handleDepartmentCreator() {
    if (this.state.newDepartment.length == 0) {
      toast("Uzupełnij nazwę nowego działu");
      return;
    }

    let department = this.state.newDepartment;
    FetchService.structureDepartmentAdd(this.callbackNewDepartment, department);

    this.setState({ newDepartment: "" });
  }

  buildDepartmentCreator() {
    return (
      <div>
        <div
          class="btn btn-success"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#structure-department-creator"
        >
          Dodaj nowy dział
        </div>
        <div class="collapse" id="structure-department-creator">
          <div className="d-block">
            <input
              type="text"
              class="form-control"
              placeholder="Nazwa nowego działu"
              value={this.state.newDepartment}
              onChange={(event) => {
                this.setState({ newDepartment: event.target.value });
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                this.handleDepartmentCreator();
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
    if (this.state.departments === null || this.state.groups === null)
      return <LoadingComponent />;

    let departments = this.state.departments.map((department) => {
      return (
        <DepartmentsRow
          department={department}
          groups={this.state.groups}
          callbackRefresh={this.refreshData}
        />
      );
    });

    return (
      <div>
        <div className="text-center">Zarządzanie działami</div>
        <div className="text-center my-2">{this.buildDepartmentCreator()}</div>
        <div>{departments}</div>
      </div>
    );
  }
}
