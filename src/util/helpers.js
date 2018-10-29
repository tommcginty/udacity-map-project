import noImage from "../images/no-image-available.png";
import fsButton from "../images/foursquare-button.png";


  // set up fallbacks in case data is incomplete
export const checkData = (marker, data) => {
  const place = data.response.venue;

  const {
    canonicalUrl,
    bestPhoto,
    contact,
    location,
    url,
    tips
  } = place; // destructuring

  marker.canonicalUrl = canonicalUrl ? canonicalUrl : "https://foursquare.com/";
  marker.photo = bestPhoto
    ? `${bestPhoto.prefix}width100${bestPhoto.suffix}` // ES6 template literals
    : noImage;
  marker.phone =
    contact && contact.formattedPhone ? contact.formattedPhone : "";
  marker.address = location.address;
  marker.city = location.city;
  marker.state = location.state;
  marker.postalCode = location.postalCode;
  marker.url = url ? url : " ";

  marker.tip =
    tips.count > 0 ? `"${tips.groups[0].items[0].text}"` : "No tips available";

  return marker;
};


export const getInfoContent = marker => {
  marker.infoContent = `<div class="place">
                      <img class="place-photo" src=${marker.photo} alt="${marker.title}">
                      <div class="place-meta">
                        <h2 class="place-title">${marker.title}</h2>
                        <a class="place-phone" href="tel:${marker.phone}">${marker.phone}</a>
                        <p class="place-contact">${marker.address}</p>
                        <p class="place-contact">${marker.city}, ${marker.state} ${marker.postalCode}</p>
                      </div>
                    </div>
                    <p class="place-contact">
                      <a href="${marker.url}"" target="_blank">${marker.url}</a>
                    </p>
                    <p class="place-tip">Tip: ${marker.tip}</p>
                    <a class="place-link" href="${marker.canonicalUrl}" target="_blank">
                      <span>Read more</span>
                      <img class="fs-link" src="${fsButton}">
                    </a>`;
  return marker;
};

export const getErrorContent = marker => {
  marker.infoContent = `<div class="venue-error"  role="alert">
        <h3>Problem displaying details for ${marker.title} </h3>
        <p>Try again later...</p>
      </div>`;
  return marker;
};

export const hideMarkers = (markersArray) => {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setVisible(false);
  }
}

export const showMarkers = (filteredList, markers) => {
  if (markers.length > 0) {
    for (let i = 0; i < filteredList.length; i++) {
      for (let j = 0; j < markers.length; j++) {
        if (markers[j].title === filteredList[i].name) {
          markers[j].setVisible(true)
        }
      }
    }
  }
}











