import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const TopNav = () => {
	return (
		<Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
			<div className="container">
				<Navbar.Brand href="#home">Carve Connect</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<NavDropdown title="Upload Content" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Upload Picture</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Upload Video</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated Action Item</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link href="#deets">More deets</Nav.Link>
						<Nav.Link eventKey={2} href="#memes">
							Dank memes
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
}

export default TopNav;