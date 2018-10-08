import React, { Component } from 'react';
import '../App.css';
import * as BreweryAPI from '../api/BreweryAPI.js';

class Sidebar extends Component {

	render () {
		return (
			<div className="sidebar">
				<h2>Sidebar</h2>
				<p>Beer</p>
				<p>Beer</p>
				<p>Beer</p>
				<p>Beer</p>
				<p>Beer</p>
			</div>

			)
	}

}

export default Sidebar;