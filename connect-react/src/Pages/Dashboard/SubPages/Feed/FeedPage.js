import React, { Component } from 'react'
import Mount_Snow from '../../../../images/mount_snow.png';
import FeedCard from './FeedCard';

export default class FeedPage extends Component {
	render() {
		return (
			<div>
				<div style={{ display: 'flex', marginTop: '8px' }}>
					<h2 style={{ width: '80%' }}>My Feed</h2>
				</div>

				{/* TODO: Make the feed actually pull from API so that we can see content */}
				<FeedCard key='venue-profile' img={Mount_Snow} text='@Mount Snow'/>
			</div>
		);
	}
}
