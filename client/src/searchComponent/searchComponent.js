import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleSearchInput(searchValue) {
    this.props.updateItems(this.refs.filterInput.value)
    // console.log(this.refs.filterInput.value);
  }

  render() {
    return (
      <div className="form-group row">
        <input className="form-control" ref="filterInput" onChange={this.handleSearchInput} type="search" placeholder="Поиск" name="search" />
      </div>
    )
  }
}

export default Search;
