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
                    <Row>
                    <Col style={{paddingLeft: "10%", border: '0px solid darkgrey'}}>
                        <h2 style = {{border:"0px solid slategrey"}}>Content</h2>

                        <container className="embed-responsive embed-responsive-16by9" style = {{justify: "center", width: "100%", paddingBottom: "40px", border: '0px solid slategrey'}}>
                            <iframe title="Tour Video" className="embed-responsive-item"
                                    src="https://www.youtube.com/embed/7a0hbT0QtSw" allowFullScreen > </iframe>

                        </container>
                        <container className="embed-responsive embed-responsive-16by9" style = {{justify: "center", width: "100%", paddingTop: "20%", border: '0px solid slategrey'}}>
                            <iframe title="Prof vid2" className="embed-responsive-item"
                                    src="https://www.youtube.com/embed/m8aM2XVffaE" allowFullScreen > </iframe>

                        </container>
                    </Col>
                        <Col style = {{width: "200%"}}>
                            <Row>
                                <h2>Carves at this venue</h2></Row>
                            <Row style = {{width:"100%"}}>
                                <VenueCarveCard venue_id = {this.state.venueId} style = {{width:"100%"}}/></Row></Col>
                    </Row>
                </>
            );
        }else{
            return (
                <div>
                    <h1 className="fa fa-spinner fa-spin" style={{position: 'absolute', left: '50%', top: '50%'}}>Loading! </h1>
                </div>
            );
        }
    }

}