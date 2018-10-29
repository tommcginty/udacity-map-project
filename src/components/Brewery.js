import React, { Component } from 'react';
import '../App.css';
//import * as BreweryAPI from '../api/BreweryAPI.js';
import PropTypes from 'prop-types';

class Brewery extends Component {
	static propTypes = {
		breweries: PropTypes.object.isRequired,
	}

	openWindow = () => {
	window.google.maps.event.trigger(this.props.breweries.marker, 'click')
	}



	render () {
		const { breweries } = this.props
		//console.log(breweries)
		return (
	<li>
	<div className='brewery-list-item' onClick={() => this.openWindow()}>
		<p className='brewery-name'>{breweries.name}</p>
		<p className='brewery-city'>{breweries.location.city}</p>
			</div>
	</li>

	)}
}

export default Brewery

/*
<li>
		<p>{breweries.name}</p>
		</div>
</li>
*/