import React, { Component } from 'react';
import '../App.css';
//import * as BreweryAPI from '../api/BreweryAPI.js';
import PropTypes from 'prop-types';
import escapeRegEx from 'escape-string-regexp'
import sortBy from 'sort-by'

class BeerList extends Component {
	static propTypes = {
		breweries: PropTypes.array.isRequired,
		addMarkers: PropTypes.func.isRequired,
		markers: PropTypes.array.isRequired,
		hideMarkers: PropTypes.func.isRequired,

		// mapNJ: PropTypes.object.isRequired
	}
state = {
	query: '',
}

updateQuery = (query) => {
	this.setState({ query: query.trim() })
}

clearQuery = () => {
	this.setState({query: '' })
}



componentDidUpdate() {

};
	render () {
		const { breweries, mapNJ, markers, hideMarkers } = this.props
		const { query } = this.state
		let filteredList
		if (this.state.query) {
			const match = new RegExp(escapeRegEx(this.state.query), 'i')
			filteredList = breweries.filter((brewery) => match.test(brewery.location.city))
		} else {
			filteredList = breweries
		}

		filteredList.sort(sortBy('name'))
		return (
			<div className='beer-list-container'>
				<div className='filter-brewery'>
					<input
						type='text' 
						placeholder='filter by city' 
						className='query'
						role='search'
						value={query}
						onChange={event => {
							this.updateQuery(event.target.value)
							props.hideMarkers(markers)

						}}
					/>
				</div>
				<ul className='beer-list'>
					{filteredList.map((brewery) => (
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