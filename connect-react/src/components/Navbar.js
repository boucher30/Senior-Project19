import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const TopNav = () => {
	return (
		<nav className="navbar navbar-dark bg-dark">
			<a className="navbar-brand" href="/">Carve Connect</a>
			<Nav>

				<span>
				<ul className="nav justify-content-end">
					<li className="nav-item">
						<a className="nav-link active" href={'/logout'}>Logout</a>
					</li>

				</ul>
				</span>
			</Nav>

		</nav>
	);
};

export default TopNav;