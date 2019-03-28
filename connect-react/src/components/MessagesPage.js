import React, {Component} from 'react';
import axios from 'axios'
import MessagesSidebar from "./MessagesSidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class MessagesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.match.params.number,
            isUserLoggedIn: props.match.params.number === localStorage.getItem('userId'),
            message_id: "",
            message_subject: "",
            message_body: "",
            sender_id: 0,
            rec_Id: 0,
            type: "",
            timestamp: "",
            messages: "",
            check: true,
            show: false
        };

    }
    componentWillMount()
    {
        axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}/messages`)
            .then(res => {

                this.setState({
                    //messages: res.data.results[0][0]
                });

                //alert(JSON.stringify(res.data.users[0][0]))
            });

    }
    render() {
        /* import code needs null check

                                    <th scope="row">{this.state.messages.message_subject}</th>
                                    <td>{this.state.messages.sender_id}</td>
                                    <td>{this.state.messages.timestamp}</td>
                                    <td>{this.state.messages.type}</td>
                                    <td>{this.state.messages.message_body}</td>*/
        return (
            <base style = {{backgroundColor: "skyblue"}}>
                <Row className="justify-content-md-center" style={{ paddingLeft: '0px',backgroundColor: "white", height: "100%"}}>

                <MessagesSidebar  style = {{paddingRight: '0px'}} />

                    <Col style={{ paddingLeft: '0px'}}>

                <h3 className = 'border-bottom' style = {{  borderBottomColor: 'black',
                    borderBottomWidth: 5, width: '150%' }}>Messages</h3>

                <div>
                    <table className="table table-dark" style = {{color: "skyblue", paddingTop: "5px",width:"150%", bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
                        <thead>
                        <tr>
                            <th scope="col" style={{width:"6%"}}>Subject</th>
                            <th scope="col" style={{width:"6%"}}>Sender</th>
                            <th scope="col" style={{width:"4%"}}>Timestamp</th>
                            <th scope="col" style={{width:"4%"}}>Type</th>
                            <th scope="col">Body</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>3-19-19(19:00)</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>3-19-19(19:00)</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>3-19-19(19:00)</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>3-19-19(19:00)</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>3-19-19(19:00)</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>3-19-19(19:00)</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>3-19-19(19:00)</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>3-19-19(19:00)</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                    </Col>
                </Row>
            </base>
        );
    }
}


export default MessagesPage;


