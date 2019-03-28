import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Snow from '../../images/snow1.jpg';
import Skate from '../../images/skater1.jpeg';
import Surf from '../../images/surf1.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class ErrorPage extends Component {
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



            {/* About and Tour Container */}
            <Container>
              <Row> 
                <Col style = {{textAlign: 'left'}}>
                  <h1>About</h1>
                  <p>
                  "ERROR 404 PAGE NOT FOUND"
                  </p>
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

export default ErrorPage;