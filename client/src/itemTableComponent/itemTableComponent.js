import React, { Component } from 'react';

class ItemTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var item = this.props.item;
    return (
      <tr key={item.id} className={(item.type === 'доход') ? 'pb-tr-profit': 'pb-tr-expens'}>
        <td>{item.date}</td>
        <td className="pb-cat"><div> <i className="fa fa-tag" aria-hidden="true"></i> {item.category}</div></td>
        <td>{(item.description === '') ? '-': item.description}</td>
        <td className={(item.type === 'доход') ? 'pb-profit': 'pb-leave'}>{(item.type === 'доход') ? '+' + item.sum + 'руб.' : '-' + item.sum + 'руб.'}</td>
        <td></td>
        <td></td>
      </tr>
    )
  }
}

export default ItemTable;
