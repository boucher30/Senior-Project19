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


export default class VenuePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            venueId: props.match.params.number,
            venueInfo: {},
            venueInfoLength: 0
        }
    }

    componentWillMount() {
		// Getting the venue id from the url param
		axios.get(`http://localhost:8000/venues/${this.state.venueId}`)
			.then(res => {
				console.log('Venue:', res.data);
				this.setState({
					venueInfo: res.data.venue[0],
					venueInfoLength: Object.keys(res.data.venue[0]).length
				});
			})
	}

    render() {
        if(this.state.venueInfoLength > 0){
            const venue = this.state.venueInfo;

            return (
                <>
                    <Row>
                        <Container>
                            <Row>
                                <Col>
                                    <Figure>
                                        <h1>{venue.venue_name}</h1>
                                        <h4><em>{venue.venue_city}, {venue.venue_state}</em></h4>
                                        <Figure.Image
                                            rounded
                                            src={Mount_Snow}
                                        />
                                        <Figure.Caption style = {{color: 'black'}}>
                                            Mount Snow is home to the East Coast's first All Park Mountain Face, Carinthia at Mount Snow, 
                                            which debuted in the 2008-2009 season. Carinthia is home to nine parks, with both natural and 
                                            man-made features and a half-pipe. Mount Snow was co-host of the first Extreme Games in 1995 
                                            and host of the Winter X-Games in 2000 and 2001. Carinthia at Mount Snow claimed home to the 
                                            second stop of the first annual Winter Dew Tour as well as many other events including the Freeski Open.
                                        </Figure.Caption>
                                    </Figure>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                    <Row className = 'justify-content-center'>
                        <ButtonGroup size = 'lg' aria-label="Venue button group">
                            <Button variant="secondary">Information</Button>
                            <Button variant="secondary">Carves</Button>
                            <Button variant="secondary">Media</Button>
                        </ButtonGroup>
                    </Row>

                </>
            );
        }else{
            return (
                <p>Error loading venue profile page</p>
            );
        }
    }

}