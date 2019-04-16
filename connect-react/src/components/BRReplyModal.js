import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";

export default class BRReplyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: 'RE: Buddy Request',
            to: '',
            type: '',
            body: ' ',
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

        if(this.props.type === 'buddyAccept')
        {
            axios.post('http://ec2-3-92-212-119.compute-1.amazonaws.com:8000/follows/buddies', {
                user1: this.state.sender,
                user2: this.props.replier

            });}
        console.log('Message created');
        axios.post('http://ec2-3-92-212-119.compute-1.amazonaws.com:8000/messages', {
            sender: this.state.sender,
            reciever: this.props.replier,
            subject: 'RE:Buddy Request ',
            body: this.state.body,
            msgType: this.props.type,
            reply_id: this.props.replyId

        });
        this.props.handleClose();
    }


    // Make sure that all fields are filled in
    validateForm() {
        const {  body } = this.state;
        return (
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
                    <Modal.Title id="contained-modal-title-vcenter">Reply Message</Modal.Title>
                </Modal.Header>


                <Modal.Body style = {{color: "lightgrey",backgroundColor:"slategrey"}}>
                    <Container>

                        <Row>Subject {this.state.subject}</Row>
                        <Row>Replying to {this.props.replier}</Row>
                        <Row>Status is {this.props.type}</Row>

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