import React, { Component } from 'react';
import './App.css';
import { allLocations } from './Locations.js';
//import Sidebar from './components/Sidebar.js';  



class neighborhoodMap extends Component {

  state = {
    breweries: []
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBCaNfq4-xCMmvc-H8GARJxFlEJGJpyqsY&callback=initMap")
    window.initMap = this.initMap
  }


  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.514327, lng: -74.663288},
      zoom: 10
    })
    this.state.breweries.map(brewery => {
      console.log(brewery.location.lat)
      let marker = new window.google.maps.Marker({
      position: {lat: brewery.location.lat, lng: brewery.location.lng},
      map: map,
      title: 'First Marker!'
      })
    })

  }

  componentDidMount() {
    this.setState({
      breweries: allLocations
    }, this.renderMap())
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
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
