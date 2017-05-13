import React, { Component } from 'react';
import Table from '../tableComponent/tableComponent';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-wrapper">
        <div className="row">
          <div className="col-md-3">

          </div>
          <div className="col-md-6">
            <Table />
          </div>
          <div className="col-md-3">

          </div>
        </div>
      </div>
    )
  }
}

export default Main;
