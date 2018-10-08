import React, { Component } from 'react';
import './App.css';
import * as BreweryAPI from './api/BreweryAPI.js';
import Header from './components/Header.js';
import BeerList from './components/BeerList.js';  
import { buildInfoContent } from './util/helpers.js'


class neighborhoodMap extends Component {

  state = {
    breweries: [],
    markers: []
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBCaNfq4-xCMmvc-H8GARJxFlEJGJpyqsY&callback=initMap")
    window.initMap = this.initMap
  }


  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.514327, lng: -74.663288},
      zoom: 9,
      mapTypeControl: false,
      fullscreenControl: false
    })
    this.state.breweries.map(brewery => {
      let marker = new window.google.maps.Marker({
        position: {lat: brewery.location.lat, lng: brewery.location.lng},
        map: map,
        title: brewery.name,
        animation: window.google.maps.Animation.DROP,
      })
      console.log(brewery.name, brewery.location.address)
      let infowindow =  new window.google.maps.InfoWindow({
        content: brewery.categories[0].shortName
      })
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    })

  }

  componentDidMount() {
    BreweryAPI.getAll()
    .then(response => {
      this.setState({ breweries: response }, this.renderMap());
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container'>
        <BeerList breweries={this.state.breweries}/>
        <div className='map-container'>
          <div id='map'></div>
        </div>
        </div>
      </div>
    )
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}



export default neighborhoodMap;
