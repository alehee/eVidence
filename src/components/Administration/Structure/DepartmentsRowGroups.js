import React from "react";
import toast from "react-hot-toast";
import FetchService from "../../../services/FetchService";

export default class DepartmentsRowGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: null };

    this.callbackUpdate = this.callbackUpdate.bind(this);
    this.prepareGroupsState = this.prepareGroupsState.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.buildCheckboxes = this.buildCheckboxes.bind(this);
  }

  componentDidMount() {
    this.setState({ groups: this.prepareGroupsState() });
  }

  callbackUpdate(response) {
    if (response.success) {
      toast.success("Aktualizacja grupy dla działu wykonana pomyślnie!");
    } else {
      toast.error("Wystąpił problem podczas aktualizacji grupy dla działu.");
      this.props.callbackRefresh();
    }
  }

  prepareGroupsState() {
    let departmentGroupsIds = [];
    this.props.department.groups.forEach((group) => {
      departmentGroupsIds.push(group.id);
    });

    let groups = {};
    this.props.groups.forEach((group) => {
      let active = false;
      if (departmentGroupsIds.includes(group.id)) active = true;
      groups[group.id] = { name: group.name, isActive: active };
    });

    return groups;
  }

  handleCheckbox(id, setActive) {
    let newGroups = this.state.groups;
    newGroups[id].isActive = setActive;

    if (setActive)
      FetchService.structureGroupDepartmentAdd(
        this.callbackUpdate,
        id,
        this.props.department.id
      );
    else
      FetchService.structureGroupDepartmentDelete(
        this.callbackUpdate,
        id,
        this.props.department.id
      );

    this.setState({ groups: newGroups });
  }

  buildCheckboxes() {
    let checkboxes = [];

    for (const [key, value] of Object.entries(this.state.groups)) {
      checkboxes.push(
        <div className="d-block">
          <input
            class="form-check-input mx-1"
            type="checkbox"
            checked={value.isActive}
            onChange={() => {
              this.handleCheckbox(key, !value.isActive);
            }}
          />
          <label class="form-check-label">{value.name}</label>
        </div>
      );
    }

    return checkboxes;
  }

  render() {
    if (this.state.groups === null) return;

    return <div className="d-block m-1">{this.buildCheckboxes()}</div>;
  }
}
