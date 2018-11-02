import React, { Component } from "react";
import "../App.css";
import Blotto from "../images/Blotto.png"


class Error extends Component {

	render () {
		return (
			<div className="map-error">
				<img src={Blotto} alt="An illustration of drunk men" />
				<h3>Error loading content, try again later</h3>
        	</div>
		)
	}
}
export default Error

