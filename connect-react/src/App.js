import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import socketIOClient from "socket.io-client";
// Styles at app level
import './App.css';
import Dashboard from "./Pages/Dashboard/Dashboard";
import SplashPage from './Pages/SplashPage/SplashPage';
import LoginPage from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import LogoutPage from "./Pages/Logout/LogoutPage";
// Pages and components


//const  socket = openSocket('http://localhost:8001');
const socket = socketIOClient("http://localhost:8001");

const Home =() => (
    <div>
      <h2>HOME</h2>
    </div>

);

const page1 =() => (
    <div>
      <h2>Page1</h2>
    </div>

);

const page2 =() => (
    <div>
      <h2>Page2</h2>
    </div>

);

const page3 =() => (
    <div>
      <h2>Page3</h2>
    </div>

);
/*
const routes = [

  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/login',
        component: LoginPage,
      },
      {
        path: '/logout',
        component: LogoutPage,
      },
      {
        path: '/sign-up',
        component: SignUpPage,
      },


    ]
  },
  {
    path:'error',
    component: ErrorPage
  }

];
*/
/*
const RouteWithSubRoutes = (route) => (
    <Route path ={route.path} render={(props)=> (
        <route.component{...props} routes = {routes.routes}/>
    )}/>
);
*/


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
   // socket.on("connection", alert("connection detected from server"));
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

    /*

    // DEBUG links to verify it works
    <ul>
              <li><Link to = '/'>Home</Link></li>
                <li><Link to = '/login'>Login</Link></li>
                <li><Link to = '/sign-up'>Sign Up</Link></li>
            </ul>
     */
  render() {


    const { response } = this.state;
    return (
        <Router>
          <div>
            <Route exact path ='/' component={SplashPage}/>
              <Route path='/login' component={LoginPage}/>
              <Route path='/sign-up' component={SignUpPage}/>
              <Route path = '/dashboard' component={Dashboard}/>
              <Route path = '/logout' component={LogoutPage}/>
          </div>
        </Router>


    );
  }
}

export default App;
