import React, {Component} from 'react'
import axios from 'axios'
import helpers from '../util'
import UserProfileCard from "./UserProfileCard";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default class ConnectionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: {},
			loading: true,
			newUser: {
				first_name: 'Hello',
				last_name: 'Test',
				username: 'This'
			},
			show: false
		};

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.createConnection = this.createConnection.bind(this);
	}

	handleClose() {
		console.log('In handle close function...');
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	// Creates a user in the database
	createConnection() {
		this.setState({ loading: true });
		axios.post('http://localhost:8000/users', this.state.newUser)
			.then(res => {
				// After making a new user, lets go get the new list of users from the api
				this.setState({ show: false });
				axios.get('http://localhost:8000/users')
					.then(res => {
						console.log('Reloaded all users from db');
						this.setState({
							loading: false,
							users: res.data.users
						})
					})
			})
	}

	componentWillMount() {
		this.setState({ loading: true });
		axios.get('http://localhost:8000/users')
			.then(res => {
				this.setState({
					users: res.data.users,
					loading: false
				});
			})
	}

	render() {
		// Logic to figure out if we have users to display
		let connections;
		const users = this.state.users;

		if(this.state.loading) {
			connections = <div>Loading...</div>
		} else {
			if(!helpers.isObjEmpty(users)) {
				// Map over users and pass the user into the Profile component
				connections = Object.keys(users).map((user, index) => {
					return <UserProfileCard user={users[index]} key={index} />
				});
			} else {
				// Else give back 'No users found msg'
				connections = <div>No users found</div>;
			}
		}


		// Template if we have users or if we don't
		return (
			<div>
				{/* Add connection modal */}
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Create a Connection</Modal.Title>
					</Modal.Header>

					{/* Modal Body */}
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>First Name</Form.Label>
								<Form.Control type="text"
															placeholder="John"
															value={this.state.newUser.first_name}
															onChange={(e) => { this.setState({ newUser: {...this.state.newUser, first_name: e.target.value} }) }}/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Last Name</Form.Label>
								<Form.Control type="text"
															placeholder="Smith"
															value={this.state.newUser.last_name}
															onChange={(e) => { this.setState({ newUser: {...this.state.newUser, last_name: e.target.value} }) }}/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control type="text"
															placeholder="Smithersj1234"
															value={this.state.newUser.username}
															onChange={(e) => { this.setState({ newUser: {...this.state.newUser, username: e.target.value} }) }} />
							</Form.Group>
						</Form>
					</Modal.Body>

					{/* Modal Footer - Produces action so that we can create person */}
					<Modal.Footer>
						<Button variant="primary" onClick={this.createConnection}>Create Connection</Button>
					</Modal.Footer>
				</Modal>

				{/* Rest of page that will always show */}
				<div>
					<h1>Connection Page</h1>
					<Button onClick={this.handleShow}>Add Connection</Button>
				</div>

				{/* Container that will hold all our connections */}
				<Container style={{ height: '80vh', overflowY: 'scroll' }}>
					{connections}
				</Container>
			</div>
		);
	}
}
