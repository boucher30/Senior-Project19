import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'

const menuItems = {
	'My Profile': {href: `/dashboard/profile/${localStorage.getItem('userId')}`},
	'My Feed': {href: '/dashboard/feed'},
	'My Messages': {href: '/dashboard/messages/ '},
	'Venues': {href: '/dashboard/venues'},
	'Users': {href: '/dashboard/users'},
	'Explore': {href: '/dashboard/explore'}
};

const SideMenu = () => {
	let listItems;

	// Make a group of the list items from obj in state
	listItems = Object.keys(menuItems).map((name, index) => {
		// Make a list group item that when clicked, changes the sel field in state
		return (
			<ListGroup.Item key={index} action href={menuItems[name].href}>
				{name}
			</ListGroup.Item>
		)
	});

	return (
		<>
			{/* First column that holds the menu items */}
			<Col xs={2} style={{ paddingRight: '0px' }}>
				<ListGroup variant="flush" defaultActiveKey="1">
					{listItems}
				</ListGroup>
			</Col>
		</>
	);
};

export default SideMenu;