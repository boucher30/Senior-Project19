import React, {Component} from 'react'
import Button from "react-bootstrap/Button";
import CreateCarveModal from "../../../../components/CreateCarveModal";
import CarveCard from "../../../../components/CarveCard";

export default class ListingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}

	handleClick = () => {
		this.setState({ show: !this.state.show });
	};

	render() {
		return (
			<div>
				<CreateCarveModal handleClose={this.handleClick} show={this.state.show} />
				<div style={{ display: 'flex', marginTop: '8px' }}>
					<h2 style={{ width: '80%' }}>Listing Page</h2>
					<Button onClick={this.handleClick} style={{ margin: '5px' }}>Create Carve</Button>
				</div>
				<div>
					<h1>Carves open for attendance request</h1>
					<CarveCard/>
				</div>
			</div>
		);
	}
}
