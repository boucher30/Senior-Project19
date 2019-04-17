import React, {Component} from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SnowProfilePic from '../../../../images/snowboard-profile-pic.jpg';
import CreateCarveModal from "../../../../components/CreateCarveModal";
import BuddyRequestModal from "../../../../components/BuddyRequestModal";
import MediaGroup from "../../../../components/MediaGroup";
import ProfileInfoCard from './ProfileInfoCard';
import CardColumns from 'react-bootstrap/CardColumns';


export default class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.match.params.number,
			userInfo: {},
			userInfoLength: 0,
			isUserLoggedIn: props.match.params.number === props.id,
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
		//this.getUserCounts();
	}

	handleClick = () => {
		this.setState({ show1: !this.state.show1 });
	};

	handleClick2 = () => {
		this.setState({ show2: !this.state.show2 });
	};


	onClick1 = () =>{

		axios.post('http://localhost:8000/follows', {
			user1: this.state.isUserLoggedIn,
			user2: this.state.userId

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
						<Button onClick={this.handleClick} style={{ marginLeft: '50px', marginTop: '-7px' }}>Create Carve</Button>
					</Row>
			} else {
				options = 
					<div style={{display:'flex'}}>
						<Button style={{margin:'5px'}} variant="info" onClick = {this.onClick1}>Follow</Button>
						<Button style={{margin:'5px'}} variant="info" onClick = {this.handleClick2}>Add Buddy</Button>
					</div>;


			}

			return (
				<>
					<CreateCarveModal handleClose={this.handleClick} show={this.state.show1}/>
					<BuddyRequestModal id ={this.state.userInfo.user_id} show={this.state.show2} handleClose={this.handleClose2}/>
					<Row style={{marginLeft: "3%", marginTop: '2%', marginBottom: '2%'}}>
						<div style={{ display: 'flex', marginTop: '8px', border: "0px solid slategrey" }}>
							<h2>{profilePrefix} Profile</h2>
						</div>
						<div >
							{options}
						</div>
					</Row>

					
				{/* This is the row that will hold the profile picture and the information */}
				<div>
					<ProfileInfoCard loggedIn={isUserLoggedIn} handleShow={this.handleShow} close={this.handleClose} show={this.state.show} refresh= {this.getUserInfo} user={userInfo} firstName={userInfo.first_name} lastName={userInfo.last_name} img={this.state.pic} id = {isUserLoggedIn} username={userInfo.username} description={userInfo.description} type={userInfo.type} snow={userInfo.snow_sports} water={userInfo.water_sports} land={userInfo.land_sports}/>
				</div>

				<Row>
					{/* Row will hold all of the media and such that we grab from the api */}
					<Col style = {{marginLeft: "3%", marginTop: '2%', marginBottom: '2%'}}>
						<h2 >My Media</h2>
						<CardColumns>
							<MediaGroup type = "profile" content_id = {this.state.userId}/>
						</CardColumns>                                                                                                 

					</Col>
					{/* <Col style = {{width: "100%"}}>
						<Row>
							<h2>Carves created by user</h2></Row> */}
						{/* <Row style = {{width:"100%"}}>
							<CarveCardUserCreate profile_id = {this.state.userId} style = {{width:"100%"}}/>
						</Row>
					</Col> */}
				</Row>
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
						userInfoLength: Object.keys(res.data.users[0][0]).length,
						//pic: this.state.userInfo.photo
					});

					//alert(JSON.stringify(res.data.users[0][0]))
				});
		else {

			axios.get(`http://localhost:8000/users/${0}`)
				.then(res => {
					this.setState({
						userInfo: res.data.users[0][0],
						userInfoLength: Object.keys(res.data.users[0][0]).length,
						//pic: this.state.userInfo.photo
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
						buddies: res.data[0][0].length,

					});

					//alert(JSON.stringify(res.data.users[0][0]))
				});


			axios.get(`http://localhost:8000/users/${this.state.userId}/follows/followers`)
				.then(res => {
					this.setState({
						userInfo: res.data.users[0][0],
						follows: res.data[0][0].length

					});
				})
			//window.location.reload();

	}

}
