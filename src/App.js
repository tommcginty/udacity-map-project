import React, { Component } from "react";
import "./App.css";
import * as BreweryAPI from "./api/BreweryAPI.js";
import BeerList from "./components/BeerList.js";
import {
  checkData,
  getInfoContent,
  getErrorContent
} from "./util/helpers";  

class neighborhoodMap extends Component {

  state = {
    breweries: [],
    mapNJ: {},
    markers: [],
    infowindow: {},
    menuOpen: false,
    mapLoaded:false
  }
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBCaNfq4-xCMmvc-H8GARJxFlEJGJpyqsY&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: {lat: 39.514327, lng: -74.663288},
      zoom: 2,
      mapTypeControl: false,
      fullscreenControl: false
    })
    this.setState({mapNJ: map})
    window.google.maps.event.addListenerOnce(map, "idle", () => {
          this.makeMarkers(this.state.breweries)
    });
  }
  // Loops through each brewery and creates a marker
  makeMarkers = (locations) => {
    const infowindow = new window.google.maps.InfoWindow();
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
      marker.addListener("click", function() {
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
    // Makes the map the size of the marker boundries
    let bounds = new window.google.maps.LatLngBounds()
    markerArray.forEach(marker =>{
      bounds.extend(marker.getPosition());
      })
    let map = this.state.mapNJ;
    map.fitBounds(bounds)
    this.setState({ markers: markerArray,
                    infowindow: infowindow,
                    breweries: breweryArray,
                    mapLoaded: true })
  }


  toggleBeerList = () => {
  this.setState({ menuOpen: !this.state.menuOpen})
  }

  componentDidMount() {
    BreweryAPI.getAll()
    .then(this.setState({ mapLoaded: true }))
    .then(response => {
      this.setState({ breweries: response }, this.renderMap());
    })
    .catch((err) => {
      this.setState({ mapLoaded: false })
    })

  }

  render() {
    const { mapLoaded, menuOpen, breweries, markers, infowindow } = this.state
    return (
      <div className="container" role="main">
        <header>
          <nav id="menu" className="header-menu" tabIndex="0" onClick={() => this.toggleBeerList()} onKeyPress={() => this.toggleBeerList()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" alt="Menu">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            </svg>
          </nav>
          <h1 className="app-header">South Jersey Craft Beer Directory</h1>
        </header>

        <div className="map-container">
          <BeerList 
          menuOpen={menuOpen}
          breweries={breweries} 
          markers={markers}
          infowindow={infowindow}
        />
        {mapLoaded ? ( <div id="map"></div> ) : (
        <div className="map-error">
          <h3>Error loading content, try again later</h3>
        </div>) /* Error handling if the map doesn't load */}
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
