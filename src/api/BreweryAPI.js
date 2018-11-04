import { ClientID, ClientSecret } from "../credentials/Credentials.js"

const fsURL = "https://api.foursquare.com/v2/venues/",
	  version = "20181005",
	  search = "search?ll=39.3643,-74.4229&radius=70000&categoryId=50327c8591d4c4b30a586d5d"
 // Gets all breweies and filter ones that actually have an address and who are actually breweries
export const getAll = () => 
 	fetch(`${fsURL}${search}&client_id=${ClientID}&client_secret=${ClientSecret}&v=${version}`)
    .then(response => {
    	if (response.status !== 200) {
    		throw response
    	} else return response.json()})
    .then(breweries => breweries.response.venues.filter(venue => venue.location.address).filter(venue => venue.categories[0].shortName === "Brewery"))

// Gets information for an individual brewery
export const getBreweryInfo = (breweryId) => 
	fetch(`${fsURL}${breweryId}?&client_id=${ClientID}&client_secret=${ClientSecret}&v=${version}`)
	.then(res => res.json())