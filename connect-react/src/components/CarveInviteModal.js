import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";

export default class CarveInviteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: 'Carve Invite',
            to: '',
            type: 'invite',
            body: '',
            sender: localStorage.getItem('userId')
        };

        this.sendMessage = this.sendMessage.bind(this);

    }

    // Handles state change for each input in the state object
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    // Hits API with body of carve
    sendMessage() {

        console.log('Message created');
        axios.post('http://ec2-3-92-212-119.compute-1.amazonaws.com:8000/messages', {
            sender: this.state.sender,
            reciever: this.state.to,
            subject: 'Carve Invite ',
            body: this.state.body,
            msgType: 'invite',
            carve: this.props.cId

        });
        this.props.handleClose();
    }


    // Make sure that all fields are filled in
    validateForm() {
        const {  body, to } = this.state;
        return (
            body.length > 0&&
                to.length >0 &&
                to.length <39
        );
    }

    render() {
        return (
            <Modal size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   show={this.props.show}
                   onHide={this.props.handleClose}
                   style = {{}}>
                <Modal.Header closeButton style = {{color: "lightgrey",backgroundColor:"darkslategrey"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Carve Invite</Modal.Title>
                </Modal.Header>


                <Modal.Body style = {{color: "lightgrey",backgroundColor:"slategrey"}}>
                    <Container>

                        <Row>Subject {this.state.subject}</Row>
                        {/* Location */}
                        <Form.Group controlId="to">
                            <Form.Label>Sending to:</Form.Label>
                            <Form.Control value={this.state.to} onChange={this.handleChange} type="text" placeholder="Enter userId" />
                            <Form.Text className="text-white">
                                Use userId to send. valid range 1-38 should be buddies only.
                            </Form.Text>
                        </Form.Group>

                        {/* Description */}
                        <Form.Group controlId="body">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control value={this.state.description} onChange={this.handleChange} as="textarea" rows="2" placeholder="Enter Message text here..." />
                        </Form.Group>

                        {/* Horizontal rule */}
                        <hr/>


                    </Container>
                </Modal.Body>


                <Modal.Footer style = {{color: "lightgrey",backgroundColor:"midnightblue"}}>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" disabled={!this.validateForm()} onClick={this.sendMessage}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}