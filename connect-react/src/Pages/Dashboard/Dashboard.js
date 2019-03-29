import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from "./Container";
import SideMenu from "./SideMenu";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
	return (
		<>
		<Navbar />
		<Row style={{ height: '100%', width:'105%',backgroundColor:"lightgrey" }}>

			<SideMenu />
			<Container />
		</Row>
		</>
	);
};

export default Dashboard;