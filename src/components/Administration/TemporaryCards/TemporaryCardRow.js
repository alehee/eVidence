import React, { useState } from "react";
import toast from "react-hot-toast";
import FetchService from "../../../services/FetchService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const TemporaryCardRow = ({ temporaryCard, isUsed, callbackRefresh }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  function callbackUpdate(response) {
    setIsUpdating(false);

    if (response.success) {
      toast.success("Aktualizacja wykonana pomyślnie!");
    } else {
      toast.error("Wystąpił problem podczas aktualizacji");
    }
  }

  function callbackDelete(response) {
    setIsUpdating(false);

    if (!response.success) {
      toast.error("Wystąpił problem podczas usuwania karty");
      return;
    }
    toast.success("Karta tymczasowa usunięta pomyślnie!");
    callbackRefresh();
  }

  function confirmResetCard() {
    confirmAlert({
      message:
        "Czy jesteś pewien, że chcesz zresetować kartę numer " +
        temporaryCard.id +
        " o numerach `" +
        temporaryCard.keycard +
        "`?",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            setIsUpdating(true);
            FetchService.temporaryCardReset(callbackUpdate, temporaryCard.id);
          },
        },
        {
          label: "Nie",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }

  function confirmDeleteCard() {
    confirmAlert({
      message:
        "Czy jesteś pewien, że chcesz usunąć kartę " +
        temporaryCard.id +
        " o numerach `" +
        temporaryCard.keycard +
        "` i wszystkie jej dane?",
      buttons: [
        {
          label: "Tak",
          onClick: () => {
            setIsUpdating(true);
            FetchService.temporaryCardDelete(callbackDelete, temporaryCard.id);
          },
        },
        {
          label: "Nie",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }

  function cardIsUsedAlert() {
    if (!isUsed) return;
    return <div>Karta jest używana</div>;
  }

  function cardKeycardAlert() {
    if (temporaryCard.keycard !== null)
      return <div>Numery karty: `{temporaryCard.keycard}`</div>;
    return <div>Karta została zresetowana</div>;
  }

  return (
    <div className="row my-3">
      <div className="col-4">
        <div>Nr. {temporaryCard.id}</div>
        {cardIsUsedAlert()}
      </div>
      <div className="col">{cardKeycardAlert()}</div>
      <div className="col-3">
        <div className="row">
          <button
            className="btn btn-warning"
            onClick={() => {
              confirmResetCard();
            }}
            disabled={isUsed || temporaryCard.keycard === null}
          >
            Resetuj numery karty
          </button>
          <div
            class="spinner-border mx-2"
            role="status"
            hidden={!isUpdating}
          ></div>
        </div>
        <div className="row">
          <button
            className="btn btn-danger"
            onClick={() => {
              confirmDeleteCard();
            }}
            disabled={isUsed}
          >
            Usuń
          </button>
          <div
            class="spinner-border mx-2"
            role="status"
            hidden={!isUpdating}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default TemporaryCardRow;
