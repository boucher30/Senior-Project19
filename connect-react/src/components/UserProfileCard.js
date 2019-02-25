import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Avatar from '../images/avatar-man.png'

const UserProfileCard = (props) => {
	return (
		<Row style={{
			padding: '15px 0px',
			maxWidth: '1000px',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
			marginBottom: '20px'
		}}>
			{/* This column is for the users image */}
			<Col xs="auto">
				<Image style={{ height: '128px' }} src={Avatar} rounded />
			</Col>

			{/* This Column is for user info */}
			<Col xs="auto">
				<Row style={{ paddingTop: '30px' }}>
					<h5>{props.user.first_name} {props.user.last_name}</h5>
				</Row>
				<Row>
					<p><em>Username:</em> {props.user.username}</p>
				</Row>
			</Col>
		</Row>
	);
}

export default UserProfileCard;