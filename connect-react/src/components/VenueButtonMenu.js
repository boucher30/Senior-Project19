import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import InfoButton from './VenueOptions/InfoButton';
import CarvesButton from './VenueOptions/CarvesButton';
import MediaButton from './VenueOptions/MediaButton';

class VenueButtonMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'info'
    };
        this.handleInfo = this.handleInfo.bind(this);
        this.handleCarves = this.handleCarves.bind(this);
        this.handleMedia = this.handleMedia.bind(this);
    }

    handleInfo(){
        this.setState({name: 'info'});
    }

    handleCarves(){
        this.setState({name: 'carves'});
    }

    handleMedia(){
        this.setState({name: 'media'});
    }

    render() {
        const state = this.sel.state;
        let component;

        if(state ==='info'){
            component = InfoButton;
        }
        else if(state === 'carves'){
            component = CarvesButton;
        }
        else{
            component = MediaButton;
        }


        return (
            <>
                <ButtonGroup size = 'lg' aria-label="Venue button group">
                    <Button variant="secondary" onClick = {this.handleInfo}>Information</Button>
                    <Button variant="secondary" onClick = {this.handleCarves}>Carves</Button>
                    <Button variant="secondary" onClick = {this.handleMedia}>Media</Button>
                </ButtonGroup>

                <div>
                    {component}
                </div>

            </>
        );
    }
}

export default VenueButtonMenu;