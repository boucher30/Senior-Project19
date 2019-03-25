import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const TopNav = () => {
	return (
		<Navbar bg="dark" variant="dark" sticky = 'top'>
			<Navbar.Brand href="/">Carve Connect</Navbar.Brand>


			<Nav className="justify-content-end">
				<Nav.Item>
					<Nav.Link href={'/logout'} eventKey="logout">logout</Nav.Link>
				</Nav.Item>
			</Nav>
		</Navbar>
	);
};

export default TopNav;