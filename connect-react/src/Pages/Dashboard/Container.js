import React, { Component } from 'react'
import Col from "react-bootstrap/Col";
import { Switch, Route } from 'react-router-dom';

import ProfilePage from "./SubPages/Profile/ProfilePage";
import FeedPage from "./SubPages/Feed/FeedPage";
import VenuePage from "./SubPages/Venues/VenuePage";
import VenueListPage from "./SubPages/Venues/VenueListPage";

export default class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.changeSel = this.changeSel.bind(this);
	}

	render() {
		return (
			<Col xs={10} style={{ textAlign: 'left', borderLeft: '0.5px solid rgba(0, 0, 0, 0.5)' }}>
				<Switch>
					{/* Remember to parse integer because the number is returned a string */}
					{/* Can be accessed by props.match.params.number in Profile Page.... */}
					<Route path="/dashboard/profile/:number" component={ProfilePage} />
					<Route path="/dashboard/feed" component={FeedPage} />
					<Route path="/dashboard/venues/:number" component={VenuePage} />
					<Route path = "/dashboard/venues" component={VenueListPage} />
				</Switch>
			</Col>
		);
	}

	// Responsible for changing the selected component
	changeSel(name) {
		this.setState({ sel: name });
	}
}