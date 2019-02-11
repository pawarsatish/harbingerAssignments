import React, { Component } from "react";

class TableRowComponent extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   rowData: this.props.rowData
    // };
  }
  render() {
    return (
      <tr>
        <td>{this.props.rowData.id}</td>
        <td>{this.props.rowData.name}</td>
      </tr>
    );
  }
}

export default TableRowComponent;
