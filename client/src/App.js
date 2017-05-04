import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {items: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(items => this.setState({ items }))
  }

  render() {
    return (
      <div className="App">
        <h1>Items</h1>
        {this.state.items.map(item =>
          <div key={item.id}>{item.sum}</div>
        )}
      </div>
    );
  }
}

export default App;
