import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import DatePicker from "react-datepicker/es";

import "react-datepicker/dist/react-datepicker.css";

export default class CreateCarveModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Carver\'s Carve',
			sport: -1,
			location: 'Dublin, Ireland',
			startDate: new Date(),
			description: 'Helllllloooooooo'
		}

		this.createCarve = this.createCarve.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	// Handles state change for each input in the state object
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	// Hits API with body of carve
	createCarve(e) {
		e.preventDefault();

		// Need to format date for db in YYYY-MM-DD
		const { startDate } = this.state;
		const date = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
		console.log('Date:', date);
	}

	// Used for changing the date on the date picker
	handleDateChange(date) {
		this.setState({
			startDate: date
		});
	}

	// Make sure that all fields are filled in
	validateForm() {
		const { name, location, sport, description } = this.state;
		return (
				name.length > 0 &&
				location.length > 0 &&
				description.length > 0 &&
				typeof sport != "number"
		);
	}

	render() {
		return (
			<Modal size="lg"
						 aria-labelledby="contained-modal-title-vcenter"
						 centered
						 show={this.props.show}
						 onHide={this.props.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">New Carve</Modal.Title>
				</Modal.Header>


				<Modal.Body>
					<Container>

						{/* Name of Carve */}
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control value={this.state.name} onChange={this.handleChange} type="text" placeholder="Enter Name of Carve..." />
							<Form.Text className="text-muted">
								This is the name of your group carve.
							</Form.Text>
						</Form.Group>

						{/* Sport selection */}
						<Form.Group controlId="sport">
							<Form.Label>Sport Type</Form.Label>
							<Form.Control value={this.state.sport} placeholder="Select a Sport" onChange={this.handleChange} as="select">
								<option disabled value={-1}>Select an option...</option>
								<option>Snowboarding</option>
								<option>Surfing</option>
								<option>Skateboarding</option>
							</Form.Control>
						</Form.Group>

						{/* Location */}
						<Form.Group controlId="location">
							<Form.Label>Location</Form.Label>
							<Form.Control value={this.state.location} onChange={this.handleChange} type="text" placeholder="Enter Location..." />
							<Form.Text className="text-muted">
								Don't worry if you don't know where you want to go.
							</Form.Text>
						</Form.Group>

						{/* Date Picker */}
						<Form.Group>
							<Form.Label>Date of Event</Form.Label>
							<div>
								<DatePicker	selected={this.state.startDate} onChange={this.handleDateChange} />
							</div>
							<Form.Text className="text-muted">Pick a date for your carve.</Form.Text>
						</Form.Group>

						{/* Description */}
						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control value={this.state.description} onChange={this.handleChange} as="textarea" rows="2" placeholder="Enter description here..." />
						</Form.Group>

						{/* Horizontal rule */}
						<hr/>
						<h6 style={{textAlign: 'center'}}>Looking for...</h6>

						{/* Rider's switch */}
						<div className="custom-control custom-switch">
							<input type="checkbox" className="custom-control-input" id="customSwitches" />
							<label className="custom-control-label" htmlFor="customSwitches">Riders</label>
						</div>

						{/* Filmer's switch */}
						<div className="custom-control custom-switch">
							<input type="checkbox" className="custom-control-input" id="custSwitches"/>
							<label className="custom-control-label" htmlFor="custSwitches">Filmers</label>
						</div>

					</Container>
				</Modal.Body>


				<Modal.Footer>
					<Button variant="secondary" onClick={this.props.handleClose}>
						Close
					</Button>
					<Button variant="primary" disabled={!this.validateForm()} onClick={this.createCarve}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}