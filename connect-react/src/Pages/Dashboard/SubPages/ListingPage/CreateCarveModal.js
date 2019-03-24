import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";

export default class CreateCarveModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			sport: -1,
			location: ''
		}

		this.createCarve = this.createCarve.bind(this);
	}

	// Handles state change for each input in the state object
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	createCarve(e) {
		e.preventDefault();
		console.log('Submitted', this.state);
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
						<Form.Group onChange={this.handleChange} controlId="location">
							<Form.Label>Location</Form.Label>
							<Form.Control type="text" placeholder="Enter Location..." />
							<Form.Text className="text-muted">
								Don't worry if you don't know where you want to go.
							</Form.Text>
						</Form.Group>

						{/* Description */}
						<Form.Group onChange={this.handleChange} controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" rows="2" placeholder="Enter description here..." />
						</Form.Group>

						<hr/>

						<h6 style={{textAlign: 'center'}}>Looking for...</h6>

					</Container>
				</Modal.Body>


				<Modal.Footer>
					<Button variant="secondary" onClick={this.props.handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={this.createCarve}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}