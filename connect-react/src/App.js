import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
// Styles at app level
import './App.css';
// Pages and components
import Dashboard from "./Pages/Dashboard/Dashboard";
import SplashPage from './Pages/SplashPage/SplashPage';
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import LogoutPage from "./Pages/Logout/LogoutPage";
import ErrorPage from "./Pages/error/ErrorPage";
import {subscribe} from './api';


class App extends Component {
  constructor(props) {
    super(props);
    // subscribe((err, timestamp) => this.setState({
    //   timestamp
    // }));

  }

  state = {
    timestamp: 'no timestamp yet'
  };

  render() {
      let data ="";
    /* trying to execute logout on browser close.
    window.addEventListener("beforeunload", (ev) =>
    {
     ev.preventDefault();
      return ev.returnValue = 'Are you sure you want to close?';

    });
    window.addEventListener("onunload", (ev) =>
    {
      ev.preventDefault();

      if(localStorage.getItem('userId') > 0){
        axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}/logout`)
            .then(res => {

              this.setState({
                //messages: res.data.results[0][0]
              });

              alert("Log out successful");
            });
      }


    });*/
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
