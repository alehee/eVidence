import React from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import { CSVLink } from "react-csv";
import CsvParserService from "../../../services/CsvParserService";
import ReportDateRangeBar from "./ReportDateRangeBar";
import ReportProcessesRow from "./ReportProcessesRow";

export default class ReportProcesses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: null,
    };

    this.callbackProcesses = this.callbackProcesses.bind(this);
    this.callbackRefresh = this.callbackRefresh.bind(this);
    this.sortByStart = this.sortByStart.bind(this);
    this.buildData = this.buildData.bind(this);
  }

  callbackProcesses(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania wpisów procesów.");
      return;
    }

    let processes = response.result;
    processes.sort(this.sortByStart);

    this.setState({
      processes: processes,
    });
  }

  callbackRefresh(start, stop) {
    FetchService.reportGetProcesses(this.callbackProcesses, start, stop);
  }

  sortByStart(a, b) {
    const timestampA = new Date(a.start);
    const timestampB = new Date(b.start);
    return timestampA - timestampB;
  }

  buildData() {
    if (this.state.processes === null) return;

    let processes = this.state.processes.map((process) => {
      return <ReportProcessesRow processRow={process} />;
    });

    return (
      <div>
        <div className="d-flex flex-row-reverse my-2">
          <CSVLink
            className="btn btn-primary"
            filename={
              "raportProcesow_" +
              new Date().toISOString().split(".")[0] +
              ".csv"
            }
            data={CsvParserService.parseProcesses(this.state.processes)}
          >
            Eksportuj do CSV
          </CSVLink>
        </div>
        <div>
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">Dział</th>
                <th scope="col">Imię</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">Proces</th>
                <th scope="col">Start</th>
                <th scope="col">Zakończenie</th>
              </tr>
            </thead>
            <tbody>{processes}</tbody>
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
