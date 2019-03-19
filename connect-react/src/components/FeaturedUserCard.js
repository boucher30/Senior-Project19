import React from 'react';
import Card from 'react-bootstrap/Card';

const FeaturedUserCard = (props) => {
    return(
      <Card style={{ width: '15rem', marginTop: '10px', marginBottom: '30px' }}>
          <Card.Img variant="top" src={props.img} />
          <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text>
                  {props.text}
              </Card.Text>
          </Card.Body>
      </Card>
    );
};

export default FeaturedUserCard;
