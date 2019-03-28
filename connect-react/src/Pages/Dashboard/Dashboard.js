import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from "../../components/Container";
import SideMenu from "../../components/SideMenu";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
	return (
		<>
		<Navbar />
		<Row style={{ height: '100%', width:'100%' }}>

			<SideMenu />
			<Container />
		</Row>
		</>
	);
};

export default Dashboard;