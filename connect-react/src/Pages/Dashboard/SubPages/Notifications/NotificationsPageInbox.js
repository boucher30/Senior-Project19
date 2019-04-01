import React, {Component} from 'react';
import axios from 'axios'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NotificationsSidebar from "./NotificationsSidebar";
import BRReplyModal from "../../../../components/BRReplyModal";
import CIReplyModal from "../../../../components/CIReplyModal";


class NotificationsPageInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.match.params.number,
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
            show: false,
            show2: false,
            typ: [],
            rep: 0,
            replier: 0
        };
        this.handleClose2 = this.handleClose2.bind(this);
    }
    componentWillMount()
    {
        axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}/messages/notifications`)
            .then(res => {
                console.log("results: ", res.data.results[0]);

                this.setState({
                    messages: res.data.results[0]

                });

                //alert(JSON.stringify(res.data.users[0][0]))
            });

    }

    //onClick={this.onClick(message.message_id)}
    onClick2 = (e) =>{
        console.log(" delete:" +e);
        axios.delete(`http://localhost:8000/messages/${e}`)



    };

    handleClose2() {
        this.setState({ show2: false });
    };

    br = (e,e1,e2,e3) => {
        this.setState({
            rep: e,
            replier: e1,
            typ: e2,
            show2: !this.state.show2
        });
        axios.delete(`http://localhost:8000/messages/${e3}`)
    };


    ci = (e,e1,e2,e3) => {
        this.setState({
            rep: e,
            replier: e1,
            typ: e2,
            show3: !this.state.show3
        });
        axios.delete(`http://localhost:8000/messages/${e3}`)
    };

    ca = (e,e1,e2,e3) => {
        this.setState({
            rep: e,
            replier: e1,
            typ: e2,
            show2: !this.state.show2
        });
        axios.delete(`http://localhost:8000/messages/${e3}`)
    };

    render() {
        let messageRows;
        let but1 = <i/>;
        let but2 = <i/>;


        if(this.state.messages.length > 0){
            messageRows = this.state.messages.map((message, index) => {

                if(message.type === 'buddyRequest') {
                    but1 = <i className="fa fa-thumbs-o-up text-success" onClick={() =>  this.br(message.message_id,message.sender_Id,'buddyAccept',message.message_id)}/>;
                    but2 = <i className ="fa fa-thumbs-o-down text-danger" onClick={() =>  this.br(message.message_id,message.sender_Id,'buddyDecline',message.message_id)} />;
                }
                else if(message.type === 'carveInvite') {
                    but1 = <i className="fa fa-thumbs-o-up text-success" onClick={() =>  this.ci(message.message_id,message.sender_Id,'inviteAccept',message.message_id)}/>;
                    but2 = <i className ="fa fa-thumbs-o-down text-danger"onClick={() =>  this.ci(message.message_id,message.sender_Id,'inviteDeny',message.message_id)}/>;
                }
                else if(message.type === 'carveAttendRequest') {
                    but1 = <i className="fa fa-thumbs-o-up text-success"/>;
                    but2 = <i className ="fa fa-thumbs-o-down text-danger" />;
                }

                return (
                    <tr>
                        <th>{message.message_subject}</th>
                        <td>{message.sender_Id}</td>
                        <td>{message.create_time}</td>
                        <td>{message.type}</td>
                        <td>{message.message_body}</td>
                        <td>{but1}</td>
                        <td>{but2}</td>
                        <td > <i  className ="fa fa-trash-o text-white" onClick={ () => {this.onClick2(message.message_id) } }> </i></td>
                    </tr>
                )
            });
        }

        return (

            <a >
                <BRReplyModal replier={this.state.replier} replyId={this.state.rep} type ={[this.state.typ]} show={this.state.show2} handleClose={this.handleClose2}/>
                <CIReplyModal/>
                <Row className="justify-content-md-center" style={{ paddingLeft: '0px',backgroundColor: "lightgray", height: "100%"}}>

                    <NotificationsSidebar  style = {{paddingRight: '0px'}} />

                    <Col style={{ paddingLeft: '0px'}}>

                        <h3 className = 'border-bottom' style = {{  borderBottomColor: 'black',
                            borderBottomWidth: 5, width: '150%' }}>Notifications:</h3>

                        <div>
                            <table className="table table-dark" style = {{color: "skyblue", paddingTop: "5px",width:"101%", bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
                                <thead>
                                <tr>
                                    <th scope="col" style={{width:"6%"}}>Subject</th>
                                    <th scope="col" style={{width:"6%"}}>Sender</th>
                                    <th scope="col" style={{width:"4%"}}>Timestamp</th>
                                    <th scope="col" style={{width:"4%"}}>Type</th>
                                    <th scope="col">Body</th>
                                    <th scope="col" style={{width:"1%"}}>Approve</th>
                                    <th scope="col" style={{width:"1%"}}>Deny</th>
                                    <th scope="col" style={{width:"1%"}}>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {messageRows}

                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </a>
        );
    }
}


export default NotificationsPageInbox;


