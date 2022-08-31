import { AbstractView } from '../framework/view/abstract-view.js';
import { formatToTimeDate, formatToDate, formatToDayMonth, formatMinutesToTime } from '../util.js';

const createOffers = (point, offers) => {
  let currentOffers = '';
  const offerType = offers.filter( (element) => element.type === point.type );
  const offersType = offerType[0].offers;
  const offersTypeMap = new Map(Object.entries(offersType) );
  point.offers.forEach( (id) => {
    let currentOfferTitle;
    let currentOfferPrice;
    for (const offer of offersTypeMap) {
      if (offer[1].id === id ) {
        currentOfferTitle = offer[1].title;
        currentOfferPrice = offer[1].price;
        currentOffers += (
          `<li class="event__offer">
          <span class="event__offer-title">${ currentOfferTitle }</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${ currentOfferPrice }</span>
          </li>`
        );
      }
    }
  } );
  return currentOffers;
};

const createWaypointElement = (point, destinations, offers) => {
  const { basePrice, dateFrom, dateTo, type, destination } = point;
  const currentPointDestination = destinations.find( (element) => element.id === destination );
  return (
    `<li class="trip-events__item">
<div class="event">
  <time class="event__date" datetime="${ formatToDate(dateFrom) }">${ formatToDayMonth(dateFrom) }</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type} ${currentPointDestination.name}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${ formatToTimeDate(dateFrom) }">${ formatMinutesToTime(dateFrom) }</time>
      &mdash;
      <time class="event__end-time" datetime="${ formatToTimeDate(dateTo) }">${ formatMinutesToTime(dateTo) }</time>
    </p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${ createOffers(point, offers) }
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`
  );
};

class WaypointView extends AbstractView {
  #point = null;
  #destinations = null;
  #element = null;
  #offers = null;

  constructor(point, destinations, offers) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createWaypointElement(this.#point, this.#destinations, this.#offers);
  }

}

export { WaypointView };
