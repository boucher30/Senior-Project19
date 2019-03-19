import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Snow from '../images/snow1.jpg';
import Skate from '../images/skater1.jpeg';
import Surf from '../images/surf1.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dog from '../images/dog.jpg';
import FeaturedUserCard from '../components/FeaturedUserCard';
import Video_Placeholder from '../images/video-placeholder.png';
import CarouselCaption from 'react-bootstrap/CarouselCaption';


class SplashPage extends Component {
    render() {
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
                    <Row style = {{marginBottom: '20px'}}>
                      <Col>
                        <Button href='/login' variant="dark" size="lg">
                          Login
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button href='/sign-up' variant="info" size="lg">
                          Sign Up
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </CarouselCaption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src = {Skate}
                  alt="Third slide"
                />
                <CarouselCaption>
                <Container>
                    <Row style = {{marginBottom: '20px'}}>
                      <Col>
                        <Button href='/login' variant="dark" size="lg">
                          Login
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Button href='/sign-up' variant="info" size="lg">
                          Sign Up
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </CarouselCaption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src= {Surf}
                  alt="Third slide"
                />
                <CarouselCaption>
                <Container>
                    <Row style = {{marginBottom: '20px'}}>
                      <Col>
                        <Button href='/login' variant="dark" size="lg">
                          Login
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Button href='/sign-up' variant="info" size="lg">
                          Sign Up
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </CarouselCaption>
              </Carousel.Item>
            </Carousel>

            
            {/* Featured User Cards */}
            <Container>
              <Row>
                <Col>
                  <h1 style = {{textAlign: 'left', marginTop: '30px'}}>Featured Users</h1>
                </Col>
              </Row>
              <Row style = {{marginLeft: '75px', marginTop: '20px'}}>
                <Col>
                    <FeaturedUserCard title = "Featured User 1" img = {Dog} text = "I love Carve Connect!"/>
                </Col>
                <Col>
                    <FeaturedUserCard title = "Featured User 2" img = {Dog} text = "Filming is an art and it's my passion."/>
                </Col>
                <Col>
                    <FeaturedUserCard title = "Featured User 3" img = {Dog} text = "Sports are cool."/>
                </Col>
              </Row>
            </Container>

            {/* About and Tour Container */}
            <Container>
              <Row> 
                <Col style = {{textAlign: 'left'}}>
                  <h1>About</h1>
                  <p>
                  "Hello and welcome to carve connect. Carve Connect is a social media platform for extreme sports
                      athletes, those who film them, and fans to connect. The video below will take you on a tour.
                      Thanks for stopping by."
                  </p>
                </Col>
              </Row>
              <Row style = {{marginBottom: '50px'}}>
                <Col style = {{textAlign: 'left'}}>
                  <h1>Tour</h1>
                  <div className = "text-center" >
                    <img height = '400px' width = '750px' src = {Video_Placeholder} alt = "Placeholder Video"/>
                  </div>
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