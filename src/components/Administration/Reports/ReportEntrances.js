import React from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import LoadingComponent from "../../Essentials/LoadingComponent";
import { CSVLink } from "react-csv";
import CsvParserService from "../../../services/CsvParserService";
import ReportEntrancesRow from "./ReportEntrancesRow";
import ReportDateRangeBar from "./ReportDateRangeBar";

export default class ReportEntrances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entrances: null,
    };

    this.callbackEntrances = this.callbackEntrances.bind(this);
    this.callbackRefresh = this.callbackRefresh.bind(this);
    this.sortTimestamps = this.sortTimestamps.bind(this);
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

    this.setState({
      entrances: entrances,
    });
  }

  callbackRefresh(start, stop) {
    FetchService.reportGetEntrances(this.callbackEntrances, start, stop);
  }

  sortTimestamps(a, b) {
    const timestampA = new Date(a.enter);
    const timestampB = new Date(b.enter);
    return timestampA - timestampB;
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
        <ReportDateRangeBar callback={this.callbackRefresh} />
        {this.buildData()}
      </div>
    );
  }
}
