import React, {Component} from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import SnowProfilePic from '../../../../images/snowboard-profile-pic.jpg';
import EditProfileModal from "./EditProfileModal";
import CarveCardUserCreate from "../../../../components/CarveCardUserCreate";
import CreateCarveModal from "../../../../components/CreateCarveModal";
import BuddyRequestModal from "../../../../components/BuddyRequestModal";


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
			show: false,
			show1: false,
			show2: false,
			buddies: 0,
			follows: 0
		};

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleClose2 = this.handleClose2.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
	}

	// Retrieves info before component is mounted to the DOM
	componentWillMount() {
		this.getUserInfo();
		this.getUserCounts();
	}

	handleClick = () => {
		this.setState({ show1: !this.state.show1 });
	};

	handleClick2 = () => {
		this.setState({ show2: !this.state.show2 });
	};


	onClick1 = () =>{

		axios.post('http://localhost:8000/follows', {
			user1: localStorage.getItem('userId'),
			user2: this.state.userInfo.user_id

		});
	};

	// We need to conditionally render things based on the user in relation to who is logged in
	render() {
		if(this.state.userInfoLength > 0) {
			const { userInfo, isUserLoggedIn } = this.state;
			const profilePrefix = isUserLoggedIn ? 'My ' : `${this.state.userInfo.username}'s `;

			// Make button options for top right corner
			let options;
			if(isUserLoggedIn) {
				options =
					<Row classname="justify-content-end" style ={{paddingTop:"15px"}}>
						<Button variant="info" onClick={this.handleShow}>Edit</Button>
				<Button onClick={this.handleClick} style={{ margin: '5px' }}>Create Carve</Button>
				</Row>
			} else {
				options = <div style={{display:'flex'}}>
					<Button style={{margin:'5px'}} variant="info" onClick = {this.onClick1}>Follow</Button>
					<Button style={{margin:'5px'}} variant="info" onClick = {this.handleClick2}>Add Buddy</Button>
				</div>;


			}

			return (
				<>
					<CreateCarveModal handleClose={this.handleClick} show={this.state.show1}/>
					<EditProfileModal handleRefresh={this.getUserInfo} user={userInfo} show={this.state.show} handleClose={this.handleClose} />
					<BuddyRequestModal id ={this.state.userInfo.user_id} show={this.state.show2} handleClose={this.handleClose2}/>
					<Row style={{paddingLeft:"20px"}}>
					<div style={{ display: 'flex', marginTop: '8px', border: "0px solid slategrey" }}>
						<h2 style={{ width: isUserLoggedIn ? '90%' : '80%' }}>{profilePrefix} Profile</h2>



					</div>
						<div >
							{options}</div>
					</Row>
					{/* This is the row that will hold the profile picture and the information */}
					<Row>

						<Col xs={4}>
							<Container style={{  border: "0px solid black" }}>

								<Image src={userInfo.photo} fluid />
							</Container>
						</Col>
						<Col xs={4}>
							<Container style={{ backgroundColor: "darkgrey", height: "100%", width:"100%",border: "0px double black"}} bordered>
								<h1> {userInfo.username}</h1>
								<h4> {userInfo.first_name} {userInfo.last_name}</h4>
								<p style={{flexDirection:'row'}} > <i className="fa fa-video-camera"> </i> {userInfo.type} </p>
								<p style = {{paddingLeft: "10%",}}> About me: {userInfo.description}</p>
							</Container>
						</Col>
						<Col xs={4}>
						<Container style={{ border: " 0px solid black", backgroundColor:'slategrey', width:"100%%", height: "100%" }}>
							<h3>Profile Info</h3>
							<p>Buddy Count: {this.state.buddies}</p>
							<p> Follower Count: {this.state.follows} </p>
							<p> Winter Sports: {userInfo.snow_sports}</p>
							<p> Water Sports: {userInfo.water_sports}</p>
							<p> Land Sports: {userInfo.land_sports}</p>
							<p> Air Sports: {userInfo.air_sports}</p>
						</Container>
						</Col>

					</Row>

				<Row>
					{/* Row will hold all of the media and such that we grab from the api */}
					<Col style={{paddingLeft: "10%", border: '0px solid darkgrey'}}>
						<h2 style = {{border:"0px solid slategrey"}}>Content</h2>
						<div>
						<container className="embed-responsive embed-responsive-16by9" style = {{ width: "100%", paddingBottom: "40px", border: '2px solid slategrey'}}>
							<iframe title="Tour Video" className="embed-responsive-item"
									 src="https://www.youtube.com/embed/7a0hbT0QtSw" allowFullScreen > </iframe>

						</container>
						</div>
						<div>                                                                                                    </div>
						<div>
						<container className="embed-responsive embed-responsive-16by9" style = {{ width: "100%", paddingTop: "20%", border: '2px solid slategrey'}}>
							<iframe title="Prof vid2" className="embed-responsive-item"
									src="https://www.youtube.com/embed/m8aM2XVffaE" allowFullScreen > </iframe>

						</container>
						</div>

					</Col>
					<Col style = {{width: "100%"}}>
						<Row>
							<h2>Carves created by user</h2></Row>
						<Row style = {{width:"100%"}}>
							<CarveCardUserCreate profile_id = {this.state.userId}style = {{width:"100%"}}/></Row></Col></Row>
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
	handleClose2() {
		this.setState({ show2: false });
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
	getUserCounts() {
		// Getting the user id from the url param

			axios.get(`http://localhost:8000/users/${this.state.userId}/follows/buddies`)
				.then(res => {
					this.setState({
						userInfo: res.data[0][0],
						buddies: Object.keys(res.data[0][0]).length
					});

					//alert(JSON.stringify(res.data.users[0][0]))
				});


			axios.get(`http://localhost:8000/users/${this.state.userId}/follows/followers`)
				.then(res => {
					this.setState({
						userInfo: res.data.users[0][0],
						follows: Object.keys(res.data[0][0]).length

					});
				})
			//window.location.reload();

	}

}
