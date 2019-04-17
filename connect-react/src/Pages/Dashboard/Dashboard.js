import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from "./Container";
import SideMenu from "./SideMenu";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
	return (
		<>
		<Navbar />
		<Row style={{ height: '1000%', width:'105%',backgroundColor:"white" }}>

			<SideMenu />
			<Container />
		</Row>
		</>
	);
};

export default Dashboard;