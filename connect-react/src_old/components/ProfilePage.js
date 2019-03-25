import React, {Component} from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import SnowProfilePic from '../images/snowboard-profile-pic.jpg';
import EditProfileModal from "./EditProfileModal";

export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.match.params.number,
			userInfo: {},
			userInfoLength: 0,
			isUserLoggedIn: props.match.params.number === localStorage.getItem('userId'),
			show: false
		};

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
	}

	// Retrieves info before component is mounted to the DOM
	componentWillMount() {
		this.getUserInfo();
	}

	// We need to conditionally render things based on the user in relation to who is logged in
	render() {
		if(this.state.userInfoLength > 0) {
			const { userInfo, isUserLoggedIn } = this.state;
			const profilePrefix = isUserLoggedIn ? 'My ' : `${this.state.userInfo.username}'s `;

			// Make button options for top right corner
			let options;
			if(isUserLoggedIn) {
				options = <Button variant="warning" onClick={this.handleShow}>Edit</Button>;
			} else {
				options = <div style={{display:'flex'}}>
					<Button style={{margin:'5px'}} variant="info">Follow</Button>
					<Button style={{margin:'5px'}} variant="info">Add Buddy</Button>
				</div>;
			}

			return (
				<>
					<EditProfileModal handleRefresh={this.getUserInfo} user={userInfo} show={this.state.show} handleClose={this.handleClose} />

					<div style={{ display: 'flex', marginTop: '8px' }}>
						<h2 style={{ width: isUserLoggedIn ? '90%' : '80%' }}>{profilePrefix} Profile</h2>
						{options}
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
								<p>Username: {userInfo.username}</p>
								<p>First Name: {userInfo.first_name}</p>
								<p>Last Name: {userInfo.last_name}</p>
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
				<div>Loading! this is what we see</div>
			);
		}
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	getUserInfo() {
		// Getting the user id from the url param
		axios.get(`http://localhost:8000/users/${this.state.userId}`)
			.then(res => {
				this.setState({
					userInfo: res.data.user[0][0],
					userInfoLength: Object.keys(res.data.user[0][0]).length
				});
			})
	}
}
