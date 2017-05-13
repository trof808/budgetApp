import React, { Component } from 'react';

class ProfitModal extends Component {
  constructor(props){
    super(props);
    this.handleProfit = this.handleProfit.bind(this);
  }

  handleProfit() {
    var data = {
      type: 'доход',
      date: document.getElementById('pb-date-profit').value,
      category: document.getElementById('pb-tag-profit').value,
      description: document.getElementById('pb-desc-profit').value,
      sum: document.getElementById('pb-sum-profit').value
    }
    fetch('/data', {
      method: 'POST',
      body: data
    });
    // .then((res) => {
    //   return res.json();
    // }).then(items => console.log(items)).catch((err) => {console.log(err)})
  }

  render() {
    return (
      <div className="modal fade" id="profitModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="profitModalLabel"> Доход </h5>
            </div>
            <div className="modal-body">
              <form id="pb-form-profit" onSubmit={this.handleProfit}>
                <div className="form-group row">
                  <label className="col-4 col-form-label" htmlFor="pb-date-profit">Дата</label>
                  <div className="col-md-8">
                    <input id="pb-date-profit" className="form-control" type="date"/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label" htmlFor="pb-tag-profit">Категория</label>
                  <div className="col-md-8">
                    <select id="pb-tag-profit" className="form-control">
                      <option>Зарплата</option>
                      <option>Другое</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label" htmlFor="pb-desc-profit">Описание</label>
                  <div className="col-md-8">
                    <input id="pb-desc-profit" className="form-control" type="text" />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label" htmlFor="pb-sum-profit">Сумма</label>
                  <div className="col-md-8">
                    <input id="pb-sum-profit" className="form-control" type="number" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default ProfitModal;
