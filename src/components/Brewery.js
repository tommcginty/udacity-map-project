import React, { Component } from "react";
import "../App.css";
import PropTypes from "prop-types";

class Brewery extends Component {
	static propTypes = {
		breweries: PropTypes.object.isRequired,
	}

	openWindow = () => {
	window.google.maps.event.trigger(this.props.breweries.marker, "click")
	}
componentDidMount() {
	if(!this.props.breweries)
	console.log("check")
}


	render () {
		const { breweries } = this.props
		return (
	<li tabIndex="0" className="brewery-list-item" onClick={() => this.openWindow()} onKeyPress={() => this.openWindow()}>
			<h2 className="brewery-name">{breweries.name}</h2>
			<p className="brewery-city">{breweries.location.city}</p>
	</li>

	)}
}

export default Brewery

