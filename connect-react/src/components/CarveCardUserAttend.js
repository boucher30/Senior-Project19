import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';


export default class CarveCardUserAttend extends Component {
    constructor(props) {
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

    componentWillMount() {
        axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}/carveAttendees`)
            .then(res => {
                console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveInfo: res.data.results[0]
                });

            });

    }

    render() {
        let carveList;
        let color = "grey";
        let act = "secondary";
        let no = "not";
        let attend = <div></div>;
        if (this.state.carveInfo.length > 0) {
            carveList = this.state.carveInfo.map((carve, index) => {
                if(carve.completed >0) {
                    color = "seagreen";
                    act = "Carve Completed";
                    no = "Completed";
                    attend = <div></div>;
                }
                else {
                    color = "grey";
                    act = "Request to Attend";
                    no = "Upcoming";
                    //attend =<Button variant="info"  >{act}</Button>;
                }
                return (

                    <ListGroup.Item key={index} style={{

                        fontFamily: 'monospace', paddingRight: '0px', width: "100%"
                    }}>

                        <Card style = {{width: '60%', backgroundColor: [color]}}>
                            <Card.Header style = {{color:"navy"}}>Carve is {no}
                                <Row style = {{justify: 'space-between'}}>
                                    <Col style = {{position: 'left',margin: '15px', marginBottom: '-15px'}} >
                                        <h5>Location: {carve.venue}</h5>
                                        <p>Creator: {carve.creator}</p>
                                    </Col>
                                    <Col style = {{position: 'right'}}>
                                        <h6 style = {{margin: '15px', marginLeft: '200px'}}>Type: {carve.type}</h6>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Name: {carve.name}</Card.Title>
                                <Card.Text style = {{marginLeft: '30px'}}>
                                    <Row>
                                        Description: {carve.description} All carves created with null description for now....
                                    </Row>
                                    <Row>
                                        Date: {carve.date}
                                    </Row>
                                    <Row>
                                        Sports: {carve.sports} {/*can't do sports by itself */}
                                    </Row>
                                    <Row>
                                        Max Athletes: {carve.max_athletes}
                                    </Row>
                                    <Row>
                                        Max Film: {carve.max_photo}
                                    </Row>

                                </Card.Text>
                                <Row>
                                    <Col>
                                        {attend}

                                    </Col>


                                </Row>
                            </Card.Body>
                            <Card.Footer className="text-muted text-center">Created: {carve.create_time}</Card.Footer>
                        </Card>











                    </ListGroup.Item>
                )
            });
        }

        return (
            <>

                <ListGroup variant="flush" defaultActiveKey="1" style ={{paddingTop:"20px",width:"100%"}}>
                    {carveList}
                </ListGroup>

            </>
        )
    };
}

