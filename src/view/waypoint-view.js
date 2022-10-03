import { AbstractView } from '../framework/view/abstract-view.js';
import { formatToTimeDate, formatToDate, formatToDayMonth, formatMinutesToTime } from '../util.js';

const getEventOfferTemplate = (title, price) => (
  `<li class="event__offer">
<span class="event__offer-title">${ title }</span>
&plus;&euro;&nbsp;
<span class="event__offer-price">${ price }</span>
</li>`
);

const createOffers = (point, offers) => {
  let currentOffers = '';
  const offerType = offers.find( (element) => element.type === point.type);
  const offersType = offerType.offers;
  point.offers.forEach( (id) => {
    let currentOfferTitle;
    let currentOfferPrice;
    offersType.map( (element) => {
      if (element.id === id ) {
        currentOfferTitle = element.title;
        currentOfferPrice = element.price;
        currentOffers += getEventOfferTemplate(currentOfferTitle, currentOfferPrice);
      }
    } );
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

  setRollupButtonClicklHandler(cb) {
    this._callback.rollupButtonClick = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupButtonClick);
  }

  #rollupButtonClick = () => {
    this._callback.rollupButtonClick();
  };
}

export { WaypointView };
