import React, {Component} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Mount_Snow from '../../../../images/mount_snow_bg.png'
//import VenueButtonMenu from './VenueButtonMenu';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import VenueCarveCard from "../../../../components/VenueCarveCard";


export default class VenuePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            venueId: props.match.params.number,
            venueInfo: {},
            venueInfoLength: 0,
            followsVenue: false,
            venueLoading: true
        }

        this.unFollowVenue = this.unFollowVenue.bind(this);
    }

    // Fetches Data from api before the component is rendered to the screen
    componentWillMount() {
        this.getData();
	  }

	  // Allows the user to follow the venue that they are on.
    followVenue = () => {
        axios.post('http://localhost:8000/follows', {
            user1: localStorage.getItem('userId'),
            v: this.state.venueInfo.venue_id
        }).then((res) => {
            this.getData();
        });
    };

    // Unfollows the venue that we are on
    unFollowVenue() {
        axios.delete(`http://localhost:8000/users/${localStorage.getItem('userId')}/follows/venues`, {
            data: { user_id1: localStorage.getItem('userId'), venue_id: this.state.venueId }
        })
          .then((res) => {
            this.getData();
          });
    }

    render() {
        // If we have the venue information, fill in the page with the information
        if(this.state.venueInfoLength > 0){
            // const venueInfo = this.state.venueInfo;
            const { venueInfo, venueLoading, followsVenue } = this.state;
            let followButton;

            // Checks to see if we are loading the venues that the user follows
            if(!venueLoading) {
                // If the user follows the venue, change the content of the button
                if(followsVenue) {
                    followButton = <Button style={{margin:'5px'}} variant="info" onClick={this.unFollowVenue}>Unfollow</Button>;
                } else {
                    // We do not follow the venue currently, offer them the option to follow it
                    followButton = <Button style={{margin:'5px'}} variant="info" onClick={this.followVenue}>Follow</Button>;
                }
            } else {
                followButton = <div><i className="fa fa-spinner fa-spin"></i></div>;
            }



            return (
                <>
                    {/* Follow button, image, and info about sports at the venue */}
                    <Row>
                        <Container>
                            <Row>
                                <Col>
                                    <Figure>
                                        <h1>{venueInfo.venue_name}</h1>
                                        <h4><em>{venueInfo.city}, {venueInfo.state}</em></h4>

                                        {/* Conditionally Render this button if we follow the venue already */}
                                        {/*<Button style={{margin:'5px'}} variant="info" onClick={this.onClick1}>Follow</Button>*/}
                                        {followButton}

                                        <Figure.Image rounded src={Mount_Snow} />
                                        <h4>{venueInfo.about}</h4>
                                        <h5>Sports: {venueInfo.snow_sports} {venueInfo.land_sports} {venueInfo.air_sports}</h5>
                                    </Figure>
                                </Col>
                            </Row>
                        </Container>
                    </Row>

                    {/* Row of buttons for navigation */}
                    <Row className = 'justify-content-center'>
                        <ButtonGroup size = 'lg' aria-label="Venue button group">
                            <Button variant="secondary">Information</Button>
                            <Button variant="secondary">Carves</Button>
                            <Button variant="secondary">Media</Button>
                        </ButtonGroup>
                    </Row>

                    {/* Carves at the venue */}
                    <Row>
                    <Col style={{paddingLeft: "10%", border: '0px solid darkgrey'}}>
                        <h2 style = {{border:"0px solid slategrey"}}>Content</h2>

                        <Container className="embed-responsive embed-responsive-16by9" style = {{justify: "center", width: "100%", paddingBottom: "40px", border: '0px solid slategrey'}}>
                            <iframe title="Tour Video" className="embed-responsive-item"
                                    src="https://www.youtube.com/embed/7a0hbT0QtSw" allowFullScreen > </iframe>

                        </Container>
                        <Container className="embed-responsive embed-responsive-16by9" style = {{justify: "center", width: "100%", paddingTop: "20%", border: '0px solid slategrey'}}>
                            <iframe title="Prof vid2" className="embed-responsive-item"
                                    src="https://www.youtube.com/embed/m8aM2XVffaE" allowFullScreen > </iframe>

                        </Container>
                    </Col>
                        <Col style = {{width: "200%"}}>
                            <Row>
                                <h2>Carves at this venue</h2>
                            </Row>
                            <Row style = {{width:"100%"}}>
                                <VenueCarveCard venue_id = {this.state.venueId} style = {{width:"100%"}}/>
                            </Row></Col>
                    </Row>
                </>
            );
        } else {
            // Return a loading spinner because we did not load the venue information yet
            return (
                <div>
                    <h1 className="fa fa-spinner fa-spin" style={{position: 'absolute', left: '50%', top: '50%'}}>Loading! </h1>
                </div>
            );
        }
    }

    getVenueInfo() {
        axios.get(`http://localhost:8000/venues/${this.state.venueId}`)
          .then(res => {
              // console.log('Venue:', res.data);
              this.setState({
                  venueInfo: res.data.venues[0][0],
                  venueInfoLength: Object.keys(res.data.venues[0]).length
              });
          });
    }

    getFollowingVenues() {
        axios.get(`http://localhost:8000/users/${localStorage.getItem('userId')}/follows/venues`)
          .then( (res) => {
              let venues = res.data.results[0];
              let followsVenue = false;

              // Iterate over venues that the user follows and check to see if it is the one we are on now
              venues.map((venue, index) => {
                  if(venue.venue_Id == this.state.venueId) {
                      followsVenue = true;
                  }
              });

              // Set the state of the application to reflect the following of the user in relation to the venue
              this.setState({followsVenue, venueLoading: false});
          });
    }

    getData() {
        this.getVenueInfo();
        this.getFollowingVenues();
    }

}