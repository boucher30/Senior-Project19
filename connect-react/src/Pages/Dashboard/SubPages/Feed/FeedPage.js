import React, {Component} from 'react'
import CarveCardUserAttend from "../../../../components/CarveCardUserAttend";

export default class FeedPage extends Component {
	render() {
		return (
			<>
				<row>
					<h1>Carves user is attending</h1>
				</row>

				<CarveCardUserAttend>Carves:</CarveCardUserAttend>
				</>
		);
	}
}
