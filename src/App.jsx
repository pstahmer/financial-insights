import React, { Component } from 'react';

import Groups from './components/groups/groups';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Groups />
      </div>
    );
  }
}

export default App;
