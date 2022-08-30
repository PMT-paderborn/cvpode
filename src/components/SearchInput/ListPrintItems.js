import React, { Component } from "react";

class ListPrintItems extends Component {
  render() {
    const { items } = this.props;
    return (
      <div style={{ padding: "24px" }}>
        <table>
          <tbody>
            {items.length > 0 &&
              items.map((item) => (
                <tr key={item.code}>
                  <td>
                    <strong style={{ paddingRight: "10px" }}>{item.code}</strong>
                    {item.description}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListPrintItems;
