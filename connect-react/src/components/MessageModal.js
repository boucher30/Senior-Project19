import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";

export default class MessageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            to: '',
            type: '',
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

       if(this.state.type === 'buddyAccept')
       {
           axios.post('http://localhost:8000/follows/buddy', {
               user1: this.state.sender,
               user2: this.state.to


           })
       }
        console.log('Message created');
        axios.post('http://localhost:8000/messages', {
           sender: this.state.sender,
            reciever: this.state.to,
            subject: this.state.subject,
            body: this.state.body,
            msgType: this.state.type


        })
    }


    // Make sure that all fields are filled in
    validateForm() {
        const { subject, to, body, type } = this.state;
        return (
            subject.length > 0 &&
            to.length > 0 &&
            to.length < 39 &&
            body.length > 0
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
                    <Modal.Title id="contained-modal-title-vcenter">New Message</Modal.Title>
                </Modal.Header>


                <Modal.Body style = {{color: "lightgrey",backgroundColor:"slategrey"}}>
                    <Container>

                        {/* Name of Carve */}
                        <Form.Group controlId="subject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control value={this.state.subject} onChange={this.handleChange} type="text" placeholder="Enter Subject..." />
                            <Form.Text className="text-white" >
                                Subject of the message
                            </Form.Text>
                        </Form.Group>

                        {/* Sport selection */}
                        <Form.Group controlId="type">
                            <Form.Label>Message Type</Form.Label>
                            <Form.Control value={this.state.type} placeholder="Select a Type" onChange={this.handleChange} as="select">
                                <option disabled value={-1}>Select an option...</option>
                                <option value = 'normal'>Normal</option>
                                <option value = 'buddyRequest'>Buddy Request</option>
                                <option value = 'invite'>Carve Invite</option>
                                <option value = 'attendRequest'>Carve Attend Request</option>
                                <option value = 'buddyAccept'>Accept buddy</option>
                                <option value = 'inviteAccept'>Accept Invite</option>
                                <option value = 'attendAccept'>Accept Carve Attend</option>
                                <option value = 'buddyDecline'>Deny Buddy</option>
                                <option value = 'inviteDeny'>Deny Invite</option>
                                <option value = 'attendDeny'>Deny Carve Attendt</option>
                            </Form.Control>
                        </Form.Group>

                        {/* Location */}
                        <Form.Group controlId="to">
                            <Form.Label>Sending to:</Form.Label>
                            <Form.Control value={this.state.to} onChange={this.handleChange} type="text" placeholder="Enter userId" />
                            <Form.Text className="text-white">
                                Use userId to send. valid range 1-38
                            </Form.Text>
                        </Form.Group>

                        {/* Description */}
                        <Form.Group controlId="body">
                            <Form.Label>Message:</Form.Label>
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