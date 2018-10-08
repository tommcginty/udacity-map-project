import React, { Component } from 'react';
import '../App.css';
import * as BreweryAPI from '../api/BreweryAPI.js';
import PropTypes from 'prop-types';

class BeerList extends Component {
	static propTypes = {
		breweries: PropTypes.array.isRequired,
	}
componentDidMount() {
};
	render () {
			console.log(this.props.breweries)
		return (
			<div className='beer-list-container'>
				<div className='filter-brewery'>
					<input
						type='text' 
						placeholder='filter by city' 
						className='query'
						role='search'
					/>
				</div>
				<ul className='beer-list'>
					{this.props.breweries.map((brewery) => (
					<li key={brewery.id} className='contact-list-item'>
						<div className='contact-details'>
							<p>{brewery.name}</p>
							<p>{brewery.location.city}</p>
						</div>
					</li>
					))}
				</ul>
			</div>

			)
	}

}

export default BeerList;