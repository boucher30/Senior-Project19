import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';


export default class CarveCard extends Component  {
    constructor(props){
        super(props);
        this.state = {
            carveId: 0,
            name: "",
            creator: 0,
            venue: 0,
            type: "",
            max_athletes: 0,
            max_photo: 0,
            description: null,
            date: "",
            carveInfo: {},
            completed: 0,
            sports: "",
            create_time: ""
        };
    }

    componentWillMount()
    {
        axios.get(`http://localhost:8000/carves/1`)
            .then(res => {
                console.log("results: ", res.data.results[0]);
                this.setState({
                    carveInfo: res.data.results[0][0]
                });

            });

    }

    render(){
        const {carveInfo} = this.state;
        return (
            <Card style = {{width: '60%'}}>
                <Card.Header>
                    <Row style = {{justify: 'space-between'}}>
                        <Col style = {{position: 'left',margin: '15px', marginBottom: '-15px'}} >
                            <h5>Location: {carveInfo.venue}</h5>
                            <p>Creator: {carveInfo.creator}</p>
                        </Col>
                        <Col style = {{position: 'right'}}>
                            <h6 style = {{margin: '15px', marginLeft: '200px'}}>Type: {carveInfo.type}</h6>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Name: {carveInfo.name}</Card.Title>
                    <Card.Text style = {{marginLeft: '30px'}}>
                        <Row>
                            Description: {carveInfo.description} yerrrrr
                        </Row>
                        <Row>
                            Date: {carveInfo.date}
                        </Row>
                        <Row>
                             Sports: {carveInfo.snow_sports} {/*can't do sports by itself */}
                        </Row>
                        <Row>
                             Max Athletes: {carveInfo.max_athletes}
                        </Row>
                        <Row>
                             Max Film: {carveInfo.max_photo}
                        </Row>
                        
                    </Card.Text>
                    <Row>
                        <Col>
                            <Button variant="primary">Request</Button>
                        </Col>

                        <Col>
                            <Button variant="primary">Invite buddy</Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted text-center">Created: {carveInfo.create_time}</Card.Footer>
            </Card>
        );
    }
};