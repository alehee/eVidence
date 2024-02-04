import React from "react";
import FetchService from "../../services/FetchService";
import toast from "react-hot-toast";
import LoadingComponent from "../Essentials/LoadingComponent";
import Process from "./Process";

export default class ProcessesGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: null,
    };

    this.callbackProcesses = this.callbackProcesses.bind(this);
  }

  componentDidMount() {
    FetchService.getProcessesForGroup(
      this.callbackProcesses,
      this.props.group.id
    );
  }

  callbackProcesses(response) {
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania procesów działu.");
      this.props.resetView();
      return;
    }

    let processes = [];
    response.result.forEach((element) => {
      processes.push(
        <Process process={element} callback={this.props.callback} />
      );
    });
    this.setState({ isLoading: false, processes: processes });
  }

  render() {
    if (this.state.isLoading) return <LoadingComponent />;

    return (
      <div className="my-3">
        <div className="text-center my-2">
          Grupa{" "}
          <span className="h5">{this.props.group.name.toUpperCase()}</span>
        </div>
        <div className="text-center w-75 mx-auto">{this.state.processes}</div>
      </div>
    );
  }
}
