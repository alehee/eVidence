import React from "react";
import LoadingComponent from "../components/Essentials/LoadingComponent";
import CardReader from "../components/CardReader";
import Switch from "../components/Checkpoint/Switch";
import FetchService from "../services/FetchService";
import toast from "react-hot-toast";

export default class Checkpoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      departmentId: null,
      departmentName: null,
      departments: null,
      operator: null,
    };

    this.callbackDepartments = this.callbackDepartments.bind(this);
    this.callbackKeycard = this.callbackKeycard.bind(this);
    this.callbackAuthentication = this.callbackAuthentication.bind(this);
    this.callbackTemporaryCheck = this.callbackTemporaryCheck.bind(this);
    this.resetView = this.resetView.bind(this);
    this.handleDepartmentSelectChange =
      this.handleDepartmentSelectChange.bind(this);
    this.buildDepartmentSelect = this.buildDepartmentSelect.bind(this);
    this.build = this.build.bind(this);
  }

  componentDidMount() {
    FetchService.getDepartments(this.callbackDepartments);
  }

  callbackDepartments(response) {
    const params = new URLSearchParams(window.location.search);
    let id = null;
    if (params.has("id")) {
      id = parseInt(params.get("id"));
    }

    let departments = [];
    response.result.forEach((element) => {
      departments.push(element);
      if (!isNaN(id) && element.id === id)
        this.setState({ departmentId: id, departmentName: element.name });
    });

    this.setState({ isLoading: false, departments: departments });
  }

  callbackKeycard(keycard) {
    this.setState({ isLoading: true });
    FetchService.keycardCheck(this.callbackAuthentication, keycard);
  }

  callbackAuthentication(response) {
    if (!response.success) {
      toast.error(
        "Wystąpił problem z rozpoznaniem karty. Spróbuj ponownie później."
      );
      this.resetView();
      return;
    }

    if (response.result.type === 2) {
      FetchService.entranceCheckTemporary(
        this.callbackTemporaryCheck,
        response.result.instance.id
      );
      return;
    } else if (response.result.type === 1) {
      this.setState({
        isLoading: false,
        operator: { isTemp: false, id: response.result.instance.id },
      });
      return;
    }

    toast.error("Karta nie jest zarejestrowana!");
    this.resetView();
  }

  callbackTemporaryCheck(response) {
    if (!response.success) {
      toast.error(
        "Wystąpił problem z rozpoznaniem karty. Spróbuj ponownie później."
      );
      this.resetView();
      return;
    }

    if (response.result !== null && response.result.exit === null) {
      this.setState({
        isLoading: false,
        operator: { isTemp: true, id: response.result.id },
      });
      return;
    }

    toast.error("Karta tymczasowa nie jest zarejestrowana!");
    this.resetView();
  }

  resetView() {
    this.setState({
      isLoading: false,
      operator: null,
    });
  }

  handleDepartmentSelectChange(e) {
    let index = e.nativeEvent.target.selectedIndex;
    let text = e.nativeEvent.target[index].text;

    this.setState({
      departmentId: e.target.value,
      departmentName: text,
    });
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
      <div>
        <div>Bramka procesów dla działu</div>
        <select
          className="form-control w-75 my-2 mx-auto"
          onChange={this.handleDepartmentSelectChange}
          value={this.state.departmentId}
        >
          {options}
        </select>
      </div>
    );
  }

  build() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.departmentId === null) return this.buildDepartmentSelect();

    if (this.state.departmentId !== null && this.state.operator !== null)
      return (
        <Switch
          resetView={this.resetView}
          operator={this.state.operator}
          departmentId={this.state.departmentId}
          departmentName={this.state.departmentName}
        />
      );

    return (
      <div>
        {this.buildDepartmentSelect()}
        <CardReader callbackKeycard={this.callbackKeycard} />
      </div>
    );
  }

  render() {
    return this.build();
  }
}
