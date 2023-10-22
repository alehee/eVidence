import React from "react";
import LoadingComponent from "../components/Essentials/LoadingComponent";
import CardReader from "../components/CardReader";
import FetchService from "../services/FetchService";
import toast from "react-hot-toast";

export default class Entrance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };

    this.callbackKeycard = this.callbackKeycard.bind(this);
    this.callbackAuthentication = this.callbackAuthentication.bind(this);
    this.build = this.build.bind(this);
  }

  callbackKeycard(keycard) {
    console.log(keycard);
    this.setState({ isLoading: true });
    FetchService.keycardCheck(this.callbackAuthentication, keycard);
  }

  callbackAuthentication(response) {
    console.log(response);
    this.setState({ isLoading: false });
    // TODO
    toast("Otrzymano odpowiedź");
  }

  build() {
    if (this.state.isLoading) return <LoadingComponent />;

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
