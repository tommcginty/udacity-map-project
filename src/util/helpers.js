import noImage from "../images/no-image-available.png";
import powerdByFoursquare from "../images/powered-by-foursquare-blue.png";



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
  } = place; 

  marker.canonicalUrl = canonicalUrl ? canonicalUrl : "https://foursquare.com/";
  marker.photo = bestPhoto
    ? `${bestPhoto.prefix}width100${bestPhoto.suffix}`
    : noImage;
  marker.phone =
    contact && contact.formattedPhone ? contact.formattedPhone : "";
  marker.address = location.address;
  marker.city = location.city;
  marker.state = location.state;
  marker.postalCode = location.postalCode ? location.postalCode : "";
  marker.url = url ? url : "";

  marker.tip =
    tips.count > 0 ? `"${tips.groups[0].items[0].text}"` : "No tips available";

  return marker;
};


export const getInfoContent = marker => {
  // If foursquare doesn't have a website listed, search Google
  if(!marker.url) {
    marker.url = `https://www.google.co.in/search?q=${marker.title}`;
  }
  marker.infoContent = `<div class="place">
                      <img class="place-photo" src=${marker.photo} alt="${marker.title}">
                      <div class="place-info">
                        <h2 class="place-title">${marker.title}</h2>
                        <a class="place-phone" href="tel:${marker.phone}">${marker.phone}</a>
                        <p class="place-contact">${marker.address}</p>
                        <p class="place-contact">${marker.city}, ${marker.state} ${marker.postalCode}</p>
                        <p class="place-contact">
                            <a href="${marker.url}"" target="_blank">Visit website</a>
                        </p>
                      </div>
                    </div>
                    <div class="place-footer">
                      <p class="place-tip">Tip: ${marker.tip}</p>
                      <a href="${marker.canonicalUrl}"" target="_blank" rel='noopener noreferrer'>
                        <img src=${powerdByFoursquare} /></a>
                    </div>`;
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
  markersArray.forEach (marker => {
    marker.setVisible(false);
  })
}

export const showMarkers = (filteredList, markers) => {
  if (markers.length > 0) {
    filteredList.forEach (item => {
      markers.forEach (marker => {
        if (marker.title === item.name) {
          marker.setVisible(true)
        }
      })
    })
  }
}










