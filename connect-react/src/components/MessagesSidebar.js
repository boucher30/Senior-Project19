import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'

const menuItems = {
	'Compose  ': {},
	'Inbox  ': {},
	'Sent  ': {}

};

const MessagesSidebar = () => {


	return (
		<>
			{/* First column that holds the menu items */}
			<Col xs={1} style={{ paddingLeft: "0px",paddingRight: '0px', backgroundColor: "grey",bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
				<ListGroup variant="flush" defaultActiveKey="1"  style={{ paddingRight: '0px'}}>
					<ListGroup.Item key={menuItems[1]}  action href={menuItems["Compose  "]} style={{backgroundColor: "grey", color: "white"	,fontWeight:'bold',
						fontFamily: 'monospace', paddingRight: '0px',bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
						{"Compose "}
						<i className ="fa fa-pencil text-white" />
					</ListGroup.Item>
					<ListGroup.Item key={menuItems[2]}  action href={menuItems["Inbox  "]} style={{backgroundColor: "grey", color: "white"	,fontWeight:'bold',
						fontFamily: 'monospace', paddingRight: '0px',bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
						{"Inbox  "}
						<i className ="fa fa-envelope-open-o text-white" />
					</ListGroup.Item>
					<ListGroup.Item key={menuItems[3]}  action href={menuItems["Sent  "]} style={{backgroundColor: "grey", color: "white"	,fontWeight:'bold',
						fontFamily: 'monospace', paddingRight: '0px',bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
						{"Sent  "}
						<i className ="fa fa-send-o text-white" />
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</>
	);
};

export default MessagesSidebar;