import React, { Component } from "react";
import "../App.css";
import Brewery from "./Brewery.js";
import PropTypes from "prop-types";
import escapeRegEx from "escape-string-regexp"
import sortBy from "sort-by"
import powerdByFoursquare from "../images/powered-by-foursquare-blue.png"
import foursquare from "../images/Foursquare.png"
import { hideMarkers, showMarkers, } from "../util/helpers"; 

class BeerList extends Component {
	static propTypes = {
		breweries: PropTypes.array.isRequired,
		markers: PropTypes.array.isRequired,
	}
	state = {
		query: "",
	}

	updateQuery = (query) => {
		this.setState({ query: query })
	}

	clearQuery = () => {
		this.setState({query: "" })
	}

	render () {
		const { breweries, markers, menuOpen } = this.props
		const { query } = this.state
		let filteredList = undefined;
		if (this.state.query) {
			const match = new RegExp(escapeRegEx(this.state.query), "i")
			filteredList = breweries.filter((brewery) => match.test(brewery.location.city))
		} else {
			filteredList = breweries
		}
		filteredList.sort(sortBy("name"))
		return (
			<div className={menuOpen ? "beer-list-container open" : "beer-list-container"} >
				<div className="filter-brewery">
					<input
						type="text" 
						placeholder="filter by city" 
						className="query"
						role="search"
						aria-labelledby="filter by city"
						tabIndex="0"
						value={query}
						onChange={event => {
							this.updateQuery(event.target.value)
							hideMarkers(markers)
						}}
					/>
				</div>
				<div>
					<div className="foursquare-large">
						<a href="https://foursquare.com/" target="_blank"rel="noopener noreferrer">
							<img src={powerdByFoursquare} alt="Powered by Foursquare" />
						</a>
					</div>
					<div className="foursquare-small">
						<a href="https://foursquare.com/" target="_blank" rel="noopener noreferrer">
							<p>Powered by</p>
							<img src={foursquare} alt="Foursquare Logo" />
						</a>
					</div>

				</div>
				<ul className="beer-list">
				{filteredList !== 0 ? (filteredList.map((breweries) => (
						<Brewery key={breweries.id} className="brewery-list-item" breweries={breweries} openWindow={this.openWindow}/>
					))) : (<li className="brewery-list-item"><p>Sorry, no data avaiable</p></li>)}
				</ul>
				{showMarkers(filteredList, markers)}
			</div>
		)
	}
}

export default BeerList;