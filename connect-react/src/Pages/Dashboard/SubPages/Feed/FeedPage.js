import React, { Component } from 'react'
import Mount_Snow from '../../../../images/mount_snow.png';
import FeedCard from './FeedCard';
import CarveCard from '../../../../components/CarveCard';

export default class FeedPage extends Component {
	render() {
		return (
			<div>
				<h2>Feed Page</h2>
				<h6>Posts Here....</h6>
				<FeedCard key='venue-profile' img = {Mount_Snow} text = '@Mount Snow'/>
				<CarveCard/>
			</div>
		);
	}
}
