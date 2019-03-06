import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Board from '../images/Board1.jpeg';
import Skate from '../images/Skate1.jpeg';
import Surf from '../images/Surf1.jpeg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dog from '../images/dog.jpg';
import FeaturedUserCard from '../components/FeaturedUserCard';


class SplashPage extends Component {

    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Carve Connect</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Venues</Nav.Link>
                        <Nav.Link href="#features">Sports</Nav.Link>
                    </Nav>
                </Navbar>


                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Board}
                            alt="First slide"
                        />

                        {/* <div style={{ height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: '80% 80%', backgroundImage: "url(" + Skate + ")"  }}></div> */}

                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Skate}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Surf}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>


                <Container>
                    <Row>
                        <Col>
                            <FeaturedUserCard title="Featured User 1" img={Dog} text="Loser1"/>
                        </Col>
                        <Col>
                            <FeaturedUserCard title="Featured User 2" img={Dog} text="Loser2"/>
                        </Col>

                        <Col>
                            <FeaturedUserCard title="Featured User 3" img={Dog} text="Loser3"/>
                        </Col>
                    </Row>
                </Container>


                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto" style={{height: '60px'}}>
                    </Nav>
                </Navbar>

            </>


        );


    }
}

export default SplashPage;