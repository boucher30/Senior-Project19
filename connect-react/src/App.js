import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Styles at app level
import './App.css';
// Pages and components
import Dashboard from "./Pages/Dashboard/Dashboard";
import SplashPage from './Pages/SplashPage/SplashPage';
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import LogoutPage from "./Pages/Logout/LogoutPage";
import ErrorPage from "./Pages/error/ErrorPage";


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* We keep the same navbar up top and we can change options based on where we are in sequence for user */}


        {/* Main routing methods can be found here */}
        <Switch>
          <Route exact path='/' component={SplashPage} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/login' component={LoginPage} />
          <Route path='/logout' component={LogoutPage} />
          <Route path='/sign-up' component={SignUpPage} />
          <Route path='/error' component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
