import React, {Component} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Snow from '../../images/winter.jpeg';
import Skate from '../../images/skater1.jpeg';
import Surf from '../../images/surf1.jpg';
import dirt from '../../images/mountain bike1.jpeg';
import drone from '../../images/drone guy1.jpeg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dogskate from '../../images/dogskate.jpeg';
import dogphoto from '../../images/dogphoto.jpeg';
import dogsurf from '../../images/dogsurf.jpeg';
import FeaturedUserCard from '../../components/FeaturedUserCard';
import TopNav1 from "../../components/Navbarsplash";


class SplashPage extends Component {
    render() {
        return (

          <>
              <TopNav1/>
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
                  alt="fourth slide"
                />
              </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src= {dirt}
                        alt="fifth slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src= {drone}
                        alt="sixth slide"
                    />

                </Carousel.Item>

            </Carousel>

            
            {/* Featured User Cards */}
            <Container>
              <Row>
                <Col>
                  <h1 style = {{textAlign: 'left', marginTop: '30px'}}>Featured Users</h1>
                    <h1 className = 'border-bottom' style = {{ borderBottomColor: 'black',
                        borderBottomWidth: "10px", width: '150%', borderThickness:"5px" }}> </h1>
                </Col>
              </Row>
              <Row style = {{marginLeft: '75px', marginTop: '20px'}}>
                <Col>
                    <FeaturedUserCard title = "Featured User 1" img = {dogskate} text = "I love Carve Connect!"/>
                </Col>
                <Col>
                    <FeaturedUserCard title = "Featured User 2" img = {dogphoto} text = "Filming is an art and it's my passion."/>
                </Col>
                <Col>
                    <FeaturedUserCard title = "Featured User 3" img = {dogsurf} text = "Sports are cool."/>
                </Col>
              </Row>
            </Container>

            {/* About and Tour Container */}
            <Container>
              <Row> 
                <Col style = {{textAlign: 'left'}}>
                  <h1>About</h1>
                    <h3 className = 'border-bottom' style = {{ borderBottomColor: 'black',
                        borderBottomWidth: "10px", width: '150%', borderThickness:"5px" }}> </h3>
                  <p>
                  "Hello and welcome to carve connect. Carve Connect is a social media platform for extreme sports
                      athletes, those who film them, and fans to connect. The video below will take you on a tour.
                      Thanks for stopping by."
                  </p>

                </Col>
              </Row>
                <Row>

                </Row>
              <Row style = {{marginBottom: '50px'}}>
                <Col style = {{textAlign: 'left'}}>
                    <h3 className = 'border-bottom' style = {{ borderBottomColor: 'black',
                        borderBottomWidth: "10px", width: '150%', borderThickness:"5px" }}> </h3>
                  <h1>Tour</h1>
                  <div className = "text-center" >
                      <div className="embed-responsive embed-responsive-16by9">
                          <iframe Title="Tour Video" className="embed-responsive-item"
                                  src="https://www.youtube.com/embed/wmALu6zdaTg" allowFullScreen> </iframe>
                      </div>
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

