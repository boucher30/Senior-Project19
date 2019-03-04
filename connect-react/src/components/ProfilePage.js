import React, { Component } from 'react'
import axios from 'axios'

export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: 1,
			userInfo: {},
			userInfoLength: 0
		}
	}

	componentWillMount() {
		axios.get(`http://localhost:8000/users/${this.state.userId}`)
			.then(res => {
				this.setState({
					userInfo: res.data.user[0],
					userInfoLength: Object.keys(res.data.user[0]).length
				});
			})
	}

	render() {
		console.log('User info length:', this.state.userInfoLength);
		return (
			<div>
				<h2>Profile Page</h2>
				<h6>Username</h6>
				<p>First Name</p>
				<p>Last Name</p>
			</div>
		);
	}
}
