import React from "react";
import toast from "react-hot-toast";
import AuthenticationService from "../../../services/AuthenticationService";
import FetchService from "../../../services/FetchService";

export default class PasswordChangeOwn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, formOldPassword: "", formNewPassword: "" };

    this.callbackEdit = this.callbackEdit.bind(this);
    this.validateAndReqsuest = this.validateAndReqsuest.bind(this);
  }

  callbackEdit(response) {
    this.setState({ isLoading: false });

    console.log(response);

    if (!response.success) {
      toast.error(
        "Wystąpił problem podczas zmiany hasła. Spróbuj ponownie później."
      );
      return;
    }

    toast.success("Pomyślnie zmieniono hasło administratora.");
  }

  validateAndReqsuest() {
    if (
      this.state.formOldPassword.length === 0 ||
      this.state.formNewPassword.length === 0
    ) {
      toast("Wypełnij pole hasła.");
      return;
    }

    if (
      !(
        this.state.formNewPassword.length > 7 &&
        this.state.formNewPassword.length < 21
      )
    ) {
      toast("Nowe hasło musi spełniać wymagania.");
      return;
    }

    FetchService.administrationPasswordChangeOwn(
      this.callbackEdit,
      AuthenticationService.getActiveUser(),
      this.state.formOldPassword,
      this.state.formNewPassword
    );

    this.setState({ isLoading: true });
  }

  render() {
    return (
      <div className="w-50 mx-auto">
        <div className="my-2">Zmiana swojego hasła administratora</div>
        <div class="mb-3">
          <label class="form-label">Stare hasło</label>
          <input
            type="password"
            class="form-control"
            value={this.state.formOldPassword}
            onChange={(event) =>
              this.setState({ formOldPassword: event.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Nowe hasło (pomiędzy 8-20 znaków)</label>
          <input
            type="password"
            class="form-control"
            value={this.state.formNewPassword}
            onChange={(event) =>
              this.setState({ formNewPassword: event.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <button
            class="btn btn-warning"
            type="button"
            onClick={this.validateAndReqsuest}
            disabled={this.state.isLoading}
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              hidden={!this.state.isLoading}
            ></span>
            Zmień hasło
          </button>
        </div>
      </div>
    );
  }
}
