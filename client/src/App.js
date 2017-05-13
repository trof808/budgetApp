import React, { Component } from 'react';
import Main from './mainComponent/mainComponent';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
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
