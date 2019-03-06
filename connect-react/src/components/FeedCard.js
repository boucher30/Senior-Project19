import React from 'react';
import Card from 'react-bootstrap/Card';


const FeedCard = (props) => {
    return (
				<Card bg = 'dark' border = "dark" style={{ width: '18rem', marginLeft: '30%' }} >
					<Card.Img variant="top" src= {props.img} />
    				<Card.Body>
      					<Card.Text>  
						  <a href='/venue-profile' eventKey='venue-profile'> {props.text}</a>
						</Card.Text>
					</Card.Body>
				</Card>
    );
}

export default FeedCard;