import React, {Component} from 'react'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {link} from 'react-router'

import CustomFormGroup from "./CustomFormGroup";

class TopNav extends Component {
	constructor(props)
	{
			super(props);
			this.handleClick = this.handleClick.bind(this);

			this.state = {userId: 1, search: "", redirect: false}

	}

	handleClick() {
		alert("searching for user: " + this.state.userId);
		this.setState({userId : this.value}) ;

	}

	// Handles state change for each input in the state object
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	validateForm() {
		const { search } = this.state;

		return parseInt(search) > 0;
	}

	handleSubmit = e => {
		e.preventDefault();
		alert("submitting the form " + this.state.search);
		console.log('Submitted form:', this.state);
		var value = this.state.search;
		parseInt(value);
		if(value > 0) {

			this.setState({redirect : true});


	}};


	render(){


		let redirect = this.state.redirect;
		if(redirect) {
			return <link  to={`/dashboard/profile/${this.state.userId}`}/>;
		}

	return (

		<Nav className="navbar navbar-dark bg-dark nav-fill" >
			<a className="navbar-brand" href="/" style = {{color:'lightskyblue',
				textShadowColor: 'black',
				fontWeight:'bold',
				fontFamily: 'monospace'}}>Carve Connect
			</a>
			<li>
			<div style={{justify:"left"}}>
				<Form inline style ={{justify:"left"}} >
					<CustomFormGroup value = {this.state.search} type="integer" placeholder="User Search" className=" mr-sm-2" controlId ="search" onChange={this.handleChange} />
					<Button type="submit" block disabled={!this.validateForm()} href = {'/dashboard/profile/'+ parseInt(this.state.search)} style = {{width: 50, color: "white"}} rounded>Find</Button>

				</Form>

			</div>
			</li>
			<li >

				<ul className="navbar justify-content-end">
					<div>

						<NavDropdown className ="fa fa-envelope text-white"  id="collasible-nav-dropdown">
							<NavDropdown.Item href="/dashboard/messages">Messages</NavDropdown.Item>
							<NavDropdown.Item href="/dashboard/messages/Inbox">Inbox</NavDropdown.Item>
							<NavDropdown.Item href="/dashboard/messages">Sent</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/dashboard/messages">Send Message</NavDropdown.Item>
						</NavDropdown>

						<NavDropdown className ="fa fa-bell text-danger"  id="collasible-nav-dropdown" >
							<NavDropdown.Item href="#">Notifications</NavDropdown.Item>
							<NavDropdown.Item href="#">Buddy Requests</NavDropdown.Item>
							<NavDropdown.Item href="#">Carves</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#">Create Carve</NavDropdown.Item>
						</NavDropdown>

						<NavDropdown className="fa fa-cogs text-secondary"  id="collasible-nav-dropdown" >
							<NavDropdown.Item href="#">Settings</NavDropdown.Item>
							<NavDropdown.Item href="#">Privacy</NavDropdown.Item>
							<NavDropdown.Item href="#">Help</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/">Contact Us</NavDropdown.Item>
						</NavDropdown>
					</div>
				<div>
				<li className="nav-item">
						<a className="nav-link active" href={'/logout'}>Logout</a>
					</li>
				</div>
				</ul>

			</li>

		</Nav>
)}


}

export default TopNav;