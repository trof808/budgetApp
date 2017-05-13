import React, { Component } from 'react';

import './Table.css';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(items => this.setState({ items }))
  }

  render() {
    return (
      <div className="main-content">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="form-group row">
              <input className="form-control" type="search" placeholder="Поиск" name="search" />
            </div>
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
            <tbody>
              {this.state.items.map(item =>
                <tr key={item.id} className={(item.type == 'доход') ? 'pb-tr-profit': 'pb-tr-expens'}>
                  <td>{item.date}</td>
                  <td className="pb-cat"><div> <i className="fa fa-tag" aria-hidden="true"></i> {item.category}</div></td>
                  <td>{(item.description == '') ? '-': item.description}</td>
                  <td className={(item.type == 'доход') ? 'pb-profit': 'pb-leave'}>{(item.type == 'доход') ? '+' + item.sum + 'руб.' : '-' + item.sum + 'руб.'}</td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Table;
