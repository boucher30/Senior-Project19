import React from 'react'
import {Link} from "react-router-dom";
import Col from 'react-bootstrap/Col';

const TopNav1 = () => {
	/*var styles = {
		color:'darkblue',
		backgroundColor:'darkslategrey',
		textShadowColor: 'black',
		fontWeight:'bold',
		fontFamily: 'monospace'
	};*/

	return (
		<nav className="navbar navbar-dark bg-dark">
			<Col>
			<a className="navbar-brand" href = "/" style = {{color:'lightskyblue',
				textShadowColor: 'black',
				fontWeight:'bold',
				fontFamily: 'monospace'}}>Carve Connect
			</a>
			</Col>
						<Col>
							<div>
							<Link className ="Button" to = '/login' variant="dark" size="lg">Login</Link>
						</div>
						</Col>

						<Col>
							<div>
							<Link className ="Button" to = '/sign-up' variant="dark" size="lg">Sign Up</Link>
							</div>
						</Col>


		</nav>
	);
};

export default TopNav1;