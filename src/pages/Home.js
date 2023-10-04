import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <Link to={"/administration"}>Administration</Link>
        </div>
        <div>
          <Link to={"/entrance"}>Entrance</Link>
        </div>
        <div>
          <Link to={"/checkpoint"}>Checkpoint</Link>
        </div>
      </div>
    );
  }
}
