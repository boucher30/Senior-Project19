import React from 'react'

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
			<a className="navbar-brand" href="/" style = {{color:'lightskyblue',
				textShadowColor: 'black',
				fontWeight:'bold',
				fontFamily: 'monospace'}}>Carve Connect
			</a>

				<div><i className="fa fa-map text-white"> </i></div>
		</nav>
	);
};

export default TopNav1;