import React, { Component } from 'react';
import '../App.css';
import Brewery from './Brewery.js';
//import * as BreweryAPI from '../api/BreweryAPI.js';
import PropTypes from 'prop-types';
import escapeRegEx from 'escape-string-regexp'
import sortBy from 'sort-by'
import {
  hideMarkers,
  showMarkers,
} from "../util/helpers"; 
class BeerList extends Component {
	static propTypes = {
		breweries: PropTypes.array.isRequired,
		markers: PropTypes.array.isRequired,
		//hideMarkers: PropTypes.func.isRequired,
		//showMarkers: PropTypes.func.isRequired,
	}
state = {
	query: '',
	mapOpen: true
}

updateQuery = (query) => {
	this.setState({ query: query })
}

clearQuery = () => {
	this.setState({query: '' })
}

openWindow = () => {
	window.google.maps.event.trigger(this.props.marker, 'click')
}

toggleBeerList = () => {
	console.log("I was toggled")
}

componentDidMount() {
}


componentDidUpdate() {

};
	render () {
		const { breweries, markers } = this.props
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

			<div className='beer-list-container open'>
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
						<Brewery key={breweries.id} className='brewery-list-item' breweries={breweries}/>
					))}
				</ul>
				{showMarkers(filteredList, markers)}
			</div>

			)
	}

}

export default BeerList;