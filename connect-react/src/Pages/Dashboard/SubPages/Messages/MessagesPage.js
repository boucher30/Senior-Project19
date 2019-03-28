import React, {Component} from 'react';
import axios from 'axios'
import FontAwesomeIcon from 'font-awesome/css/font-awesome.min.css';
class MessagesPage extends Component {

    render() {
        return (
            <a>
            <div>
                <h3>Messages Page</h3>
               <div><i className="fa fa-spinner fa-spin"></i></div>
            </div>
                <div>
                    <table className="table table-dark">
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
                        <tr>
                            <th scope="row">HelloWorld</th>
                            <td>user2</td>
                            <td>normal</td>
                            <td>Message Text Here</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </a>
        );
    }
}


export default MessagesPage;


