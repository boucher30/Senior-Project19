import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Table from 'react-bootstrap/Table';



const MediaCard = (props) => {
    return (
        <>
            <Card style = {{width: '25rem'}}>
                <container className="embed-responsive embed-responsive-16by9">
                    <iframe title="User Media" className="embed-responsive-item" src= {props.media.url} allowFullScreen > </iframe>
                </container>
                <Card.Body>
                    <container>
                        <Row style = {{marginTop: '-1rem', borderBottom:'1px dashed lightgrey'}}>
                            <Card.Link href = "#">{props.media.poster}</Card.Link>
                            :{props.media.description}
                        </Row>
                        <Row style= {{marginTop: '1rem'}}>
                            <Form onSubmit={props.submit}>
                                <FormGroup>
                                    <Form.Row>
                                        <Col className="col-8">
                                            <Form.Control onChange={props.changeComment} value={props.comment} size = "sm" type="text" placeholder="Say something interesting..." />
                                        </Col>
                                        <Col className="col-1">
                                            <Button type = "submit" size = "sm">Enter</Button>
                                        </Col>
                                    </Form.Row>
                                </FormGroup>
                            </Form>

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
                        {props.commentList}
                    </tbody>
                </Table>
                <Card.Footer style = {{fontSize: '10px'}}><em>Create_Time: {props.media.time}</em></Card.Footer>
            </Card>
        </>
    );
}
export default MediaCard;