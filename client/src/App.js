import React, { Component } from 'react';
import Main from './mainComponent/mainComponent';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {items: []}
  }


  componentDidMount() {
    // fetch('/data')
    //   .then(res => res.json())
    //   .then(items => this.setState({ items }))
  }

  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
