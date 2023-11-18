import React from "react";
import LoadingComponent from "../../Essentials/LoadingComponent";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import AdministratorRow from "./AdministratorRow";

export default class AdministratorsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, administrators: null };

    this.callbackAdministrators = this.callbackAdministrators.bind(this);
    this.buildAdministratorsList = this.buildAdministratorsList.bind(this);
  }

  componentDidMount() {
    FetchService.administrationGetAdministrators(this.callbackAdministrators);
  }

  callbackAdministrators(response) {
    this.setState({ isLoading: false });
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania administratorów.");
      return;
    }

    this.setState({ administators: response.message });
  }

  buildAdministratorsList() {
    if (this.state.administrators === null) return;

    return this.state.administrators.map((administator) => (
      <AdministratorRow administrator={administator} />
    ));
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    return (
      <div className="w-50 mx-auto">
        <div className="my-2">Konta administratorów</div>
        {this.buildAdministratorsList()}
      </div>
    );
  }
}
