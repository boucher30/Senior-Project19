import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from "./Container";
import SideMenu from "./SideMenu";

const Dashboard = () => {
	return (
		<Row style={{ height: '100%' }}>
			<SideMenu />
			<Container />
		</Row>
	);
};

export default Dashboard;