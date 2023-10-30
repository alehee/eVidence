import React from "react";
import FetchService from "../../services/FetchService";
import LoadingComponent from "../Essentials/LoadingComponent";
import ScreenKeyboard from "./ScreenKeyboard";

export default class RegisterAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      departments: null,
      message: null,
      inputs: {
        name: "",
        surname: "",
        departmentId: null,
      },
      inputId: null,
    };

    this.callbackDepartments = this.callbackDepartments.bind(this);
    this.callbackInput = this.callbackInput.bind(this);
    this.buttonValidateAndRegister = this.buttonValidateAndRegister.bind(this);
    this.buttonCancel = this.buttonCancel.bind(this);
  }

  componentDidMount() {
    FetchService.getDepartments(this.callbackDepartments);
  }

  callbackDepartments(response) {
    console.log(response);
    // TODO
    this.setState({ isLoading: false });
  }

  callbackInput(inputs) {
    this.setState({ inputs: inputs });
  }

  buttonValidateAndRegister() {
    // TODO
  }

  buttonCancel() {
    // TODO
  }

  buildDepartmentSelect() {
    // TODO
    if (this.state.departments === null) return;

    return <div>SELECT</div>;
  }

  buildForm() {
    return (
      <div>
        <div className="h4 text-center my-3">Rejestracja konta</div>
        <input
          type="text"
          className="form-control w-75 my-2 mx-auto"
          placeholder="Imię"
          value={this.state.inputs.name}
          onFocus={() => this.setState({ inputId: "name" })}
        />
        <input
          type="text"
          className="form-control w-75 my-2 mx-auto"
          placeholder="Nazwisko"
          value={this.state.inputs.surname}
          onFocus={() => this.setState({ inputId: "surname" })}
        />
        {this.buildDepartmentSelect()}
        <ScreenKeyboard
          callbackInput={this.callbackInput}
          inputs={this.state.inputs}
          inputId={this.state.inputId}
        />
        <button
          className="btn btn-primary mt-3 px-3"
          onClick={() => this.buttonValidateAndRegister}
        >
          Zatwierdź
        </button>
        <button
          className="btn btn-danger mt-3 px-3"
          onClick={() => this.buttonCancel}
        >
          Anuluj
        </button>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.message !== null) return <div>{this.state.message}</div>;

    return this.buildForm();
  }
}
