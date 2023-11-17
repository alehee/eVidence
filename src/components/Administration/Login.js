import React from "react";
import LoadingComponent from "../Essentials/LoadingComponent";
import toast from "react-hot-toast";
import FetchService from "../../services/FetchService";
import AuthenticationService from "../../services/AuthenticationService";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, formLogin: "", formPassword: "" };

    this.callbackAuthenticate = this.callbackAuthenticate.bind(this);
    this.authenticate = this.authenticate.bind(this);
  }

  callbackAuthenticate(response) {
    if (!response.success) {
      toast.error(
        "Wystąpił problem podczas logowania. Sprawdź wprowadzone dane logowania."
      );
      return;
    }
    AuthenticationService.setActiveUser(response.result);
    toast.success("Pomyślnie zalogowano administratora.");
    this.props.callback();
  }

  authenticate() {
    if (
      this.state.formLogin.length === 0 ||
      this.state.formPassword.length === 0
    ) {
      toast("Wypełnij wszystkie pola logowania");
      return;
    }

    FetchService.administrationLogin(
      this.callbackAuthenticate,
      this.state.formLogin,
      this.state.formPassword
    );
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    return (
      <div className="w-50 mx-auto">
        <div class="mb-3">
          <label class="form-label">Nazwa użytkownika</label>
          <input
            type="text"
            class="form-control"
            value={this.state.formLogin}
            onChange={(event) =>
              this.setState({ formLogin: event.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Hasło</label>
          <input
            type="password"
            class="form-control"
            value={this.state.formPassword}
            onChange={(event) =>
              this.setState({ formPassword: event.target.value })
            }
          />
        </div>
        <button class="btn btn-primary" onClick={this.authenticate}>
          Zaloguj
        </button>
      </div>
    );
  }
}
