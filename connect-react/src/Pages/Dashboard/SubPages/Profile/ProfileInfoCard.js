import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';



const ProfileInfoCard = (props) => {
    return (
        <>
            <Container fluid  
                style= {{
                    width: '75%',
                    height:'50%',
                    border: 'solid 1px #555',
                    backgroundColor: '#74bde8',
                    boxShadow:  '0 0 10px 5px rgba(0,0,0,0.6)',
                    borderRadius: '10px',
                    padding: '.5rem'
                }}>
                <Row>
                    <Col className="col-3">
                        <Image rounded src = {props.img} width = "350px"></Image>
                    </Col>
                    <Col style={{marginLeft: '8rem'}}>
                        <h2>{props.username}</h2>
                    </Col>
                    
                </Row>
            </Container>

        </>
    );
};

export default ProfileInfoCard;