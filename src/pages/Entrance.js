import React from "react";
import CardReader from "../components/CardReader";

export default class Entrance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.callbackKeycard = this.callbackKeycard.bind(this);
  }

  callbackKeycard(keycard) {
    console.log(keycard);
  }

  render() {
    return (
      <div>
        <div>Bramka wejścia</div>
        <CardReader callbackKeycard={this.callbackKeycard} />
      </div>
    );
  }
}
