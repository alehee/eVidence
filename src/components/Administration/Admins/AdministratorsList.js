import React from "react";
import LoadingComponent from "../../Essentials/LoadingComponent";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import AdministratorRow from "./AdministratorRow";

export default class AdministratorsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      administrators: null,
      newAdministratorLogin: "",
    };

    this.callbackAdministrators = this.callbackAdministrators.bind(this);
    this.callbackNewAdministrator = this.callbackNewAdministrator.bind(this);
    this.handleAdministratorCreator =
      this.handleAdministratorCreator.bind(this);
    this.refreshAdministrators = this.refreshAdministrators.bind(this);
    this.buildAdministratorCreator = this.buildAdministratorCreator.bind(this);
    this.buildAdministratorsManagement =
      this.buildAdministratorsManagement.bind(this);
  }

  componentDidMount() {
    this.refreshAdministrators();
  }

  callbackAdministrators(response) {
    this.setState({ isLoading: false });
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania administratorów.");
      return;
    }

    this.setState({ administrators: response.result });
  }

  callbackNewAdministrator(response) {
    this.setState({ isLoading: false });
    if (!response.success) {
      toast.error("Wystąpił problem podczas tworzenia nowego administratora.");
      return;
    }
    toast.success("Pomyślnie utworzono nowego administratora!");
    this.refreshAdministrators();
  }

  handleAdministratorCreator() {
    if (this.state.newAdministratorLogin.length == 0) {
      toast("Uzupełnij login dla nowego administratora");
      return;
    }

    let login = this.state.newAdministratorLogin;
    FetchService.administrationCreateAdministrator(
      this.callbackNewAdministrator,
      { login: login, password: login }
    );
    this.setState({ newAdministratorLogin: "" });
  }

  refreshAdministrators() {
    FetchService.administrationGetAdministrators(this.callbackAdministrators);
  }

  buildAdministratorCreator() {
    return (
      <div>
        <div
          class="btn btn-success"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#admin-administrator-creator"
        >
          Dodaj administatora
        </div>
        <div class="collapse" id="admin-administrator-creator">
          <div className="d-block">
            <input
              type="text"
              class="form-control "
              placeholder="Login nowego administratora"
              value={this.state.newAdministratorLogin}
              onChange={(event) => {
                this.setState({ newAdministratorLogin: event.target.value });
              }}
            />
            <div>Hasło nowego administratora będzie takie samo jak login</div>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.handleAdministratorCreator();
              }}
            >
              Utwórz
            </button>
          </div>
        </div>
      </div>
    );
  }

  buildAdministratorsManagement() {
    if (this.state.administrators === null) return;

    let administratorsList = this.state.administrators.map((administator) => (
      <AdministratorRow
        administrator={administator}
        callbackRefresh={this.refreshAdministrators}
      />
    ));

    return (
      <div>
        <div>{this.buildAdministratorCreator()}</div>
        <div>{administratorsList}</div>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    return (
      <div className="mx-auto">
        <div className="my-2">Konta administratorów</div>
        {this.buildAdministratorsManagement()}
      </div>
    );
  }
}
