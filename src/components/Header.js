import React, { Component } from 'react';
import BeerList from './BeerList.js';



class Header extends Component {
	state =  {
	}

	toggleBeerList = () => {
	console.log("I was toggled")
	this.setState({ menuHidden: !this.state.menuHidden})
	}


	render () {
		return (
			<header>
				<a id="menu" className="header__menu" onClick={() => this.toggleBeerList()}>
          			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            		<path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
          			</svg>
        		</a>
			<h1 className="app_header">South Jersey Brewery Finder</h1>
			</header>
			)
	}

}

export default Header;