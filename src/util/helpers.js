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
    ? `${bestPhoto.prefix}height100${bestPhoto.suffix}` // ES6 template literals
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


// build infowindow content
export const getInfoContent = marker => {
  marker.infoContent = `<div class="place">
                      <img class="place-photo" src=${marker.photo} alt="${marker.title}">
                      <div class="place-meta">
                        <h2 class="place-title">${marker.title}</h2>
                        <a class="place-phone" href="tel:${marker.phone}">${marker.phone}</a>
                        <p class="place-contact">${marker.address}</p>
                        <p class="place-contact">${marker.city}, ${marker.state} ${marker.postalCode}</p>
                        <p class="place-contact">
                          <a href="${marker.url}"" target="_blank">${marker.url}</a>
                        </p>
                      </div>
                    </div>
                    <p class="place-tip">Tip: ${marker.tip}</p>
                    <a class="place-link" href="${marker.canonicalUrl}" target="_blank">
                      <span>Read more</span>
                      <img class="fs-link" src="${fsButton}">
                    </a>`;
  return marker;
};

// build infowindow content when there is an error
export const getErrorContent = marker => {
  marker.infoContent = `<div class="venue-error"  role="alert">
        <h3>Foursquare Venue Details request for ${marker.title} failed</h3>
        <p>Try again later...</p>
      </div>`;
  return marker;
};