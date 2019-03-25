/*
 *  Note for further programming:
 *  - Take out css file and make a js file with styles and fill them in as necessary
 *  */

import React, { Component } from 'react'
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import Redirect from "react-router/Redirect";
import './Login.css';
import axios from "axios";

export default class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "cmarcy98",
			password: "abc",
			redirect: false
		};
	}


	// Validates form for style purposes and so that we cannot send empty data to api
	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	// Handles state change for each input in the state object
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	// Responsible for checking api to see if user exists
	// and then if they do, redirect them to dashboard
	handleSubmit = (event) => {
		event.preventDefault();
		const user = { username: this.state.username, password: this.state.password };
		console.log('User Info:', user);

		// Fill in api call here
		// axios.post(API_URL, post body)
		// .then( do the rest here..... )

		// Make sure we redirect after we get the correct login
		localStorage.setItem('userId', 1);
		this.setState({ redirect: true });
	};

	render() {
		const { redirect } = this.state;
		if(redirect) {
			return <Redirect to={`/dashboard/profile/${localStorage.getItem('userId')}`}/>;
		}

		return (
			<div className="Login">
				<h3 style={{ textAlign: 'center', marginTop: '5%' }}>Sign In</h3>
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="username">
						<Form.Label>Username</Form.Label>
						<FormControl
							autoFocus
							type="text"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup controlId="password">
						<Form.Label>Password</Form.Label>
						<FormControl
							value={this.state.password}
							onChange={this.handleChange}
							type="password"
						/>
					</FormGroup>
					<Button
						block
						disabled={!this.validateForm()}
						type="submit"
					>
						Sign In
					</Button>
				</form>
				<p style={{ textAlign: 'center', marginTop: '25px' }}>Forgot your password?</p>
			</div>
		);
	}
}