import React from 'react';
import Figure from 'react-bootstrap/Figure';



const VenueFigure = (props) => {
    return (
        <Figure >
            <a href = {props.href}>
                <Figure.Image 
                    style = {{marginTop: '30px',border: '1px solid black'}} 
                    thumbnail
                    height={400}
                    width={400}
                    src= {props.img}
                />
            </a>

            <Figure.Caption style = {{textAlign: 'center'}}>
                <a href= {props.href}>{props.name}</a>
            </Figure.Caption>
        </Figure>
    );
};

export default VenueFigure;