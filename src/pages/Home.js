import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-center">
        <div className="h4 p-2">Wybierz moduł</div>
        <div className="mb-2">
          <Link to={"/administration"}>Moduł administracji</Link>
        </div>
        <div className="mb-2">
          <Link to={"/entrance"}>Moduł wejścia/wyjścia</Link>
        </div>
        <div className="mb-2">
          <Link to={"/checkpoint"}>Moduł zmiany procesów</Link>
        </div>
      </div>
    );
  }
}
