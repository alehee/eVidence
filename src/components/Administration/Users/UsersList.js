import React from "react";
import UsersRow from "./UsersRow";

export default class UsersList extends React.Component {
  constructor(props) {
    super(props);

    this.sortSurname = this.sortSurname.bind(this);
    this.sortDepartment = this.sortDepartment.bind(this);
  }

  sortSurname(a, b) {
    const nameA = a.surname.toUpperCase();
    const nameB = b.surname.toUpperCase();
    return nameA.localeCompare(nameB);
  }

  sortDepartment(a, b) {
    const depAName = this.props.departments[a.department.id];
    const depBName = this.props.departments[b.department.id];
    return depAName.localeCompare(depBName);
  }

  render() {
    let sorted = this.props.users;
    sorted.sort(this.sortSurname);

    if (this.props.sortBy === "department") {
      sorted.sort(this.sortDepartment);
    }

    return (
      <div>
        {sorted.map((user) => (
          <UsersRow
            user={user}
            departments={this.props.departments}
            callbackRefresh={this.props.callbackRefresh}
          />
        ))}
      </div>
    );
  }
}
