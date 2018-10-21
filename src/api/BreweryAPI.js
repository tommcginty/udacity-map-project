// const api = 'https://api.foursquare.com/v2/venues/search?ll=39.3643,-74.4229&radius=70000&categoryId=50327c8591d4c4b30a586d5d&client_id=OLSC5NDYPPZVPXAS3KM0NTJ5404JN0MICQ4F2YLBF00KYV1H&client_secret=4HUJIISYVN1PZPOBDO1P3FAGEFA5TEK0GGUI02HRAE3U0FZ0&v=20181005'

const fsURL = 'https://api.foursquare.com/v2/venues/',
	  clientID = 'OLSC5NDYPPZVPXAS3KM0NTJ5404JN0MICQ4F2YLBF00KYV1H',
	  clientSecret = '4HUJIISYVN1PZPOBDO1P3FAGEFA5TEK0GGUI02HRAE3U0FZ0',
	  version = '20181005',
	  search = 'search?ll=39.3643,-74.4229&radius=70000&categoryId=50327c8591d4c4b30a586d5d&limit=5',
	  api = `${fsURL}${search}&client_id=${clientID}&client_secret=${clientSecret}&v=${version}`

export const getAll = () => 
 	fetch(api)
    .then(res => res.json()) // annoyingly, some results are not actually breweries, so I filter ones that actually have an address and who are actually breweries
    .then(breweries => breweries.response.venues.filter(venue => venue.location.address).filter(venue => venue.categories[0].shortName === "Brewery"))

export const getBreweryInfo = (breweryId) => 
	fetch(`${fsURL}${breweryId}?&client_id=${clientID}&client_secret=${clientSecret}&v=${version}`)
	.then(res => res.json())
	//.then(res => res.response.venue)


const getRandomUser = (breweryId) => {
	let breweryURL = `https://randomuser.me/api`
	fetch(breweryURL)
	.then(res => res.json())
	//.then(info => info.response.venue)
}

export const getAll2 = () => 
 	fetch(api)
    .then(res => res.json()) // annoyingly, some results are not actually breweries, so I filter ones that actually have an address and who are actually breweries
    .then(breweries => breweries.response.venues.filter(venue => venue.location.address).filter(venue => venue.categories[0].shortName === "Brewery"))
    .then(res => res.map(ids => getBreweryInfo(ids.id)))
    .then(res => Promise.all(res))
/* 
 export const getBreweryInfo = (breweryId) => {
  const requestURL = `${fsURL}${breweryId}?&client_id=${clientID}&client_secret=${clientSecret}&v=${version}`;
  return fetch(requestURL).then(response => {
    if (!response.ok) {
      throw response;
    } else return response.json();
  });
};
*/