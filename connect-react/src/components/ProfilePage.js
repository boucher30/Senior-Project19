import React, { Component } from 'react'
import axios from 'axios'

export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.match.params.number,
			userInfo: {},
			userInfoLength: 0
		}
	}

	componentWillMount() {
		// Getting the user id from the url param
		axios.get(`http://localhost:8000/users/${this.state.userId}`)
			.then(res => {
				console.log('Result:', res.data);
				this.setState({
					userInfo: res.data.user[0],
					userInfoLength: Object.keys(res.data.user[0]).length
				});
			})
	}

	// We need to conditionally render things based on the user in relation to who is logged in
	render() {
		if(this.state.userInfoLength > 0) {
			const user = this.state.userInfo;
			const profilePrefix = this.state.userId === localStorage.getItem('userId') ? 'My ' : `${this.state.userInfo.username}'s `

			return (
				<div>
					<h2>{profilePrefix} Profile</h2>
					<h6>Username: {user.username}</h6>
					<p>First Name: {user.first_name}</p>
					<p>Last Name: {user.last_name}</p>
				</div>
			);
		} else {
			return (
				<div>Loading!</div>
			);
		}
	}
}
