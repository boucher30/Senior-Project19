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
        };


    }



    componentWillMount() {
            axios.get(`http://localhost:8000/media/${this.props.type}/${this.props.content_id}/`)
                .then(res => {
                    this.setState({
                        mediaInfo: res.data.results[0],
                    });
                });
            }

    render() {
        let mediaList;
        
        if(this.state.mediaInfo.length > 0){
            mediaList = this.state.mediaInfo.map((media, index) => {
                return (
                        <ListGroup.Item key={index} style={{

                            fontFamily: 'monospace', paddingRight: '0px', paddingLeft: '0px',paddingTop: '0px',paddingBottom: '10px', width: "100%"
                        }}>
                        <Card style = {{width: '35rem'}}>
                                <container className="embed-responsive embed-responsive-16by9" style = {{ width: "100%", paddingBottom: "40px", border: '1px solid grey'}}>
                                        <iframe title="User Media" className="embed-responsive-item"
                                                src= {media.url} allowFullScreen > </iframe>
                                                
                                </container>
                            <Card.Body>
                                <container>
                                    <Row style = {{marginTop: '-1rem', borderBottom:'1px dashed grey'}}>
                                    <Card.Link href = "#">{media.poster}</Card.Link>
                                        :{media.description}
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
                                        <td className = "text-muted" style = {{fontSize: '13px'}}><em>3 mins ago</em></td>
                                    </tr>
                                    <tr>
                                        <Card.Link href = "#">frosty</Card.Link>
                                        <td>I wish I could've made it.</td>
                                        <td className = "text-muted" style = {{fontSize: '13px'}}><em>1 hour ago</em></td>
                                    </tr>
                                </tbody>
    
                            </Table>
                            <Card.Footer style = {{fontSize: '10px'}}><em>Create_Time: {media.time}</em></Card.Footer>
                        </Card>
                    </ListGroup.Item>
                ) //return
            });
        }
        return (
            <>
    
                <ListGroup variant="flush" defaultActiveKey="1" style ={{paddingTop:"20px",width:"100%"}}>
                    {mediaList}
                </ListGroup>
    
            </>
        )
    }
    
}//class