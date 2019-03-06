import React, {Component} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfilePage from "./ProfilePage";
import FeedPage from "./FeedPage";
import ConnectionPage from "./ConnectionPage";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sel: 'My Connections',
			options: {
				'My Profile': <ProfilePage/>,
				'My Connections': <ConnectionPage/>,
				'My Feed': <FeedPage/>
			}
		}

		this.changeSel = this.changeSel.bind(this);
	}

	render() {
		let listItems;
		const options = this.state.options;
		const component = options[this.state.sel];

		// Make a group of the list items from obj in state
		listItems = Object.keys(options).map((name, index) => {
			// Make a list group item that when clicked, changes the sel field in state
			return (
				<ListGroup.Item key={index} action href={'#' + (index+1)} onClick={() => { this.changeSel(name) }}>
					{name}
				</ListGroup.Item>
			)
		});

		return (
			<Row style={{ height: '93vh' }}>


				{/* First column that holds the menu items */}
				<Col xs={2} style={{ paddingRight: '0px' }}>
					<ListGroup variant="flush" defaultActiveKey="#2">
						{listItems}
						<ListGroup.Item action href="#link3" onClick={() => { console.log('We clicked a button! Lets go to the api...'); }}>
							This one is a button
						</ListGroup.Item>
					</ListGroup>
				</Col>


				{/* Second column that holds the page */}
				<Col xs={10} style={{ textAlign: 'left', borderLeft: '0.5px solid rgba(0, 0, 0, 0.5)' }}>
					{component}
				</Col>
			</Row>
		)
	}

	// Responsible for changing the selected component
	changeSel(name) {
		this.setState({ sel: name });
	}
}