import React from "react";

export default class CardReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keycardBuffer: "",
      isInputing: false,
    };

    this.sendKeycard = this.sendKeycard.bind(this);
    this.detectKeyDown = this.detectKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.detectKeyDown, true);
  }

  detectKeyDown(e) {
    if (e.key == "Enter") {
      if (this.state.keycardBuffer.length > 0) this.sendKeycard();
    } else {
      this.setState({ keycardBuffer: (this.state.keycardBuffer += e.key) });
      if (!this.state.isInputing) {
        this.setState({ isInputing: true });
        setTimeout(() => {
          this.setState({ keycardBuffer: "", isInputing: false });
        }, 1000);
      }
    }
  }

  sendKeycard() {
    let keycard = this.state.keycardBuffer;
    this.setState({ keycardBuffer: "" });
    document.removeEventListener("keydown", this.detectKeyDown, true);
    this.props.callbackKeycard(keycard);
  }

  render() {
    return <div>Przyłóż kartę do czytnika</div>;
  }
}
