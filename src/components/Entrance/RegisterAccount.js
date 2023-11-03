import React from "react";
import FetchService from "../../services/FetchService";
import LoadingComponent from "../Essentials/LoadingComponent";
import ScreenKeyboard from "./ScreenKeyboard";
import toast from "react-hot-toast";

export default class RegisterAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      departments: null,
      inputs: {
        name: "",
        surname: "",
      },
      inputId: null,
      selectedDepartment: null,
    };

    this.callbackDepartments = this.callbackDepartments.bind(this);
    this.callbackInput = this.callbackInput.bind(this);
    this.callbackRegister = this.callbackRegister.bind(this);
    this.buttonValidateAndRegister = this.buttonValidateAndRegister.bind(this);
  }

  componentDidMount() {
    FetchService.getDepartments(this.callbackDepartments);
  }

  callbackDepartments(response) {
    let arr = [];
    response.result.forEach((element) => {
      arr.push(element);
    });
    this.setState({ isLoading: false, departments: arr });
  }

  callbackInput(inputs) {
    this.setState({ inputs: inputs });
  }

  callbackRegister(response) {
    if (response.success) {
      toast("Zarejestrowano pomyślnie! Odbij się ponownie aby wejść.");
      this.props.resetView();
    } else {
      toast("Wystąpił problem z rejestracją spróbuj ponownie później.");
    }
  }

  buttonValidateAndRegister() {
    if (
      this.state.inputs.name === "" ||
      this.state.inputs.surname === "" ||
      this.state.selectedDepartment === null
    ) {
      toast("Wypełnij wszystkie pola rejestracji!");
      return;
    }

    FetchService.registerAccount(
      this.callbackRegister,
      this.props.keycard,
      this.state.inputs.name,
      this.state.inputs.surname,
      this.state.selectedDepartment
    );
    this.setState({ isLoading: true });
  }

  buildDepartmentSelect() {
    if (this.state.departments === null) return;

    let options = [
      <option selected hidden>
        Wybierz dział...
      </option>,
    ];
    this.state.departments.forEach((element) => {
      options.push(<option value={element.id}>{element.name}</option>);
    });

    return (
      <select
        className="form-control w-75 my-2 mx-auto"
        onChange={(e) => this.setState({ selectedDepartment: e.target.value })}
      >
        {options}
      </select>
    );
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
          onClick={() => this.buttonValidateAndRegister()}
        >
          Zatwierdź
        </button>
        <button
          className="btn btn-danger mt-3 px-3"
          onClick={() => this.props.resetView()}
        >
          Anuluj
        </button>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    return this.buildForm();
  }
}
