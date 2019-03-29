import React, {Component} from 'react';

import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Snow from '../../images/snow1.jpg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CarouselCaption from 'react-bootstrap/CarouselCaption';
import axios from "axios";


class LogoutPage extends Component {
    componentWillMount()
    {
        axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}/logout`)
            .then(res => {

                this.setState({
                    //messages: res.data.results[0][0]
                });

                //alert(JSON.stringify(res.data.users[0][0]))
            });

    }

    render() {
        localStorage.clear();
        return (
            <>
                {/* Sliding carousel */}
                <Carousel fade className="carousel" pauseOnHover={false}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Snow}
                            alt="First slide"
                        />
                        <CarouselCaption>
                            <Container>
                                <Row style = {{marginBottom: '20px', marginRight: '5px'}}>
                                    <Col>
                                        <Button href='/' variant="dark" size="lg">
                                            Return to Carve Connect
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </CarouselCaption>
                    </Carousel.Item>
                </Carousel>
                <Container>
                    <Row>
                        <Col style = {{textAlign: 'left'}}>
                            <h1>Logout Successful</h1>
                            <p>
                                "Thank you for using Carve Connect, Have a Rad Day!"
                            </p>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default LogoutPage;