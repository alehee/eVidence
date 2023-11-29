import React from "react";
import toast from "react-hot-toast";
import FetchService from "../../../services/FetchService";
import LoadingComponent from "../../Essentials/LoadingComponent";
import DepartmentsRow from "./DepartmentsRow";
import GroupRow from "./GroupRow";

export default class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: null, newGroup: "" };

    this.callbackGroups = this.callbackGroups.bind(this);
    this.callbackNewGroup = this.callbackNewGroup.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.handleGroupCreator = this.handleGroupCreator.bind(this);
    this.buildGroupCreator = this.buildGroupCreator.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  callbackGroups(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania grup.");
      return;
    }

    this.setState({ groups: response.result });
  }

  callbackNewGroup(response) {
    console.log(response);
    if (!response.success) {
      toast.error("Wystąpił problem podczas dodawania nowej grupy.");
      return;
    }
    toast.success("Poprawnie utworzono nową grupę!");
    window.location.reload();
  }

  refreshData() {
    FetchService.structureGroupGetAll(this.callbackGroups);
  }

  handleGroupCreator() {
    if (this.state.newGroup.length == 0) {
      toast("Uzupełnij nazwę nowego działu");
      return;
    }

    let group = this.state.newGroup;
    FetchService.structureGroupAdd(this.callbackNewGroup, group);

    this.setState({ newGroup: "" });
  }

  buildGroupCreator() {
    return (
      <div>
        <div
          class="btn btn-success"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#structure-group-creator"
        >
          Dodaj nową grupę
        </div>
        <div class="collapse" id="structure-group-creator">
          <div className="d-block">
            <input
              type="text"
              class="form-control"
              placeholder="Nazwa nowej grupy"
              value={this.state.newGroup}
              onChange={(event) => {
                this.setState({ newGroup: event.target.value });
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                this.handleGroupCreator();
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
    if (this.state.groups === null) return <LoadingComponent />;

    let groups = this.state.groups.map((group) => {
      return <GroupRow group={group} callbackRefresh={this.refreshData} />;
    });

    return (
      <div>
        <div className="text-center">Zarządzanie grupami</div>
        <div className="text-center my-2">{this.buildGroupCreator()}</div>
        <div>{groups}</div>
      </div>
    );
  }
}
