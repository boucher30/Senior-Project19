import React, {Component} from 'react';
import axios from 'axios'
import FontAwesomeIcon from 'font-awesome/css/font-awesome.min.css';
class UsersPage extends Component {

    render() {
        return (
            <a>
                <div>
                <h3>Users Page</h3>
                <div><i className="fa fa-spinner fa-spin"></i></div>
            </div>
                <div>
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Type</th>
                            <th scope="col">Sports</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>user1</td>
                            <td>Photographer,Filmographer,DroneOperator</td>
                            <td>Snowboard</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>user1</td>
                            <td>Photographer,Filmographer,DroneOperator</td>
                            <td>Snowboard</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>user1</td>
                            <td>Photographer,Filmographer,DroneOperator</td>
                            <td>Snowboard</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </a>
        );
    }
}


export default UsersPage;


