import React from "react";

export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // TODO
    return (
      <div>
        <div>Switch</div>
        <div>{this.props.departmentId}</div>
      </div>
    );
  }
}
