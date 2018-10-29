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
	<li className='brewery-list-item' onClick={() => this.openWindow()}>
		<h2 className='brewery-name'>{breweries.name}</h2>
		<p className='brewery-city'>{breweries.location.city}</p>
	</li>

	)}
}

export default Brewery

