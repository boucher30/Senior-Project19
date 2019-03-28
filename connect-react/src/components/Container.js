import React, {Component} from 'react'
import Col from "react-bootstrap/Col";
import {Route, Switch} from 'react-router-dom';

import ProfilePage from "./ProfilePage";
import FeedPage from "./FeedPage";
import VenuePage from "./VenuePage";
import VenueListPage from "./VenueListPage";
import MessagesPage from "./MessagesPage";
import UsersPage from "./UsersPage";
import MessagesPageInbox from "./MessagesPageInbox"


export default class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.changeSel = this.changeSel.bind(this);
	}

	render() {
		return (
			<Col xs={10} style={{ textAlign: 'left', bordered: '0.5px solid rgba(0, 0, 0, 0.5)' }}>
				<Switch>
					{/* Remember to parse integer because the number is returned a string */}
					{/* Can be accessed by props.match.params.number in Profile Page.... */}
					<Route path="/dashboard/profile/:number" component={ProfilePage} />
					<Route path="/dashboard/feed" component={FeedPage} />
					<Route path="/dashboard/venues/:number" component={VenuePage} />
					<Route path = "/dashboard/venues" component={VenueListPage} />
					<Route path = "/dashboard/messages" component={MessagesPage} />
					<Route path = "/dashboard/messages/inbox" component={MessagesPageInbox} />
					<Route path = "/dashboard/messages/outbox" component={MessagesPage} />
					<Route path = "/dashboard/users" component={UsersPage} />

				</Switch>
			</Col>
		);
	}

	// Responsible for changing the selected component
	changeSel(name) {
		this.setState({ sel: name });
	}
}