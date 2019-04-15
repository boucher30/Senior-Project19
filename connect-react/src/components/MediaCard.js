import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import CustomFormGroup from "./CustomFormGroup";
import FormGroup from 'react-bootstrap/FormGroup';
import Table from 'react-bootstrap/Table';



export default class MediaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            media_id: 0,
            poster: 0,
            carve: 0, 
            profile: 0,
            venue: 0,
            url: "",
            mediaInfo: {},
            description: "", 
            time: "",
            mediaInfoLength: 0
        };


    }

    componentWillMount() {
            axios.get(`http://localhost:8000/users/${this.props.profile_id}/media/`)
                .then(res => {
                    this.setState({
                        mediaInfo: res.data.results[0][0],
                        mediaInfoLength: Object.keys(res.data.results[0][0]).length
                    });
                });







    //     axios.get(`http://localhost:8000/carves/open`)
    //         .then(res => {
    //             console.log("results: ", res.data.results[0]);
    //             //alert(JSON.stringify(res.data.results[0]));
    //             this.setState({
    //                 carveInfo: res.data.results[0]
    //             });

    //         });
    //     //currently only gets attendees for carve1. not dynamic per carve
    //     axios.get(`http://localhost:8000/comments`)
    //         .then(res => {
    //             //alert("carve:" + JSON.stringify(res.data.results));
    //             console.log("results: ", res.data.results[0]);
    //             //alert(JSON.stringify(res.data.results[0]));
    //             this.setState({
    //                 carveComm: res.data.results[0]
    //             });

    //         });

    //     //currently only gets attendees for carve1. not dynamic per carve
    //     axios.get(`http://localhost:8000/media`)
    //         .then(res => {
    //             //alert("carve:" + JSON.stringify(res.data.results));
    //             console.log("results: ", res.data.results[0]);
    //             //alert(JSON.stringify(res.data.results[0]));
    //             this.setState({
    //                 carveMed: res.data.results[0]
    //             });

    //         });

    //     //currently =dynamic per carve
    //     axios.get(`http://localhost:8000/carveAt`)
    //         .then(res => {
    //             //alert("carve:" + JSON.stringify(res.data.results));
    //             console.log("results: ", res.data.results[0]);
    //             //alert(JSON.stringify(res.data.results[0]));
    //             this.setState({
    //                 carveAt1: res.data.results
    //             });

    //         });


    //     //currently only gets attendees for carve1. not dynamic per carve
    //     axios.get(`http://localhost:8000/likes`)
    //         .then(res => {
    //             //alert("carve:" + JSON.stringify(res.data.results));
    //             console.log("results: ", res.data.results[0]);
    //             //alert(JSON.stringify(res.data.results[0]));
    //             this.setState({
    //                 carveLik: res.data.results[0]
    //             });

    //         });


    //     //currently only gets attendees for carve1. not dynamic per carve
    //     axios.get(`http://localhost:8000/likes/dislikes`)
    //         .then(res => {
    //             //alert("carve:" + JSON.stringify(res.data.results));
    //             console.log("results: ", res.data.results[0]);
    //             //alert(JSON.stringify(res.data.results[0]));
    //             this.setState({
    //                 carveDlik: res.data.results[0]
    //             });

    //         });

    // }

    // like(e){
    //     this.preventDefault(e);
    //     //currently only gets attendees for carve1. not dynamic per carve
    //     axios.post(`http://localhost:8000/carves/${1}/likes`,
    //         {
    //             poster: localStorage.getItem('userId'),
    //             carve : e
    //         })
    //         .then(res => {
    //             //alert("carve:" + JSON.stringify(res.data.results));
    //             console.log("results: ", res.data.results[0]);
    //             //alert(JSON.stringify(res.data.results[0]));


    //         });
    // }

    // dislike = (e) =>{
    //     this.preventDefault(e);
    //     //currently only gets attendees for carve1. not dynamic per carve
    //     axios.post(`http://localhost:8000/carves/${1}/likes/dislikes`,
    //         {
    //             poster: localStorage.getItem('userId'),
    //             carve : e
    //         })
    //         .then(res => {
    //             //alert("carve:" + JSON.stringify(res.data.results));

    //             //alert(JSON.stringify(res.data.results[0]));
    //             this.setState({

    //             });

    //         });
    };


    render() {
        if(this.state.mediaInfoLength > 0){
            const {mediaInfo} = this.state;
            return (
                <>
                    <Card style = {{width: '35rem'}}>
                            <container className="embed-responsive embed-responsive-16by9" style = {{ width: "100%", paddingBottom: "40px", border: '1px solid grey'}}>
                                    <iframe title="User Media" className="embed-responsive-item"
                                            src= {mediaInfo.url} allowFullScreen > </iframe>
                                            
                            </container>
                        <Card.Body>
                            <container>
                                <Row style = {{marginTop: '-1rem', borderBottom:'1px dashed grey'}}>
                                    <Card.Link href = "#">{mediaInfo.poster}</Card.Link>
                                    :{mediaInfo.description}
                                </Row>
                                <Row style= {{marginTop: '1rem'}}>
                                    
                                    <FormGroup>
                                        <Form.Row>
                                            <Col className = "col-18">
                                                <Form.Control size = "sm" type="text" placeholder="Say something interesting..." />
                                            </Col>
                                            <Col className = "col-1">
                                                <Button size = "sm">Enter</Button>
                                            </Col>
                                        </Form.Row>
                                    </FormGroup>
                                </Row>
                            </container>
                        </Card.Body>
                        <Table striped borderless hover size = "sm" style = {{marginTop: '-2rem'}}>
                            <thead>
                                <th>
                                    username
                                </th>
                                <th>
                                    comment
                                </th>
                                <th>
                                    timestamp
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                    <Card.Link href = "#">CMarcy98</Card.Link>
                                    <td>Wow this was so cool! I am testing word wrap aadf akjdf dfdfasdf sak df d a;akje fadkjfw</td>
                                    <td className = "text-muted" style = {{fontSize: '13px'}}><em>3mins ago</em></td>
                                </tr>
                                <tr>
                                    <Card.Link href = "#">frosty</Card.Link>
                                    <td>I wish I could've made it.</td>
                                    <td className = "text-muted" style = {{fontSize: '13px'}}><em>1 hour ago</em></td>
                                </tr>
                            </tbody>

                        </Table>
                        <Card.Footer style = {{fontSize: '10px'}}><em>Create_Time{mediaInfo.time}</em></Card.Footer>
                    </Card>

                </>
            )
        }else {
            return (
                <div>
                    <h1 className="fa fa-spinner fa-spin" style={{position: 'absolute', left: '50%', top: '50%'}}>Loading! </h1>
                </div>
            );
        }
     }
}

