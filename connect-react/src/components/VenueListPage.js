import React, {Component} from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import VenueFigure from './VenueFigure';
import Mount_Snow_BG from '../images/mount_snow_bg.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default class VenueListPage extends Component {
    //I think i'll need the state information based on the future filtering options
    constructor(props){
        super(props);
        this.state = {
            venues: {},
            venuesLength: 0
        }
    }

    componentWillMount() {
		// Getting the user id from the url param
		axios.get(`http://localhost:8000/venues`)
			.then(res => {
			    //alert(JSON.stringify(res.data.venues[0]));
				console.log('Venues:', res.data.venues[0]);
				this.setState({
					venues: res.data.venues[0],
					venuesLength: res.data.venues[0].length
				});
			})
    }

    createDiv = () => {
        const venues = this.state.venues;
        const length = this.state.venuesLength;

        let flag = false;
        let div = [];

        // Guessing j represents how many rows we want? Not sure
        for(let j = 0; j < 2; j++){
            let row = [];
            let k = 0;
            for(k = (flag ? (length/2)+1 : k); k < length; k++){
                row.push(
                    <Col>
                        <VenueFigure name={venues[k].venue_name} img={Mount_Snow_BG} href={'/dashboard/venues/' + venues[k].venue_id}/>
                    </Col>
                );
                if(k === length/2){
                    flag = true;
                    break;
                }
            }
            div.push(
                <Row style = {{flex: '0 0 auto'}}>
                    {row}
                </Row>
            );
        }
        return div;
    };
    
    render(){
        if(this.state.venuesLength > 0){
            return (
                <Container>
                    <Row style = {{marginTop: '40px'}}>
                        <h1>Venues</h1>
                    </Row>
                    <Row style = {{marginTop: '45px'}}>
                        <Col md={{ span: 6, offset: 1 }}>
                            <Form.Control type="text" placeholder="Search" />
                        </Col>
                        <Button variant="link">+Filters</Button>
                    </Row>

                    <div style = {{marginTop: '20px', borderBottom: '1px solid lightgray'}}></div>

                    {/* Horizontal scrolling effect */}
                    <div style = {{display: 'flex', flexWrap: 'wrap', overflowX: 'scroll'}}>
                        {this.createDiv()}
                    </div>
                </Container>
            );
        }else{
            return (
                <div>Error loading venues list</div>
            );
        }
    }
}
