import React from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import LoadingComponent from "../../Essentials/LoadingComponent";
import { CSVLink } from "react-csv";
import CsvParserService from "../../../services/CsvParserService";
import ReportEntrancesRow from "./ReportEntrancesRow";

export default class ReportEntrances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      stopDate: null,
      entrances: null,
    };

    this.callbackEntrances = this.callbackEntrances.bind(this);
    this.sortTimestamps = this.sortTimestamps.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.handleRefreshButton = this.handleRefreshButton.bind(this);
    this.buildRefreshBar = this.buildRefreshBar.bind(this);
    this.buildData = this.buildData.bind(this);
  }

  callbackEntrances(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania wpisów wejścia.");
      return;
    }

    let entrances = response.result.accountEntrances.concat(
      response.result.temporaryEntrances
    );

    entrances.sort(this.sortTimestamps);
    console.log(entrances);
    this.setState({
      entrances: entrances,
    });
  }

  sortTimestamps(a, b) {
    const timestampA = new Date(a.enter);
    const timestampB = new Date(b.enter);
    return timestampA - timestampB;
  }

  refreshData() {
    FetchService.reportGetEntrances(
      this.callbackEntrances,
      this.state.startDate,
      this.state.stopDate
    );
  }

  handleRefreshButton() {
    if (this.state.startDate === null || this.state.stopDate === null) {
      toast("Wypełnij obie daty generowania!");
      return;
    }

    if (new Date(this.state.stopDate) < new Date(this.state.startDate)) {
      toast("Data końca generowania nie może być wcześniej niż początku!");
      return;
    }

    this.refreshData();
  }

  buildRefreshBar() {
    return (
      <div>
        Od{" "}
        <input
          type="date"
          class="form-control"
          value={this.state.startDate}
          onChange={(event) => {
            this.setState({ startDate: event.target.value });
          }}
        />
        do{" "}
        <input
          type="date"
          class="form-control"
          value={this.state.stopDate}
          onChange={(event) => {
            this.setState({ stopDate: event.target.value });
          }}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            this.handleRefreshButton();
          }}
        >
          Odśwież
        </button>
      </div>
    );
  }

  buildData() {
    if (this.state.entrances === null) return;

    let entrances = this.state.entrances.map((entrance) => {
      return <ReportEntrancesRow entrance={entrance} />;
    });

    return (
      <div>
        <div className="d-flex flex-row-reverse my-2">
          <CSVLink
            className="btn btn-primary"
            filename={
              "raportWejsc_" + new Date().toISOString().split(".")[0] + ".csv"
            }
            data={CsvParserService.parseEntrances(this.state.entrances)}
          >
            Eksportuj do CSV
          </CSVLink>
        </div>
        <div>
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">Dział/Numer karty</th>
                <th scope="col">Imię</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Godzina wejścia</th>
                <th scope="col">Godzina wyjścia</th>
              </tr>
            </thead>
            <tbody>{entrances}</tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.buildRefreshBar()}
        {this.buildData()}
      </div>
    );
  }
}
