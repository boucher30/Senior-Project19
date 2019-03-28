import React, {Component} from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import SnowProfilePic from '../images/snowboard-profile-pic.jpg';
import SnowProfilePic1 from '../images/snow1.jpg';
import SnowProfilePic2 from '../images/helmet reflect phot.jpeg';
import SnowProfilePic3 from '../images/drone guy.jpeg';
import EditProfileModal from "./EditProfileModal";

export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.match.params.number,
			userInfo: {},
			userInfoLength: 0,
			isUserLoggedIn: props.match.params.number === localStorage.getItem('userId'),
			pic : SnowProfilePic,
			check: true,
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

				var randomnumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;


					if(randomnumber === 1 )
					this.setState({pic : SnowProfilePic1});
					if(randomnumber === 2 )
					this.setState({pic : SnowProfilePic2});
					else if(randomnumber === 3)
						this.setState({pic : SnowProfilePic3});

			}

			return (
				<>
					<EditProfileModal handleRefresh={this.getUserInfo} user={userInfo} show={this.state.show} handleClose={this.handleClose} />

					<div style={{ display: 'flex', marginTop: '8px', border: "2px solid slategrey" }}>
						<h2 style={{ width: isUserLoggedIn ? '90%' : '80%' }}>{profilePrefix} Profile</h2>
						{options}

					</div>

					{/* This is the row that will hold the profile picture and the information */}
					<Row>

						<Col xs={4}>
							<Container style={{  border: "5px solid black" }}>

								<Image src={this.state.pic} fluid />
							</Container>
						</Col>
						<Col xs={4}>
							<Container style={{ backgroundColor: "darkgrey", height: "100%", width:"100%",border: "2px double black"}} bordered>
								<h1> {userInfo.username}</h1>
								<h4> {userInfo.first_name} {userInfo.last_name}</h4>
								<p style={{flexDirection:'row'}} > <i className="fa fa-video-camera"> </i> {userInfo.type} </p>

							</Container>
						</Col>
						<Col xs={4}>
						<Container style={{ border: " 2px solid black", backgroundColor:'slategrey', width:"100%%", height: "100%" }}>
							<h3>Profile Info</h3>
							<p>Buddy Count: {1}</p>
							<p> Follower Count: [0] </p>
							<p> Winter Sports: {userInfo.snow_sports}</p>
							<p> Water Sports: {userInfo.water_sports}</p>
							<p> Land Sports: {userInfo.land_sports}</p>
							<p> Air Sports: {userInfo.air_sports}</p>
						</Container>
						</Col>

					</Row>

					<Row style={{ border: "2px solid black", backgroundColor: "darkgrey", width: "200%",paddingLeft: "5px"}}>
						<p style = {{paddingLeft: "10%",}}> About me: {userInfo.description}</p>

					</Row>
					{/* Row will hold all of the media and such that we grab from the api */}
					<Col style={{paddingLeft: "10%", border: '2px solid darkgrey'}}>
						<h2 style = {{border:"2px solid slategrey"}}>Content</h2>

						<container className="embed-responsive embed-responsive-16by9" style = {{justify: "center", width: "100%", paddingBottom: "40px", border: '2px solid slategrey'}}>
							<iframe title="Tour Video" className="embed-responsive-item"
									 src="https://www.youtube.com/embed/7a0hbT0QtSw" allowFullScreen > </iframe>

						</container>
						<container className="embed-responsive embed-responsive-16by9" style = {{justify: "center", width: "100%", paddingTop: "20%", border: '2px solid slategrey'}}>
							<iframe title="Prof vid2" className="embed-responsive-item"
									src="https://www.youtube.com/embed/m8aM2XVffaE" allowFullScreen > </iframe>

						</container></Col>
				</>
			);
		} else {
			return (
				<div>
					<h1 className="fa fa-spinner fa-spin" style={{position: 'absolute', left: '50%', top: '50%'}}>Loading! </h1>
				</div>

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
		if(this.state.userId >0)
		axios.get(`http://localhost:8000/users/${this.state.userId}`)
			.then(res => {
				this.setState({
					userInfo: res.data.users[0][0],
					userInfoLength: Object.keys(res.data.users[0][0]).length
				});

				//alert(JSON.stringify(res.data.users[0][0]))
			});

		else {

			axios.get(`http://localhost:8000/users/${0}`)
				.then(res => {
					this.setState({
						userInfo: res.data.users[0][0],
						userInfoLength: Object.keys(res.data.users[0][0]).length
					});
				})
			//window.location.reload();
		}
	}


}
