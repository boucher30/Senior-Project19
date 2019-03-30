import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';


export default class CarveCardUserCreate extends Component {
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
            carveAtten: {},
            carveComm: {},
            carveMed: {},
            completed: 0,
            sports: "",
            create_time: ""
        };
    }

    componentWillMount() {
        axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}/carves/`)
            .then(res => {
                console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveInfo: res.data.results[0]
                });

            });

        //currently only gets attendees for carve1. not dynamic per carve
        axios.get(`http://localhost:8000/carves/${1}/comments`)
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));
                console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveComm: res.data.results[0]
                });

            });

        //currently only gets attendees for carve1. not dynamic per carve
        axios.get(`http://localhost:8000/carves/${1}/media`)
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));
                console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveMed: res.data.results[0]
                });

            });

        //currently only gets attendees for carve1. not dynamic per carve
        axios.get(`http://localhost:8000/carves/${1}/carveAttendees`)
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));
                console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveAtten: res.data.results[0]
                });

            });
    }

    render() {
        let carveList;
        let carveAttendList;
        let carveComments;
        let carveMedia;
        let color = "grey";
        let act = "secondary";
        let no = "not";
        let att = <div></div>;
        if (this.state.carveInfo.length > 0) {
            carveList = this.state.carveInfo.map((carve, index) => {



                if (this.state.carveAtten.length > 0) {
                    carveAttendList = this.state.carveAtten.map((attender, index) => {
                        return (

                            <ListGroup.Item key={index} style={{

                                fontFamily: 'monospace', paddingRight: '0px', width: "100%"
                            }}>
                                Carve Attendee: {attender.user} userId

                            </ListGroup.Item>
                        );
                    });
                }

                if (this.state.carveComm.length > 0) {
                    carveComments = this.state.carveComm.map((com, index) => {
                        return (

                            <ListGroup.Item key={index} style={{

                                fontFamily: 'monospace', paddingRight: '0px', width: "100%"
                            }}>
                                Carve Comment: {com.comment} userId

                            </ListGroup.Item>
                        );
                    });
                }
                if (this.state.carveMed.length > 0) {
                    carveMedia = this.state.carveMed.map((med, index) => {
                        return (

                            <ListGroup.Item key={index} style={{

                                fontFamily: 'monospace', paddingRight: '0px', width: "100%"
                            }}>
                                Carve Media: 							<iframe title="Prof vid2" className="embed-responsive-item"
                                                                                src={med.url} allowFullScreen > </iframe>

                            </ListGroup.Item>
                        );
                    });
                }

                if(carve.completed >0) {
                    color = "seagreen";
                    act = "Carve Completed";
                    no = "Completed";
                    att = <div></div>;
                }
                else {
                    color = "grey";
                    act = "Request to Attend";
                    no = "Upcoming";
                    att =<Button variant="info"  >{act}</Button>;
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
                                <Row>
                                    <Col>
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
                                    </Col>
                                    <Col>
                                        <h3>Attendees:</h3>
                                        {carveAttendList}</Col></Row>
                                <Row>
                                    <Col>
                                        {att}

                                    </Col>


                                </Row>
                            </Card.Body>
                            <Card.Footer className="text-primary text-info">Carve Card 1.0
                                <Row>
                                    <Col>{carveComments}</Col>
                                    <Col>{carveMedia}</Col>


                                </Row>

                            </Card.Footer>
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

