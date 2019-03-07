import React, { Component } from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import SnowProfilePic from '../images/snowboard-profile-pic.jpg';

export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.match.params.number,
			userInfo: {},
			userInfoLength: 0,
			isUserLoggedIn: props.match.params.number === localStorage.getItem('userId')
		}
	}

	componentWillMount() {
		// Getting the user id from the url param
		axios.get(`http://localhost:8000/users/${this.state.userId}`)
			.then(res => {
				console.log('User:', res.data);
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
			const profilePrefix = this.state.isUserLoggedIn ? 'My ' : `${this.state.userInfo.username}'s `

			return (
				<>
					<div style={{ display: 'flex', marginTop: '8px' }}>
						<h2 style={{ width: '90%' }}>{profilePrefix} Profile</h2>
						{this.state.isUserLoggedIn && <Button variant="warning">Edit</Button>}
					</div>

					{/* This is the row that will hold the profile picture and the information */}
					<Row>
						<Col xs={7}>
							<Container style={{ padding: '15px' }}>
								<Image src={SnowProfilePic} fluid />
							</Container>
						</Col>
						<Col xs={5}>
							<Container style={{ paddingTop: '25%', paddingLeft: '60px' }}>
								<p>Username: {user.username}</p>
								<p>First Name: {user.first_name}</p>
								<p>Last Name: {user.last_name}</p>
								<p>Buddy Count: {Math.round((Math.random() * (50)))}</p>
							</Container>
						</Col>
					</Row>

					{/* Row will hold all of the media and such that we grab from the api */}
					<Row></Row>
				</>
			);
		} else {
			return (
				<div>Loading!</div>
			);
		}
	}
}
