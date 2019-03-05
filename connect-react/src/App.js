import React, { Component } from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import TopNav from './components/Navbar';
import SplashPage from './Pages/SplashPage';
class App extends Component {
  render() {
    return (
      <div className="App">
        <SplashPage/>




        {/* <TopNav/> */}
        {/* <Dashboard/> */}
      </div>
    );
  }
}

export default App;
