import React, {Component} from 'react'
import Col from "react-bootstrap/Col";
import {Route, Switch} from 'react-router-dom';


import ListingPage from "./SubPages/ListingPage/ListingPage";

import FeedPage from "./SubPages/Feed/FeedPage";
import VenuePage from "./SubPages/Venues/VenuePage";
import VenueListPage from "./SubPages/Venues/VenueListPage";
import MessagesPage from "./SubPages/Messages/MessagesPage";
import UsersPage from "./SubPages/UserSearch/UsersPage";
import MessagesPageInbox from "./SubPages/Messages/MessagesPageInbox";
import ProfilePage from "./SubPages/Profile/ProfilePage";
import MessagesPageOutbox from "./SubPages/Messages/MessagesPageOutbox";
import NotificationsPage from "./SubPages/Notifications/NotificationsPage";
import NotificationsPageInbox from "./SubPages/Notifications/NotificationsPageInbox";
import NotificationsPageOutbox from "./SubPages/Notifications/NotificationsPageOutbox";

export default class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.changeSel = this.changeSel.bind(this);
	}

	render() {
		return (
			<Col xs={10} style={{ textAlign: 'left', bordered: '0.5px solid rgba(0, 0, 0, 0.5)' }}>
				<Switch >
					{/* Remember to parse integer because the number is returned a string */}
					{/* Can be accessed by props.match.params.number in Profile Page.... */}
					<Route path="/dashboard/profile/:number" component={ProfilePage} />
					<Route path="/dashboard/venues/:number" component={VenuePage} />
					<Route path = "/dashboard/venues" component={VenueListPage} />
					<Route path = "/dashboard/messages" component={MessagesPage} />
					<Route path = "/dashboard/notifications" component={NotificationsPage} />
					<Route path = "/dashboard/notinbox" component={NotificationsPageInbox} />
					<Route path = "/dashboard/notoutbox" component={NotificationsPageOutbox} />
					<Route path = "/dashboard/inbox" component={MessagesPageInbox} />
					<Route path = "/dashboard/outbox" component={MessagesPageOutbox} />
					<Route path = "/dashboard/feed" component={FeedPage} />
					<Route path = "/dashboard/users" component={UsersPage} />
					<Route path = "/dashboard/listings" component={ListingPage} />
				</Switch>
			</Col>
		);
	}

	// Responsible for changing the selected component
	changeSel(name) {
		this.setState({ sel: name });
	}
}