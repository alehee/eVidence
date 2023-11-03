import React from "react";
import EntranceStatus from "../helpers/EntranceStatus";
import LoadingComponent from "../components/Essentials/LoadingComponent";
import CardReader from "../components/CardReader";
import FetchService from "../services/FetchService";
import toast from "react-hot-toast";
import RegisterAccount from "../components/Entrance/RegisterAccount";

export default class Entrance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      status: EntranceStatus.NotAuthenticated,
      keycard: null,
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
      this.setState({ isLoading: false, status: EntranceStatus.NewTemp });
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
    });
  }

  build() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.status === EntranceStatus.NewAccount)
      return <RegisterAccount resetView={this.resetView} />;

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
