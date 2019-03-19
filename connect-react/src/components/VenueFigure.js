import React from 'react';
import Figure from 'react-bootstrap/Figure';
import Mount_Snow_BG from '../images/mount_snow_bg.png';


const VenueFigure = (props) => {
    return (
        <Figure>
            <Figure.Image 
                style = {{border: '1px solid black'}} 
                thumbnail
                height={400}
                width={400}
                src= {Mount_Snow_BG}
            />

            <Figure.Caption style = {{textAlign: 'center'}}>
                {props.name}
            </Figure.Caption>
        </Figure>
    );
}

export default VenueFigure;