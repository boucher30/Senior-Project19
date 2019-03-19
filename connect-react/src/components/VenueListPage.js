import React, {Component} from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import VenueFigure from './VenueFigure';


export default class VenueListPage extends Component {
    //I think i'll need the state information based on the future filtering options
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Container>
                <Row>
                    <h1>Venues</h1>

                </Row>

                <Row>
                    <VenueFigure name = "Mount Snow"/>
                </Row>
            </Container>
        );
    }
}
