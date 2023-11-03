import React from "react";
import EntranceStatus from "../helpers/EntranceStatus";
import LoadingComponent from "../components/Essentials/LoadingComponent";
import CardReader from "../components/CardReader";
import FetchService from "../services/FetchService";
import toast from "react-hot-toast";
import Register from "../components/Entrance/Register";

export default class Entrance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      status: EntranceStatus.NotAuthenticated,
      keycard: null,
      temporaryId: null,
    };

    this.callbackKeycard = this.callbackKeycard.bind(this);
    this.callbackAuthentication = this.callbackAuthentication.bind(this);
    this.resetView = this.resetView.bind(this);
    this.build = this.build.bind(this);
  }

  callbackKeycard(keycard) {
    this.setState({ isLoading: true, keycard: keycard });
    FetchService.keycardCheck(this.callbackAuthentication, keycard);
  }

  callbackAuthentication(response) {
    console.log(response);
    if (!response.success) {
      toast("Wystąpił problem z rozpoznaniem karty. Spróbuj ponownie później.");
      this.resetView();
      return;
    }

    if (response.result.type === 2) {
      this.setState({
        isLoading: false,
        status: EntranceStatus.NewTemp,
        temporaryId: response.result.instance.id,
      });
      return;
    } else if (response.result.type === 1) {
      this.setState({ isLoading: false, status: EntranceStatus.AccountToggle });
      return;
    }
    this.setState({ isLoading: false, status: EntranceStatus.NewAccount });
  }

  resetView() {
    this.setState({
      isLoading: false,
      status: EntranceStatus.NotAuthenticated,
      keycard: null,
      temporaryId: null,
    });
  }

  build() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.status === EntranceStatus.NewAccount)
      return (
        <Register
          keycard={this.state.keycard}
          isTemporary={false}
          resetView={this.resetView}
        />
      );

    if (this.state.status === EntranceStatus.NewTemp)
      return (
        <Register
          temporaryId={this.state.temporaryId}
          isTemporary={true}
          resetView={this.resetView}
        />
      );

    return (
      <div>
        <div>Bramka wejścia</div>
        <CardReader callbackKeycard={this.callbackKeycard} />
      </div>
    );
  }

  render() {
    return this.build();
  }
}
