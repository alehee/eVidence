import React from "react";
import AuthenticationService from "../../services/AuthenticationService";
import { Navigate } from "react-router-dom";
import LoadingComponent from "../../components/Essentials/LoadingComponent";
import TopBar from "../../components/Administration/TopBar";
import FetchService from "../../services/FetchService";
import toast from "react-hot-toast";
import TemporaryCardRow from "../../components/Administration/TemporaryCards/TemporaryCardRow";

export default class TemporaryCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: null,
      temporaryCards: null,
      temporaryCardsUsed: null,
      newTemporaryCardKeycard: "",
    };

    this.callbackTemporaryCards = this.callbackTemporaryCards.bind(this);
    this.callbackTemporaryCardsUsed =
      this.callbackTemporaryCardsUsed.bind(this);
    this.callbackNewTemporaryCard = this.callbackNewTemporaryCard.bind(this);
    this.handleTemporaryCardCreator =
      this.handleTemporaryCardCreator.bind(this);
    this.refreshCards = this.refreshCards.bind(this);
    this.validateIfCardIsUsed = this.validateIfCardIsUsed.bind(this);
    this.buildTemporaryCardCreator = this.buildTemporaryCardCreator.bind(this);
    this.buildTemporaryCardsList = this.buildTemporaryCardsList.bind(this);
  }

  componentDidMount() {
    let user = AuthenticationService.getActiveUser();

    if (user !== null) {
      if (!AuthenticationService.hasPermissionTo("administrator")) user = null;
    }

    this.refreshCards();

    this.setState({ isLoading: false, user: user });
  }

  callbackTemporaryCards(response) {
    this.setState({ isLoading: false });
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania kart tymczasowych.");
      return;
    }

    this.setState({ temporaryCards: response.result });
  }

  callbackTemporaryCardsUsed(response) {
    this.setState({ isLoading: false });
    if (!response.success) {
      toast.error("Wystąpił problem podczas przetwarzania kart tymczasowych.");
      return;
    }

    this.setState({ temporaryCardsUsed: response.result });
  }

  callbackNewTemporaryCard(response) {
    this.setState({ isLoading: false });
    if (!response.success) {
      toast.error(
        "Wystąpił problem podczas tworzenia nowej karty tymczasowej."
      );
      return;
    }
    toast.success("Pomyślnie utworzono nową kartę tymczasową!");
    this.refreshCards();
  }

  handleTemporaryCardCreator() {
    if (this.state.newTemporaryCardKeycard.length == 0) {
      toast("Uzupełnij numery nowej karty");
      return;
    }

    let keycard = this.state.newTemporaryCardKeycard;
    FetchService.temporaryCardCreate(this.callbackNewTemporaryCard, keycard);

    this.setState({ newTemporaryCardKeycard: "" });
  }

  refreshCards() {
    this.setState({ temporaryCards: null, temporaryCardsUsed: null });
    FetchService.temporaryCardGetAll(this.callbackTemporaryCards);
    FetchService.temporaryCardGetUsed(this.callbackTemporaryCardsUsed);
  }

  validateIfCardIsUsed(id) {
    let found = false;
    this.state.temporaryCardsUsed.forEach((element) => {
      if (element.id === id) found = true;
    });
    return found;
  }

  buildTemporaryCardCreator() {
    return (
      <div>
        <div
          class="btn btn-success"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#temporaryCards-temporaryCard-creator"
        >
          Dodaj kartę tymczasową
        </div>
        <div class="collapse" id="temporaryCards-temporaryCard-creator">
          <div className="d-block">
            <input
              type="text"
              class="form-control"
              placeholder="Numery nowej karty"
              value={this.state.newTemporaryCardKeycard}
              onChange={(event) => {
                this.setState({ newTemporaryCardKeycard: event.target.value });
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                this.handleTemporaryCardCreator();
              }}
            >
              Utwórz
            </button>
          </div>
        </div>
      </div>
    );
  }

  buildTemporaryCardsList() {
    let temporaryCardsList = this.state.temporaryCards.map((temporaryCard) => (
      <TemporaryCardRow
        temporaryCard={temporaryCard}
        isUsed={this.validateIfCardIsUsed(temporaryCard.id)}
        callbackRefresh={this.refreshCards}
      />
    ));

    return (
      <div className="w-75 mx-auto row text-center border border-dark rounded m-2">
        <div className="my-2">Karty tymczasowe</div>
        {this.buildTemporaryCardCreator()}
        {temporaryCardsList}
      </div>
    );
  }

  render() {
    if (
      this.state.isLoading ||
      this.state.temporaryCards === null ||
      this.state.temporaryCardsUsed === null
    )
      return <LoadingComponent />;

    if (this.state.user === null) return <Navigate to={"/administration"} />;

    return (
      <div>
        <TopBar />
        <div className="text-center my-4 h4 fst-italic">
          Zarządzanie kartami tymczasowymi
        </div>
        <div>{this.buildTemporaryCardsList()}</div>
      </div>
    );
  }
}
