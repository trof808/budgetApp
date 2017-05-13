import React, { Component } from 'react';
import ProfitModal from '../modalsComponent/profitModalComponent';

class AddButtons extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="addButtons">
        <button type="button" className="btn btn-default" data-toggle="modal" data-target="#profitModal">Доход</button>
        <button type="button" className="btn btn-default">Расход</button>

      <ProfitModal />
      </div>
    )
  }
}

export default AddButtons;
