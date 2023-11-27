import React from "react";
import toast from "react-hot-toast";
import FetchService from "../../../services/FetchService";
import LoadingComponent from "../../Essentials/LoadingComponent";
import DepartmentsRow from "./DepartmentsRow";

export default class DepartmentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { departments: null, groups: null };

    this.callbackDepartments = this.callbackDepartments.bind(this);
    this.callbackGroups = this.callbackGroups.bind(this);
    this.refreshData = this.refreshData.bind(this);
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

  refreshData() {
    FetchService.structureDepartmentGetAll(this.callbackDepartments);
    FetchService.structureGroupGetAll(this.callbackGroups);
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
        <div>{departments}</div>
      </div>
    );
  }
}
