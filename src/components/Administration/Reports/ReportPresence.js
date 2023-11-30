import React from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import LoadingComponent from "../../Essentials/LoadingComponent";
import { CSVLink } from "react-csv";
import CsvParserService from "../../../services/CsvParserService";

export default class ReportPresence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountEntrances: null,
      temporaryEntrances: null,
    };

    this.callbackPresence = this.callbackPresence.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.sortSurname = this.sortSurname.bind(this);
    this.sortDepartment = this.sortDepartment.bind(this);
    this.sortTemporary = this.sortTemporary.bind(this);
    this.buildAccountTable = this.buildAccountTable.bind(this);
    this.buildTemporaryTable = this.buildTemporaryTable.bind(this);
  }

  componentDidMount() {
    FetchService.reportGetOnBoard(this.callbackPresence);
  }

  callbackPresence(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania wpisów wejścia.");
      return;
    }

    this.setState({
      accountEntrances: response.result.accountEntrances,
      temporaryEntrances: response.result.temporaryEntrances,
    });
  }

  formatDate(str) {
    let arr = str.split("T");
    return arr[1].split(".")[0] + " : " + arr[0];
  }

  sortSurname(a, b) {
    const nameA = a.account.surname.toUpperCase();
    const nameB = b.account.surname.toUpperCase();
    return nameA.localeCompare(nameB);
  }

  sortDepartment(a, b) {
    const depAName = a.account.department.name;
    const depBName = b.account.department.name;
    return depAName.localeCompare(depBName);
  }

  sortTemporary(a, b) {
    const nameA = a.surname.toUpperCase();
    const nameB = b.surname.toUpperCase();
    return nameA.localeCompare(nameB);
  }

  buildAccountTable() {
    let users = this.state.accountEntrances;

    users.sort(this.sortDepartment);
    users.sort(this.sortSurname);

    let rows = users.map((entrance) => {
      return (
        <tr>
          <td>{entrance.account.name}</td>
          <td>{entrance.account.surname}</td>
          <td>{entrance.account.department.name}</td>
          <td>{this.formatDate(entrance.enter)}</td>
        </tr>
      );
    });

    return (
      <div>
        <table class="table text-center">
          <thead>
            <tr>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">Dział</th>
              <th scope="col">Godzina wejścia</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }

  buildTemporaryTable() {
    let temporary = this.state.temporaryEntrances;

    temporary.sort(this.sortTemporary);

    let rows = temporary.map((entrance) => {
      return (
        <tr>
          <td>{entrance.temporaryCard.id}</td>
          <td>{entrance.name}</td>
          <td>{entrance.surname}</td>
          <td>{this.formatDate(entrance.enter)}</td>
        </tr>
      );
    });

    return (
      <div>
        <table class="table text-center">
          <thead>
            <tr>
              <th scope="col">Numer karty</th>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">Godzina wejścia</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }

  render() {
    if (
      this.state.accountEntrances === null ||
      this.state.temporaryEntrances === null
    )
      return <LoadingComponent />;

    return (
      <div>
        <div className="d-flex flex-row-reverse my-2">
          <CSVLink
            className="btn btn-primary"
            filename={
              "obecnosc_" + new Date().toISOString().split(".")[0] + ".csv"
            }
            data={CsvParserService.parsePresence(
              this.state.accountEntrances,
              this.state.temporaryEntrances
            )}
          >
            Eksportuj do CSV
          </CSVLink>
        </div>
        <div className="mb-5">
          <div className="my-2 text-center h5">Obecność użytkowników</div>
          {this.buildAccountTable()}
        </div>
        <div className="mb-5">
          <div className="my-2 text-center h5">Obecność kart tymczasowych</div>
          {this.buildTemporaryTable()}
        </div>
      </div>
    );
  }
}
