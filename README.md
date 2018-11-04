# Udacity Neighborhood Map Project

For this project, I wanted to find a good IPA using an API, so I built this single page web app. It created was with React.js, Google Maps FourSquare. View the demo here:
[sj-craft-beer.surge.sh](#http://sj-craft-beer.surge.sh/)

## Features

- View breweries as map and a list.
- View brewery details via FourSquare by clicking a marker or list entry.
- Filter breweries by city.
- Responsive design for mobile viewing.
- Information is stored for offline use.


## Using the South Jersey Craft Beer Directory

This project was built using [npm](https://nodejs.org/en/)  6.4.1 and [yarn](https://yarnpkg.com/en/) 1.9.4.
- Download or clone the repository
- You will need to obtain your own API keys from [Google](https://developers.google.com/maps/documentation/javascript/get-api-key) and [FourSquare](https://developer.foursquare.com/docs/api)
- Navigate to the project directory and install the dependencies using
```bash
npm install
```
### To run the project in development mode, run:
```bash
yarn start
```
This will open the project in a new browser tab. If not, enter http://localhost:3000 in your browser's address bar.
Note: This will run the project without the service worker.

### To run the project in production mode, run:
```bash
yarn build
```
then run
```bash
serve -s build
```
This will open the project in a new browser tab. If not, enter http://localhost:5000 in your browser's address bar.
This will run the project with the service worker.

## Resources:
- [Google Maps API - Google Developers](https://developers.google.com/maps/documentation/)
- [Foursquare API](https://developer.foursquare.com/)
- [Create-react-app](https://github.com/facebook/create-react-app)
- [Creative Commons](https://search.creativecommons.org/)

## License:
The content of this repository is licensed under a MIT license.