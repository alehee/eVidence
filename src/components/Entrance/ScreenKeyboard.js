import React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export default class ScreenKeyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onKeyPress = (button) => {
    if (this.props.inputId === null) return;

    let inputs = this.props.inputs;
    let text = inputs[this.props.inputId];

    if (button === "{space}") text += " ";
    else if (button === "{bksp}" && text.length > 0) text = text.slice(0, -1);
    else if (button.length === 1) text += button;

    inputs[this.props.inputId] = text;
    this.props.callbackInput(inputs);
  };

  render() {
    return (
      <Keyboard
        name="keyboard"
        className="keyboard"
        onKeyPress={this.onKeyPress}
        layout={{
          default: [
            "1 2 3 4 5 6 7 8 9 0 - = {bksp}",
            "Q W E R T Y U I O P { } | Ą Ę",
            'A S D F G H J K L : " Ś Ć Ń Ó',
            "Z X C V B N M < > ? Ż Ź Ł",
            "{space}",
          ],
        }}
      />
    );
  }
}
