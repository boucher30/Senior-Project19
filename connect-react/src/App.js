import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Styles at app level
import './App.css';

// Pages and components
import TopNav from "./components/Navbar";
import Dashboard from "./Pages/Dashboard";
import SplashPage from './Pages/SplashPage';
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUpPage";


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* We keep the same navbar up top and we can change options based on where we are in sequence for user */}
        <TopNav/>

        {/* Main routing methods can be found here */}
        <Switch>
          <Route exact path='/' component={SplashPage} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/login' component={LoginPage} />
          <Route path='/sign-up' component={SignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
