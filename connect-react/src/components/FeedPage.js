import React, { Component } from 'react'
import Mount_Snow from '../images/mount_snow.png';
import FeedCard from './FeedCard';

export default class FeedPage extends Component {
	render() {
		return (
			<div>
				<h2>Feed Page</h2>
				<h6>Posts Here....</h6>
				<FeedCard ref = '/venue-profile' key = 'venue-profile' img = {Mount_Snow} text = '@Mount Snow'/>
			</div>
		);
	}
}
