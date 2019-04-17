import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import CustomFormGroup from "./CustomFormGroup";
import CarveAttendRequestModal from "./CarveAttendRequestModal";
import CarveInviteModal from "./CarveInviteModal";
import MediaGroup from './MediaGroup';


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
            carveAt1: {},
            carveComm: {},
            carveMed: {},
            carveLik: {},
            carveDlik: {},
            completed: 0,
            sports: "",
            create_time: "",
            show5: false,
            show6: false,
            currentCid: 0,
            curCr:0,
            cId:0,
            cRe:0
        };
    }

    componentWillMount() {
        axios.get(`http://localhost:8000/users/${this.props.profile_id}/carves/`)
            .then(res => {
                // console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveInfo: res.data.results[0]
                });

            });
        //currently only gets attendees for carve1. not dynamic per carve
        axios.get(`http://localhost:8000/comments`)
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));
                // console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveComm: res.data.results[0]
                });

            });

        //currently only gets attendees for carve1. not dynamic per carve
        axios.get(`http://localhost:8000/media`)
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));
                // console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveMed: res.data.results[0]
                });

            });

        //currently =dynamic per carve
        axios.get(`http://localhost:8000/carveAt`)
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));
                // console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveAt1: res.data.results
                });

            });


        //currently only gets attendees for carve1. not dynamic per carve
        axios.get(`http://localhost:8000/carves/${1}/likes`)
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));
                // console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveLik: res.data.results[0]
                });

            });


        //currently only gets attendees for carve1. not dynamic per carve
        axios.get(`http://localhost:8000/carves/${1}/likes/dislike`)
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));
                // console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));
                this.setState({
                    carveDlik: res.data.results[0]
                });

            });
    }

    like(e){
        //currently only gets attendees for carve1. not dynamic per carve
        axios.post(`http://localhost:8000/carves/${1}/likes`,
            {
                poster: localStorage.getItem('userId'),
                carve : e
            })
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));
                console.log("results: ", res.data.results[0]);
                //alert(JSON.stringify(res.data.results[0]));


            });
    }

    dislike = (e) =>{
        //currently only gets attendees for carve1. not dynamic per carve
        axios.post(`http://localhost:8000/carves/${1}/likes/dislikes`,
            {
                poster: localStorage.getItem('userId'),
                carve : e
            })
            .then(res => {
                //alert("carve:" + JSON.stringify(res.data.results));

                //alert(JSON.stringify(res.data.results[0]));
                this.setState({

                });

            });
    };
    handleClick5 = (e,e2) => {

        this.setState({ show5: !this.state.show5,
            cId : e,
            cRe:e2
        });
    };

    handleClick6 = (e1) => {

        this.setState({ show6: !this.state.show6,
            cId : e1});

    };



    render() {
        let carveList;
        let carveAttendList;
        let carveComments;
        let carveMedia;
        //let currentCarve =0;

        let color = "grey";
        let act = "secondary";
        let no = "not";
        let att = <div></div>;
        let val;
        if (this.state.carveInfo.length > 0) {
            carveList = this.state.carveInfo.map((carve, index) => {
                let lik =0;
                let dlik =0;


                if (this.state.carveAt1.length > 0) {
                    carveAttendList = this.state.carveAt1[0].map((attender, index1) => {

                        if(attender.carve === carve.carve_id)
                            return (
                                <ListGroup.Item key={index1} style={{fontFamily: 'monospace', paddingRight: '0px', width: "100%"}}>
                                    {attender.user} {attender.type}
                                </ListGroup.Item>
                            );
                        else
                            return(<></>)
                    });
                }

                if (this.state.carveComm.length > 0) {
                    carveComments = this.state.carveComm.map((com, index) => {
                        if(com.carve === carve.carve_id)
                            return (
                                <ListGroup.Item key={index} style={{fontFamily: 'monospace', paddingRight: '0px', width: "100%"}}>
                                    {com.comment} by: {com.poster}
                                </ListGroup.Item>
                            );
                        else
                            return(<></>)
                    });
                }
                if (this.state.carveMed.length > 0) {
                    carveMedia = this.state.carveMed.map((med, index) => {
                        if(med.carve === carve.carve_id)
                            return (

                                <ListGroup.Item key={index} style={{

                                    fontFamily: 'monospace', paddingRight: '0px', width: "100%"
                                }}>
                                    <Row>Media Post:</Row>
                                    <Row><iframe title="Prof vid2" className="embed-responsive-item"
                                                 src={med.url} allowFullScreen > </iframe></Row>


                                </ListGroup.Item>
                            );
                        else
                            return(<></>)
                    });
                }

                if(carve.completed >0) {
                    color = "seagreen";
                    act = "Carve Completed";
                    no = "Completed";
                    att = <div></div>;
                }
                else {
                    color = "lightskyblue";
                    act = "Invite Buddy";
                    no = "Upcoming";
                    att =<Button variant="info" style = {{ paddingTop:"10px"}} onClick = {() => this.handleClick6(carve.carve_id)} >{act}</Button>;

                }

                return (

                    <ListGroup.Item key={index} style={{

                        fontFamily: 'monospace', paddingRight: '0px', paddingLeft: '0px',paddingTop: '0px',paddingBottom: '10px', width: "100%"
                    }}>
                        <CarveAttendRequestModal cid ={this.state.cId} cre = {this.state.cRe} handleClose={this.handleClick5} show={this.state.show5} />
                        <CarveInviteModal cid ={this.state.currentCid} handleClose={this.handleClick6} show={this.state.show6} />
                        <Card style = {{width: '100%', backgroundColor: [color]}}>
                            <Card.Header style = {{color:"navy"}}>
                                <Row style = {{justify: 'space-between'}}>
                                    <Card.Title>Name: {carve.name}</Card.Title>
                                    <div style = {{margin: '15px', marginLeft: '20%'}}>Date: {carve.date}</div>
                                    <h6 style = {{margin: '15px', marginLeft: '20%'}}>Type: {carve.type}</h6>

                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>

                                        <Card.Text style = {{}}>
                                            <Row>
                                                Carve is {no}
                                            </Row>

                                            <Row style = {{position: 'left'}} >
                                                <h5>Location: {carve.venue}</h5>

                                            </Row>
                                            <Row><p>Creator: {carve.creator}</p></Row>
                                            <Row>
                                                Description: {carve.description}
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
                                            <Row>

                                            </Row>
                                            <Row>

                                            </Row>

                                        </Card.Text>
                                    </Col>
                                    <Col>
                                        <h3>Attendees:</h3>
                                        {carveAttendList}</Col></Row>
                                <Row style = {{paddingTop:"5%",bordered:"5px solid black"}}>
                                    <Col>
                                        {att}

                                    </Col>
                                    <Col><box style = {{color:"red", paddingTop:"10px"}}><i className ="fa fa-thumbs-o-down text-danger"  /> Dislikes: {dlik}</box></Col>
                                    <Col><box style = {{color:"blue", paddingTop:"10px"}}><i className ="fa fa-hand-rock-o " style = {{color:"blue"}} /> Likes: {lik}</box></Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="text-primary text-info">
                                <Row>
                                    <Col>
                                        <Row style={{width:"100%"}}>				<Form inline style ={{justify:"left"}} >
                                            <CustomFormGroup value = {val} type="integer" placeholder="Add Comment" className=" mr-sm-2" controlId ="comment"   style ={{height:"40px",width:"150%"}}/>
                                            <Button type="submit" href = {''} style = {{ justify:"left",color: "white", height:"45px", paddingBottom:"5px"}} rounded>Comment</Button>

                                        </Form></Row>
                                        <Row>{carveComments}</Row>

                                    </Col>
                                    <Col>
                                    {carveMedia}
                                    {/* <MediaCard type = "carves" content_id = {this.props.carveId}/> */}
                                    </Col>


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
