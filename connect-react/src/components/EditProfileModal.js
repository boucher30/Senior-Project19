import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CustomFormGroup from './CustomFormGroup';
import Form from "react-bootstrap/Form";
import axios from 'axios';

export default class EditProfileModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: props.user.username,
			password: 'abc',
			sport_type: props.user.sport,
			firstName: props.user.first_name,
			lastName: props.user.last_name,
			profileType: props.user.profile_type
		}
	}

	// Validates form for style purposes and so that we cannot send empty data to api
	validateForm() {
		const { username, sport_type, firstName, lastName, profileType } = this.state;
		return username.length > 0 &&
			firstName.length > 0 &&
			lastName.length > 0 &&
			typeof profileType == 'string' &&
			typeof sport_type == 'string';
	}

	// Handles state change for each input in the state object
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = e => {
		// We go to endpoint here to update users info and send the new info that is stored in state
		e.preventDefault();
		axios.put(`http://localhost:8000/users/${localStorage.getItem('userId')}`, this.state)
			.then(res => {
				console.log('Resulting information from API:', res);
				this.props.handleRefresh();
				this.props.handleClose();
			})
			.catch(err => {
				console.log('Error', err);
			})
	};

	render() {
		const { firstName, lastName, username, sport, profile_type } = this.state;
		return (
			<Modal show={this.props.show} onHide={this.props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>


				<Modal.Body>
					<form onSubmit={this.handleSubmit}>
						<CustomFormGroup value={firstName} label="First Name"	controlId="firstName"
														 type="text"	onChange={this.handleChange} />

						<CustomFormGroup value={lastName} label="Last Name"	controlId="lastName"
														 type="text"	onChange={this.handleChange} />

						<CustomFormGroup value={username} label="Username"	controlId="username"
														 type="text"	onChange={this.handleChange} />

						<Form.Group controlId="sport_type">
							<Form.Label>Sport Type</Form.Label>
							<Form.Control value={sport} placeholder="Select a Sport" onChange={this.handleChange} as="select">
								<option disabled value={-1}>Select an option...</option>
								<option>Snowboarding</option>
								<option>Surfing</option>
								<option>Skateboarding</option>
							</Form.Control>
						</Form.Group>

						<Form.Group controlId="profileType">
							<Form.Label>Profile Type</Form.Label>
							<Form.Control value={profile_type} placeholder="Select type of profile..." onChange={this.handleChange} as="select">
								<option disabled value={-1}>Select an option...</option>
								<option>Athlete</option>
								<option>Photographer</option>
							</Form.Control>
						</Form.Group>
					</form>
				</Modal.Body>


				<Modal.Footer>
					<Button variant="secondary" onClick={this.props.handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={this.handleSubmit} disabled={!this.validateForm()}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}