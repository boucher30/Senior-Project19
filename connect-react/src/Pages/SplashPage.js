import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Snow from '../images/snow1.jpg';
import Skate from '../images/skater1.jpeg';
import Surf from '../images/surf1.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dog from '../images/dog.jpg';
import FeaturedUserCard from '../components/FeaturedUserCard';
import '../App.css';


class SplashPage extends Component {

    render() {
        return (
          <>

            {/* Header navbar */}
            <Navbar bg="dark" variant="dark" sticky = "top">
                <Navbar.Brand href="#home">Carve Connect</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Venues</Nav.Link>
                    <Nav.Link href="#features">Sports</Nav.Link>
                </Nav>
            </Navbar>

            {/* Sliding carousel */}
            <Carousel fade = {true} className = "carousel" pauseOnHover = {false}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Snow}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src = {Skate}
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src= {Surf}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>

            {/* Featured User Cards */}
            <Container>
              <Row>
                <Col>
                    <FeaturedUserCard title = "Featured User 1" img = {Dog} text = "Loser1"/>
                </Col>
                <Col>
                    <FeaturedUserCard title = "Featured User 2" img = {Dog} text = "Loser2"/>
                </Col>
                <Col>
                    <FeaturedUserCard title = "Featured User 3" img = {Dog} text = "Loser3"/>
                </Col>
              </Row>
            </Container>

            {/* Footer */}
            <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto" style = {{height: '60px'}}>
              </Nav>
          </Navbar>

          </>






        );
    }
}

export default SplashPage;