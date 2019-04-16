import React, {Component} from 'react';
import axios from "axios";
import Col from "../Venues/VenueListPage";
import Mount_Snow_BG from "../../../../images/mount_snow_bg.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import UserFigure from "./UserFigure";

//import axios from 'axios'

class UsersPage extends Component {



    //I think i'll need the state information based on the future filtering options
    constructor(props){
        super(props);
        this.state = {
            users: {},
            isUserLoggedIn: props.match.params.number === localStorage.getItem('userId'),
            usersLength: 0
        }
    }

    componentWillMount() {
        // Getting the user id from the url param
        axios.get(`http://ec2-3-92-212-119.compute-1.amazonaws.com:8000/users`)
            .then(res => {
                this.setState({
                    venues: res.data.users[0],
                    venuesLength: res.data.users[0].length
                });
            })
    }

    createDiv = () => {
        const users = this.state.users;
        const length = this.state.usersLength;

        //let flag = false;
        let div = [];

        // Guessing j represents how many rows we want? Not sure

        let row = [];

        for(let k =0 ; k < length; k++){
            row.push(
                <Col key={k}>
                    <UserFigure name={users[k].username} img={Mount_Snow_BG} href={'/dashboard/users/' + users[k].user_id}/>
                </Col>
            );
        }
        div.push(
            <Row key={Math.random(50)} style={{flex: '0 0 auto'}}>
                {row}
            </Row>
        );

        return div;
    };

    render(){
        if(this.state.usersLength > 0){
            return (
                <Container>
                    <Row style = {{marginTop: '40px'}}>
                        <h1>Users</h1>
                    </Row>
                    <Row style = {{marginTop: '45px'}}>
                        <Col md={{ span: 6, offset: 1 }}>
                            <Form.Control type="text" placeholder="Search" />
                        </Col>
                        <Button variant="link">+Filters</Button>
                    </Row>

                    <div style = {{marginTop: '20px', borderBottom: '1px solid lightgray'}}> </div>

                    {/* Horizontal scrolling effect */}
                    <div style = {{}}>
                        {this.createDiv()}
                    </div>
                </Container>
            );
        }else{
            return (
                <div>
                    <h1 className="fa fa-spinner fa-spin" style={{position: 'absolute', left: '50%', top: '50%'}}>Loading! </h1>
                </div>
            );
        }
    }
}export default UsersPage;



