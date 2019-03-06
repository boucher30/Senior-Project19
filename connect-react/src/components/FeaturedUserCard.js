import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';

export default class FeaturedUserCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Card style={{width: '10rem'}}>
                <Card.Img variant="top" src={this.props.img}/>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        {this.props.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
