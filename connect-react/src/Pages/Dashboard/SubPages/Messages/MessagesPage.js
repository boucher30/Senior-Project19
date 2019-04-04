import React, {Component} from 'react';
import axios from 'axios'
import MessagesSidebar from "./MessagesSidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReplyMsgModal from "../../../../components/ReplyMsgModal";


class MessagesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: Number(props.match.params.number),
            isUserLoggedIn: props.match.params.number === localStorage.getItem('userId'),
            message_id: "",
            message_subject: "",
            message_body: "",
            sender_Id: 0,
            rec_Id: 0,
            type: "",
            create_time: "",
            messages: [],
            check: true,
            replyModalShow: false,
            currentID: 0,
            replyId: 0,
            replier: 0
        };

        this.handleModalClose = this.handleModalClose.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this);
    }

    // Fetches information before the component is rendered
    componentWillMount() {
        this.fetchMessages();
    }

    // Fetches messages from API
    fetchMessages() {
      axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}/messages/inbox`)
        .then(res => {
          console.log("Messages from inbox: ", res.data.messages);
          this.setState({
            messages: res.data.messages
          });
        });
    }

    // Deletes a specific message when the trash can icon is clicked
    deleteMessage = (e) =>{
        console.log(" delete:" +e);
        axios.delete(`http://localhost:8000/messages/${e}`)
    };

    // This function passes the data to the Reply Message Modal
    openMessageModal = (messageId, senderId) => {
        // reply id is the id of the message that they are replying to
        // replier id is the id of the person sending the response
        this.setState({
            replyId: messageId,
            replier: senderId,
            replyModalShow: true
        });

    }

    // Handle closing the modal instead of else where
    handleModalClose() {
      this.setState({replyModalShow: false});
      this.fetchMessages();
    }

    render() {
        let messageRows;

        // If we have messages, make rows of messages for the table body
        if(this.state.messages.length > 0){
            messageRows = this.state.messages.map((message) => {
                return (
                        <tr key={message.message_id}>
                            <th>{message.message_subject}</th>
                            <td>{message.sender_Id}</td>
                            <td>{message.create_time}</td>
                            <td>{message.type}</td>
                            <td>{message.message_body}</td>
                            <td><i style={{cursor: 'pointer'}}
                                   onClick={() => this.openMessageModal(message.message_id, message.sender_Id)}
                                   className="fa fa-inbox text-white"></i></td>
                            <td><i className ="fa fa-trash-o text-white" onClick={() => {this.deleteMessage(message.message_id)}}> </i></td>
                        </tr>
                )
            });
        }


        return (
            <>
                <ReplyMsgModal replyId={this.state.replyId} replier={this.state.replier} refresh={this.fetchMessages} handleClose={this.handleModalClose} show={this.state.replyModalShow} />
                <Row className="justify-content-md-center" style={{ paddingLeft: '0px',backgroundColor: "lightgray", height: "100%"}}>

                  {/* This is the options for the messages */}
                  <MessagesSidebar style = {{paddingRight: '0px'}} />

                  {/* This is the container Im guessing that holds all the messages*/}
                  <Col style={{ paddingLeft: '0px'}}>
                    <h3 className = 'border-bottom' style={{  borderBottomColor: 'black', borderBottomWidth: 5, width: '150%' }}>Messages</h3>
                    <table className="table table-dark" style={{color: "skyblue", paddingTop: "5px",width:"101%", bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
                        <thead>
                          <tr>
                              <th scope="col" style={{width:"6%"}}>Subject</th>
                              <th scope="col" style={{width:"6%"}}>Sender</th>
                              <th scope="col" style={{width:"4%"}}>Timestamp</th>
                              <th scope="col" style={{width:"4%"}}>Type</th>
                              <th scope="col">Body</th>
                              <th scope="col" style={{width:"1%"}}>Reply</th>
                              <th scope="col" style={{width:"1%"}}>Delete</th>
                          </tr>
                        </thead>
                        <tbody>{messageRows}</tbody>
                    </table>
                  </Col>
                </Row>
            </>
        );
    }
}


export default MessagesPage;


