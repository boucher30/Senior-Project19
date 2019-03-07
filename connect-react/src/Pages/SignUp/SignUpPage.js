import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import CustomFormGroup from "../../components/CustomFormGroup";
import Redirect from "react-router/Redirect";

export default class SignUpPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: 'cmarcy',
			password: 'abc',
			sportType: -1,
			firstName: 'Christian',
			lastName: 'Marcy',
			profileType: -1,
			redirect: false
		}
	}

	// Validates form for style purposes and so that we cannot send empty data to api
	validateForm() {
		const { username, password, sportType, firstName, lastName, profileType } = this.state;
		return username.length > 0 &&
			password.length > 0 &&
			firstName.length > 0 &&
			lastName.length > 0 &&
			typeof profileType == 'string' &&
			typeof sportType == 'string';
	}

	// Handles state change for each input in the state object
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		console.log('Submitted form:', this.state);
		this.setState({ redirect: true });
	}

	render() {
		console.log('State', this.state);
		const { redirect } = this.state;
		if(redirect) {
			return <Redirect to={`/dashboard/profile/${localStorage.getItem('userId')}`}/>;
		}

		return (
			<div className="Login" style={{ height: '80%', top: '42%' }}>
				<h3 style={{ textAlign: 'center', marginTop: '5%' }}>Sign Up</h3>
				<form onSubmit={this.handleSubmit}>
					<CustomFormGroup value={this.state.firstName} label="First Name"	controlId="firstName"
						type="text"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.lastName} label="Last Name"	controlId="lastName"
						type="text"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.username} label="Username"	controlId="username"
						type="text"	onChange={this.handleChange} />

					<CustomFormGroup value={this.state.password} label="Password"	controlId="password"
						type="password"	onChange={this.handleChange} />

					<Form.Group controlId="sportType">
						<Form.Label>Sport Type</Form.Label>
						<Form.Control value={this.state.sportType} placeholder="Select a Sport" onChange={this.handleChange} as="select">
							<option disabled value={-1}>Select an option...</option>
							<option>Snowboarding</option>
							<option>Surfing</option>
							<option>Skateboarding</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="profileType">
						<Form.Label>Profile Type</Form.Label>
						<Form.Control value={this.state.profileType} placeholder="Select type of profile..." onChange={this.handleChange} as="select">
							<option disabled value={-1}>Select an option...</option>
							<option>Athlete</option>
							<option>Photographer</option>
						</Form.Control>
					</Form.Group>

					<Button style={{ marginTop: '20px' }}	block disabled={!this.validateForm()} type="submit">Sign In</Button>
				</form>
			</div>
		);
	}
}