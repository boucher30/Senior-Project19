import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Row from "react-bootstrap/Row";
import axios from "axios";
import pic1 from "../../images/snow.jpeg"
import Image from 'react-bootstrap/Image'

class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buddies:[] ,
			user_Id2: 0
		};

	}




	componentWillMount() {
		axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}/follows/buddies`)
			.then(res => {
				// console.log("results: ", res.data.results[0]);
				//alert("Buddy list:"+ JSON.stringify(res.data.results[0][0].user_Id2));
				this.setState({
					buddies: res.data.results[0]
				});
			});
	}


	render() {



		const menuItems = {
			'My Profile': {href: `/dashboard/profile/${localStorage.getItem('userId')}`},
			'My Messages': {href: '/dashboard/inbox/ '},
			'Venues': {href: '/dashboard/venues'},
			'Users': {href: '/dashboard/users'},
			'Explore': {href: '/dashboard/explore'},
			'My Feed': {href: '/dashboard/feed'},
			'Listings': {href: '/dashboard/listings'}
		};

		let listItems;

		// Make a group of the list items from obj in state
		listItems = Object.keys(menuItems).map((name, index) => {
			// Make a list group item that when clicked, changes the sel field in state
			return (
				<ListGroup.Item key={index} action href={menuItems[name].href} style={{
					backgroundColor: "slategrey", color: "white", fontWeight: 'bold',
					fontFamily: 'monospace', paddingRight: '0px'
				}}>
					{name}
				</ListGroup.Item>
			)
		});

		let buddiesList;

		if(this.state.buddies.length > 0) {
			buddiesList = this.state.buddies.map((buddy, index) => {
				return (
					<ListGroup.Item key={index} action href={`/dashboard/profile/${this.state.buddies[index].user_id2}`} style={{
						backgroundColor: "seashell", color: "green",
						fontFamily: 'monospace', paddingRight: '0px',width:"100%"
					}}>
						{"username "+this.state.buddies[index].user_id2} <Image src={pic1} roundedCircle style = {{width:"20px",height:"20px"}}/>
					</ListGroup.Item>
				)
			});
		}
		return (
			<>
				{/* First column that holds the menu items */}
				<Col xs={1} style={{paddingRight: '0px', backgroundColor: "slategrey"}}>
					<Row>
						<ListGroup variant="flush" defaultActiveKey="1">
							{listItems}
						</ListGroup>
					</Row>
					<Row style={{paddingBottom:"0px"}}>
						<h5 style={{
							color: "black", paddingLeft: "10%", fontWeight: 'bold',
							fontFamily: 'monospace', paddingTop:"10%", backgroundColor:"seashell", width: "90%", paddingBottom:"0px"
						}}>Buddy List</h5>
					</Row>
					<Row style={{paddingTop: "0px"}}>

						<ListGroup variant="flush" defaultActiveKey="1" style ={{paddingTop:"0px"}}>
							{buddiesList}
						</ListGroup>
					</Row>
				</Col>
			</>
		);
	};
}

export default SideMenu;