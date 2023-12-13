import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Essentials/LoadingComponent";
import TopBar from "../../components/Administration/TopBar";
import FetchService from "../../services/FetchService";
import toast from "react-hot-toast";
import UsersSortSelect from "../../components/Administration/Users/UsersSortSelect";
import UsersList from "../../components/Administration/Users/UsersList";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
      users: null,
      departments: null,
      sortBy: "surname",
    };

    this.callbackUsers = this.callbackUsers.bind(this);
    this.callbackDepartments = this.callbackDepartments.bind(this);
    this.refreshUsers = this.refreshUsers.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    let user = AuthenticationService.getActiveUser();
    if (user !== null) {
      if (!AuthenticationService.hasPermissionTo("users")) user = null;
    }

    if (user !== null) {
      FetchService.getDepartments(this.callbackDepartments);
      this.refreshUsers();
    }

    this.setState({ isLoading: false, user: user });
  }

  callbackUsers(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania użytkowników.");
      return;
    }

    this.setState({ users: response.result });
  }

  callbackDepartments(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania użytkowników.");
      return;
    }

    let departments = {};
    response.result.forEach((element) => {
      departments[element.id] = element.name;
    });
    this.setState({ departments: departments });
  }

  refreshUsers() {
    this.setState({ users: null });
    FetchService.accountGetAll(this.callbackUsers);
  }

  handleSortChange(sortType) {
    this.setState({ sortBy: sortType });
    this.refreshUsers();
  }

  render() {
    if (
      this.state.isLoading ||
      this.state.users === null ||
      this.state.departments === null
    )
      return <LoadingComponent />;

    if (this.state.user === null) return <Navigate to={"/administration"} />;

    return (
      <div>
        <TopBar />
        <div className="text-center my-4 h4 fst-italic text-first">
          Zarządzanie użytkownikami
        </div>
        <div>
          <div className="w-50 mx-auto">
            <div>Sortuj według</div>{" "}
            <UsersSortSelect
              callback={this.handleSortChange}
              selected={this.state.sortBy}
            />
          </div>
          <UsersList
            users={this.state.users}
            departments={this.state.departments}
            sortBy={this.state.sortBy}
            callbackRefresh={this.refreshUsers}
          />
        </div>
      </div>
    );
  }
}
