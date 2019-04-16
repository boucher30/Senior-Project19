import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import DatePicker from "react-datepicker/es";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateCarveModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Carver\'s Carve',
			sport: {},
			type: {},
			venue: {},
			startDate: new Date(),
			description: 'Helllllloooooooo'
		};

		this.createCarve = this.createCarve.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	// Handles state change for each input in the state object
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	// Hits API with body of carve
	createCarve(e) {
		e.preventDefault();

		// Need to format date for db in YYYY-MM-DD
		const { startDate } = this.state;
		const date = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
		console.log('Date:', date);
//carveName,creatorId,venueId,carveType,athlete,photo,date, sports
		axios.post('http://ec2-3-92-212-119.compute-1.amazonaws.com:8000/carves', {
			carveName: this.state.name,
			creatorId: localStorage.getItem('userId'),
			venueId: this.state.venue,
			carveType: [this.state.type],
			athlete: 5,
			photo: 5,
			sports: [this.state.sport]

		});
		this.props.handleClose();
	}



	// Used for changing the date on the date picker
	handleDateChange(date) {
		this.setState({
			startDate: date
		});
	}

	// Make sure that all fields are filled in
	validateForm() {
		const { name, description} = this.state;
		return (
				name.length > 0 &&
				description.length > 0
		);
	}

	render() {
		return (
			<Modal size="lg"
						 aria-labelledby="contained-modal-title-vcenter"
						 centered
						 show={this.props.show}
						 onHide={this.props.handleClose}
						onSubmit = {this.props.handleClose}>
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

						{/* Type of Carve */}
						<Form.Group controlId="type">
							<Form.Label>Carve Type</Form.Label>
							<Form.Control value={this.state.type} placeholder="Select a Sport" onChange={this.handleChange} as="select">
								<option disabled value={-1}>Select an option...</option>
								<option> </option>
								<option value = 'buddy'>Buddy Carve</option>
								<option value = 'open'>Open Carve</option>
							</Form.Control>
						</Form.Group>
						{/* Sport selection */}
						<Form.Group controlId="sport">
							<Form.Label>Sport Type</Form.Label>
							<Form.Control value={this.state.sport} placeholder="Select a Sport" onChange={this.handleChange} as="select">
								<option disabled value={-1}>Select an option...</option>
								<option value = 'snowboard'>Snowboarding</option>
								<option value = 'ski'>Skiing</option>
								<option value = 'snowmobile'>Snowmobile</option>
								<option value = 'snowboard,ski'>Snowboard and Ski</option>
								<option value = 'surf'>Surfing</option>
								<option value = 'waterski'>Water Ski</option>
								<option value = 'skateboard'>Skateboarding</option>
								<option value = 'BMX'>BMX</option>
								<option value = 'mountainBike'>Mountain Bike</option>
								<option value = 'skyDive'>Sky Dive</option>
								<option value = 'hangGlide'>Hang Glide</option>
							</Form.Control>
						</Form.Group>

						{/* Location */}
						<Form.Group controlId="venue">
							<Form.Label>Venue</Form.Label>
							<Form.Control value={this.state.venue} placeholder="Select Location..."  onChange={this.handleChange} as="select" >
								<option disabled value={-1}>Select an option...</option>
								<option value = '0'> </option>
							<option value = '1'>Mountain 1</option>
							<option value = '11'>Beach 1</option>
							<option value = '16'>Lake 1</option>
							<option value = '18'>Skatepark 1</option>
							<option value = '28'>Airfield 1</option>
							</Form.Control>
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
					<Button type = "submit" variant="primary" disabled={!this.validateForm()} onClick={this.createCarve}>
						Create
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}