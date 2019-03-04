import React, { Component } from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import TopNav from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav/>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
