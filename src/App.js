import React, { Component } from 'react';
import './App.css';
import * as BreweryAPI from './api/BreweryAPI.js';
import Header from './components/Header.js';
import BeerList from './components/BeerList.js';  

class neighborhoodMap extends Component {

  state = {
    breweries: [],
    mapNJ: {},
    markers: []
  }
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBCaNfq4-xCMmvc-H8GARJxFlEJGJpyqsY&callback=initMap")
    window.initMap = this.initMap
  }
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.514327, lng: -74.663288},
      zoom: 9,
      mapTypeControl: false,
      fullscreenControl: false
    })
    this.setState({mapNJ: map})
    window.google.maps.event.addListenerOnce(map, 'idle', () => {
          this.setState({mapNJ: map})
          this.makeMarkers(this.state.breweries)
    });
  }

  makeMarkers = (locations) => {
    let markerArray = []
    locations.map(brewery => {
      let marker = new window.google.maps.Marker({
        position: {lat: brewery.location.lat, lng: brewery.location.lng},
        map: this.state.mapNJ,
        title: brewery.name,
        animation: window.google.maps.Animation.DROP,
      })
      let infowindow =  new window.google.maps.InfoWindow({
        content: brewery.categories[0].shortName
      })
      marker.addListener('click', function() {
        infowindow.open(this.state.mapNJ, marker);
      });
      markerArray.push(marker);
    })
    this.setState({ markers: markerArray})
  }

hideMarkers = (markersArray) => {
  let map = this.state.mapNJ
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setVisible(false);
  }
}

showMarkers = (filteredList) => {
  if (this.state.markers.length > 0) {
    for (let i = 0; i < filteredList.length; i++) {
      for (let j = 0; j < this.state.markers.length; j++)
        if (this.state.markers.title === filteredList.name)
          this.state.markers[i].setVisible(true)
    }
  }
}


  componentDidMount() {
    BreweryAPI.getAll()
    .then(response => {
      this.setState({ breweries: response }, this.renderMap());
    });
  }

  componentDidUpdate() {
}

  render() {
    return (
      <div>
        <div className='container'>
          <Header />
          <BeerList 
            breweries={this.state.breweries} 
            markers={this.state.markers}
            hideMarkers={this.hideMarkers}
            showMarkers={this.showMarkers}
          />
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
