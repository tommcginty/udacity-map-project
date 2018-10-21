import React, { Component } from 'react';
import '../App.css';
//import * as BreweryAPI from '../api/BreweryAPI.js';
import PropTypes from 'prop-types';
import escapeRegEx from 'escape-string-regexp'
import sortBy from 'sort-by'

class BeerList extends Component {
	static propTypes = {
		breweries: PropTypes.array.isRequired,
		markers: PropTypes.array.isRequired,
		hideMarkers: PropTypes.func.isRequired,
		showMarkers: PropTypes.func.isRequired,
	}
state = {
	query: '',
}

updateQuery = (query) => {
	this.setState({ query: query })
}

clearQuery = () => {
	this.setState({query: '' })
}

openWindow = () => {
	console.log('foo')
	//window.google.maps.event.trigger(this.props.marker, 'click')
}

componentDidMount() {
}


componentDidUpdate() {

};
	render () {
		const { breweries, mapNJ, markers, hideMarkers, showMarkers} = this.props
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
							hideMarkers(markers)
						}}
					/>
				</div>
				<ul className='beer-list'>
					{filteredList.map((breweries) => (
						<li key={breweries.id} className='contact-list-item'>
							<div className='contact-details' onCLick={this.openWindow}>
									<p>{breweries.name}</p>
									<p>{breweries.location.city}</p>
							</div>
						</li>
					))}
				</ul>
				{showMarkers(filteredList, markers)}
			</div>

			)
	}

}

export default BeerList;