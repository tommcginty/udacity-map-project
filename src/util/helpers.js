export const buildInfoContent = marker => {
  marker.infoContent = `<div class="place">
                      <img class="place-photo" src=${marker.photo} alt="${marker.title}">
                      <div class="place-meta">
                        <h2 class="place-title">${marker.title}</h2>
                        <p class="place-data">${marker.category}</p>
                        <p class="place-price">${marker.price}</p>
                        <p class="place-contact">${marker.address}</p>
                        <a class="place-phone" href="tel:${marker.phone}">${marker.phone}</a>
                      </div>
                    </div>
                    <p class="place-tip">${marker.tip}</p>
                    <a class="place-link" href="${marker.url}" target="_blank">
                      <span>Read more</span>
                    </a>`;
  return marker;
};