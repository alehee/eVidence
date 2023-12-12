import React from "react";
import CardStatus from "../helpers/CardStatus";
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
      status: CardStatus.NotAuthenticated,
      keycard: null,
      accountId: null,
      temporaryId: null,
    };

    this.callbackKeycard = this.callbackKeycard.bind(this);
    this.callbackAuthentication = this.callbackAuthentication.bind(this);
    this.callbackAccountCheck = this.callbackAccountCheck.bind(this);
    this.callbackTemporaryCheck = this.callbackTemporaryCheck.bind(this);
    this.callbackEntranceToggle = this.callbackEntranceToggle.bind(this);
    this.resetView = this.resetView.bind(this);
    this.build = this.build.bind(this);
  }

  callbackKeycard(keycard) {
    this.setState({ isLoading: true, keycard: keycard });
    FetchService.keycardCheck(this.callbackAuthentication, keycard);
  }

  callbackAuthentication(response) {
    if (!response.success) {
      toast("Wystąpił problem z rozpoznaniem karty. Spróbuj ponownie później.");
      this.resetView();
      return;
    }

    if (response.result.type === 2) {
      FetchService.entranceCheckTemporary(
        this.callbackTemporaryCheck,
        response.result.instance.id
      );
      this.setState({ temporaryId: response.result.instance.id });
      return;
    } else if (response.result.type === 1) {
      FetchService.entranceCheckAccount(
        this.callbackAccountCheck,
        response.result.instance.id
      );
      this.setState({ accountId: response.result.instance.id });
      return;
    }
    this.setState({ isLoading: false, status: CardStatus.NewAccount });
  }

  callbackAccountCheck(response) {
    if (!response.success) {
      toast("Wystąpił problem z rozpoznaniem karty. Spróbuj ponownie później.");
      this.resetView();
      return;
    }

    if (response.result === null || response.result.exit !== null) {
      FetchService.entranceToggleAccount(
        this.callbackEntranceToggle,
        this.state.accountId,
        true
      );
    }
    FetchService.entranceToggleAccount(
      this.callbackEntranceToggle,
      this.state.accountId,
      false
    );
  }

  callbackTemporaryCheck(response) {
    if (!response.success) {
      toast("Wystąpił problem z rozpoznaniem karty. Spróbuj ponownie później.");
      this.resetView();
      return;
    }

    if (response.result !== null && response.result.exit === null) {
      FetchService.entranceExitTemporary(
        this.callbackEntranceToggle,
        response.result.temporaryCard.id
      );
      return;
    }
    this.setState({ isLoading: false, status: CardStatus.NewTemp });
  }

  callbackEntranceToggle(response, isExit) {
    if (!response.success) {
      toast("Wystąpił problem z rozpoznaniem karty. Spróbuj ponownie później.");
      this.resetView();
      return;
    }

    toast("Poprawnie zarejestrowano " + (isExit ? "wyjście" : "wejście"));
    this.resetView();
  }

  resetView() {
    this.setState({
      isLoading: false,
      status: CardStatus.NotAuthenticated,
      keycard: null,
      accountId: null,
      temporaryId: null,
    });
  }

  build() {
    if (this.state.isLoading) return <LoadingComponent />;

    if (this.state.status === CardStatus.NewAccount)
      return (
        <Register
          keycard={this.state.keycard}
          isTemporary={false}
          resetView={this.resetView}
        />
      );

    if (this.state.status === CardStatus.NewTemp)
      return (
        <Register
          temporaryId={this.state.temporaryId}
          isTemporary={true}
          resetView={this.resetView}
        />
      );

    return (
      <div>
        <div className="text-center h3 text-first p-5">Wejście/wyjście</div>
        <CardReader callbackKeycard={this.callbackKeycard} />
      </div>
    );
  }

  render() {
    return this.build();
  }
}
