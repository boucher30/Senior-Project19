import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const TopNav = () => {
	return (
		<Navbar bg="dark" variant="dark" sticky = 'top'>
			<Navbar.Brand href="/">Carve Connect</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/dashboard/venues">Venues</Nav.Link>
				<Nav.Link href="#sports">Sports</Nav.Link>
			</Nav>
			<Nav className="justify-content-end">
				<Nav.Item>
					<Nav.Link href={'/login'} eventKey="login">Login</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="/sign-up" eventKey="sign-up">Sign Up</Nav.Link>
				</Nav.Item>
			</Nav>
		</Navbar>
	);
};

export default TopNav;