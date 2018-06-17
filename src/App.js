import React, { Component } from 'react';
import './App.css';
import CoverageSimulator from './components/CoverageSimulator'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CoverageSimulator></CoverageSimulator>
      </div>
    );
  }
}

export default App;
