import React from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import { CSVLink } from "react-csv";
import CsvParserService from "../../../services/CsvParserService";
import ReportDateRangeBar from "./ReportDateRangeBar";

export default class ReportProcesses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: null,
    };

    this.callbackProcesses = this.callbackProcesses.bind(this);
    this.callbackRefresh = this.callbackRefresh.bind(this);
    this.sortTimestamps = this.sortTimestamps.bind(this);
    this.buildData = this.buildData.bind(this);
  }

  callbackProcesses(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania wpisów procesów.");
      return;
    }

    let processes = [];
    // TODO

    processes.sort(this.sortTimestamps);
    console.log(processes);
    this.setState({
      processes: entrances,
    });
  }

  callbackRefresh(startDate, stopDate) {
    FetchService.reportGetProcesses(
      this.callbackProcesses,
      startDate,
      stopDate
    );
  }

  sortTimestamps(a, b) {
    const timestampA = new Date(a.enter);
    const timestampB = new Date(b.enter);
    return timestampA - timestampB;
  }

  buildData() {
    if (this.state.processes === null) return;

    let processes = this.state.processes.map((process) => {
      return; // TODO
    });

    return (
      <div>
        <div className="d-flex flex-row-reverse my-2">TODO Export</div>
        <div>TODO Table</div>
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
