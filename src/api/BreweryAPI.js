const api = 'https://api.foursquare.com/v2/venues/search?ll=39.3643,-74.4229&radius=70000&categoryId=50327c8591d4c4b30a586d5d&client_id=OLSC5NDYPPZVPXAS3KM0NTJ5404JN0MICQ4F2YLBF00KYV1H&client_secret=4HUJIISYVN1PZPOBDO1P3FAGEFA5TEK0GGUI02HRAE3U0FZ0&v=20181005'

 export const getAll = () =>
  fetch(api)
    .then(res => res.json()) // annoyingly, some results are not actually breweries, so I filter ones that actually have an address and who are actually breweries
    .then(breweries => breweries.response.venues.filter(venue => venue.location.address).filter(venue => venue.categories[0].shortName === "Brewery"))
