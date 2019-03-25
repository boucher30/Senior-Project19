import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from "../../components/Container";
import SideMenu from "../../components/SideMenu";

const Dashboard = () => {
	return (
		<Row style={{ height: '100%' }}>
			<SideMenu />
			<Container />
		</Row>
	);
};

export default Dashboard;