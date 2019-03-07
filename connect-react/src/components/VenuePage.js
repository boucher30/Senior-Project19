import React, {Component} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Mount_Snow from '../images/mount_snow_bg.png'
//import VenueButtonMenu from './VenueButtonMenu';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


export default class VenuePage extends Component {

    render() {
        return (
            <>
                <Row>
                    <Container>
                        <Row>
                            <Col>
                                <Figure>
                                    <h1>Mount Snow Profile</h1>
                                    <h4><em>Dover, VT</em></h4>
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
    }

}