import React, {Component} from 'react';
import MessagesSidebar from "./MessagesSidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class MessagesPageInbox extends Component {

    render() {
        return (
            <base href = {'#'} style = {{backgroundColor: "skyblue"}}>
                <Row className="justify-content-md-center" style={{ paddingLeft: '0px',backgroundColor: "white", height: "100%"}}>

                <MessagesSidebar  style = {{paddingRight: '0px', width: "80px"}} />

                    <Col style={{ paddingLeft: '0px'}}>

                <h3 className = 'border-bottom' style = {{  borderBottomColor: 'black',
                    borderBottomWidth: 5 }}>Inbox</h3>

                <div>
                    <table className="table table-dark" style = {{color: "skyblue", paddingTop: "5px"}}>
                        <thead>
                        <tr>
                            <th scope="col">Subject</th>
                            <th scope="col">Sender</th>
                            <th scope="col">Type</th>
                            <th scope="col">Body</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row" style={{color:"lightgrey"}}>HelloWorld</th>
                            <td>user2</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
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


export default MessagesPageInbox;


