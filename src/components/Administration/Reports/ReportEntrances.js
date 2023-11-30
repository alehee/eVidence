import React from "react";
import FetchService from "../../../services/FetchService";
import toast from "react-hot-toast";
import LoadingComponent from "../../Essentials/LoadingComponent";
import { CSVLink } from "react-csv";
import CsvParserService from "../../../services/CsvParserService";

export default class ReportEntrances extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      stopDate: null,
      entrances: null,
    };

    this.callbackEntrances = this.callbackEntrances.bind(this);
  }

  componentDidMount() {
    FetchService.reportGetEntrances(
      this.callbackEntrances,
      "2023-11-01",
      "2023-12-02"
    );
  }

  callbackEntrances(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania wpisów wejścia.");
      return;
    }

    console.log(response);
    let entrances = response.result.accountEntrances.concat(
      response.result.temporaryEntrances
    );
    console.log(entrances);

    this.setState({
      entrances: entrances,
    });
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-row-reverse my-2">
          <div>TODO export</div>
        </div>
      </div>
    );
  }
}
