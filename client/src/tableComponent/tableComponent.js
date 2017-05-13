import React, { Component } from 'react';
import Search from '../searchComponent/searchComponent';

import './Table.css';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      filterInput: ''
    }

    this.updateTableItems = this.updateTableItems.bind(this);
  }

  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(items => this.setState({ items }))
  }

  updateTableItems(inputValue) {
    this.setState({ filterInput: inputValue });
  }

  render() {
    var desplayedItems = this.state.items.filter((item) => {
      var match = item.category.toLowerCase().indexOf(this.state.filterInput.toLowerCase());
      return (match != -1);
    })

    var renderItems;
    if(desplayedItems.length > 0) {
      var items = desplayedItems.map((item) => {
        return (
          <tr key={item.id} className={(item.type == 'доход') ? 'pb-tr-profit': 'pb-tr-expens'}>
            <td>{item.date}</td>
            <td className="pb-cat"><div> <i className="fa fa-tag" aria-hidden="true"></i> {item.category}</div></td>
            <td>{(item.description == '') ? '-': item.description}</td>
            <td className={(item.type == 'доход') ? 'pb-profit': 'pb-leave'}>{(item.type == 'доход') ? '+' + item.sum + 'руб.' : '-' + item.sum + 'руб.'}</td>
            <td></td>
            <td></td>
          </tr>
        )
      })
      renderItems = <tbody>{items}</tbody>
    } else {
      renderItems = <tbody><tr>Совпадений не найдено</tr></tbody>
    }
    return (
      <div className="main-content">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Search updateItems={this.updateTableItems} />
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="pb-tables">
          <table className="table table-hover">
            <thead>
              <tr>
                <th><i className="fa fa-calendar-check-o" aria-hidden="true"></i> Дата</th>
                <th><i className="fa fa-tags" aria-hidden="true"></i> Категория</th>
                <th><i className="fa fa-pencil-square" aria-hidden="true"></i> Описание</th>
                <th><i className="fa fa-money" aria-hidden="true"></i> Расход/Доход</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {renderItems}
          </table>
        </div>
      </div>
    )
  }
}

export default Table;
