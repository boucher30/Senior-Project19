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
import socketIOClient from "socket.io-client"
//const  socket = openSocket('http://localhost:8001');
const socket = socketIOClient("http://localhost:8001");
class App extends Component {

  constructor() {
    super(Component);
    this.state = {
      response: "test",
      endpoint: "http://localhost:8001",
        timestamp: 'no timestamp yet'
    };
  }

  componentWillMount() {
    const { endpoint } = this.state;


    this.setState({socket: socket});
      socket.on("FromAPI", data => this.setState({ response: data }));
      socket.emit("I am alive");
    //socket.on("connection", alert("connection detected from server"));
    //socket.on("message sent", alert("someone sent a message"));
  }

    componentWillUnmount() {
        this.state.socket.disconnect();
    }


    /*
    <div style={{ textAlign: "center" , height: "15%"}}>

                 <p>
                  The temperature in Florence is: {response} °F
                </p>
                <p>Loading...</p>
          </div>

    */
  render() {


    const { response } = this.state;
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
