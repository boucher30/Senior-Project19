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
            <Carousel fade = {true} className = "carousel" pauseOnHover = {false}>
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
                        <Button href={'/login'} eventKey="login" variant="dark" size="lg">
                          Login
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button href={'/sign-up'} eventKey="sign-up" variant="info" size="lg">
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
                        <Button href={'/login'} eventKey="login" variant="dark" size="lg">
                          Login
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Button href={'/sign-up'} eventKey="sign-up" variant="info" size="lg">
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
                        <Button href={'/login'} eventKey="login" variant="dark" size="lg">
                          Login
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Button href={'/sign-up'} eventKey="sign-up" variant="info" size="lg">
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
              <Row >
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

            {/* About and Tour Container */}
            <Container>
              <Row> 
                <Col style = {{textAlign: 'left'}}>
                  <h1>About</h1>
                  <p>
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                   beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi 
                   nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam 
                   aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum 
                   iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
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