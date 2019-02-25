import React, { Component } from 'react'
import axios from 'axios'
import helpers from '../util'
import UserProfileCard from "./UserProfileCard";
import Container from "react-bootstrap/Container";

export default class ConnectionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: {}
		}
	}

	componentWillMount() {
		axios.get('http://localhost:8000/users')
			.then(res => {
				this.setState({
					users: res.data.users
				});
			})
	}

	render() {
		// Logic to figure out if we have users to display
		let connections;
		const users = this.state.users;
		if(!helpers.isObjEmpty(users)) {
			// Map over users and pass the user into the Profile component
			connections = Object.keys(users).map((user, index) => {
				return <UserProfileCard user={users[index]} key={index} />
			});
		} else {
			// Else give back 'No users found msg'
			connections = <div>No users found</div>;
		}

		// Template if we have users or if we don't
		return (
			<div>
				<h1>Connection Page</h1>
				<Container>
					{connections}
				</Container>
			</div>
		);
	}
}
