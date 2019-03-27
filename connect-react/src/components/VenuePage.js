import React, {Component} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Mount_Snow from '../images/mount_snow_bg.png'
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
					venueInfo: res.data.venues[0][0],
					venueInfoLength: Object.keys(res.data.venues[0]).length
				});
			})
	}

    render() {
        if(this.state.venueInfoLength > 0){
            const venueInfo = this.state.venueInfo;
            //alert(JSON.stringify(this.state.venueInfo));
            return (
                <>

                    <Row>
                        <Container>
                            <Row>
                                <Col>
                                    <Figure>
                                        <h1>{venueInfo.venue_name}</h1>
                                        <h4><em>{venueInfo.city}, {venueInfo.state}</em></h4>
                                        <Figure.Image
                                            rounded

                                            src={Mount_Snow}
                                        />
                                        <h4>
                                            {venueInfo.about}
                                        </h4>
                                        <h5>Sports: {venueInfo.snow_sports} {venueInfo.land_sports} {venueInfo.air_sports}</h5>
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