import React, { Component } from 'react';
import './App.css';
import * as BreweryAPI from './api/BreweryAPI.js';
import Header from './components/Header.js';
import BeerList from './components/BeerList.js';
import {
  checkData,
  getInfoContent,
  getErrorContent
} from "./util/helpers";  

class neighborhoodMap extends Component {

  state = {
    breweries: [],
    breweries2: [],
    mapNJ: {},
    markers: [],
    infowindow: {},
    menuOpen: true
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
    this.setState({mapNJ: map})
    window.google.maps.event.addListenerOnce(map, 'idle', () => {
          this.makeMarkers(this.state.breweries)
    });
  }

  makeMarkers = (locations) => {
    const infowindow = new window.google.maps.InfoWindow({ maxWidth: 300 });
    let markerArray = []
    let breweryArray = this.state.breweries
    locations.forEach(brewery => {
      let marker = new window.google.maps.Marker({
        position: {lat: brewery.location.lat, lng: brewery.location.lng},
        map: this.state.mapNJ,
        title: brewery.name,
        animation: window.google.maps.Animation.DROP,
        id: brewery.id
      })
      marker.addListener('click', function() {
        const marker = this;
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 1400);
        BreweryAPI.getBreweryInfo(brewery.id)
        .then(data => {
            checkData(marker, data);
            getInfoContent(marker);
          })
        .catch(() => getErrorContent(marker))
        .finally(() => {
          // set content and open window
          infowindow.setContent(marker.infoContent);
          infowindow.open(this.map, marker);
          })
      });
      brewery.marker = marker
      markerArray.push(marker);
    })
    this.setState({ markers: markerArray,
                    infowindow: infowindow,
                    breweries: breweryArray })
  }

  componentDidMount() {
    BreweryAPI.getAll()
    .then(response => {
      this.setState({ breweries: response }, this.renderMap());
    });

  }

  componentDidUpdate() {
    if (!this.state.breweries) {
      alert('Error loading breweries, check your network connection')
    }

      
}

  render() {

    return (
        <div className='container'>
        <Header />

          <BeerList 
            breweries={this.state.breweries} 
            markers={this.state.markers}
            hideMarkers={this.hideMarkers}
            showMarkers={this.showMarkers}
            infowindow={this.infowindow}
          />
            <div id='map'></div>
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
