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
          <div className="col-md-2">

          </div>
          <div className="col-md-8">
            <Table />
          </div>
          <div className="col-md-2">

          </div>
        </div>
      </div>
    )
  }
}

export default Main;
