import { AbstractStatefulView } from '../framework/view/abstract-stateful-view.js';
import { formatToTimeDateDual } from '../util.js';
import { OFFER_BY_TYPE, DESTINATION_POINT_NAMES } from '../mock/mock-data.js';
import dayjs from 'dayjs';

const getCurrenPointId = (currentCityName, destinations, state) => {
  const cityName = destinations.filter( (element) => element.name === currentCityName );
  const destinationId = (Object.entries(cityName).map( (id) => id[1].id ) );
  state.destination = destinationId[0];
};

const getCurrenPointDescription = (currentCityName, destinations, description) => {
  const cityName = destinations.filter( (element) => element.name === currentCityName );
  const destinationDescription = (Object.entries(cityName).map( (descript) => descript[1].description ) );
  return !destinationDescription[0] ? description : destinationDescription[0];
};

const getCurrenPointPhotos = (currentCityName, destinations, pictures) => {
  const cityName = destinations.filter( (element) => element.name === currentCityName );
  const destinationPhotos = (Object.entries(cityName).map( (photos) => photos[1].pictures ) );
  return !currentCityName ? pictures : destinationPhotos[0];
};

const createOffersForCurrentType = (currentPoint, offers) => {
  const currentOffers = [offers.find( (element) => element.type === currentPoint.type)];
  return currentOffers[0].offers.map( (offer) => ( {
    ...offer,
    checked: currentPoint.offers.includes(offer.id),
  } ) );
};

const createEventTypeItemTemplate = (currentType) => OFFER_BY_TYPE.map( (type) => `<input id="event-type-${ type }" 
  class="event__type-input  
  visually-hidden" type="radio" name="event-type" value="${ type }" ${ currentType === type ? 'checked' : '' }>
  <label class="event__type-label  event__type-label--${ type }" 
  for="event-type-${ type }">${ type }</label>` ).join('');

const createEventOffersTemplate = (waypointOffers, type) => waypointOffers.map( ( offer ) =>
  `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${ type }" type="checkbox" name="event-offer-${ type }" value="${ offer.id }" ${ offer.checked ? 'checked' : '' }>
  <label class="event__offer-label" for="event-offer-${ type }">
  <span class="event__offer-title">${ offer.title }</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${ offer.price }</span>
  </label>
  </div>` ).join('');

const createDestinationsTemplate = (city, type, destinations, state) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${ type }
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${ city }" list="destination-list-1">
  <datalist id="destination-list-1">
  ${ DESTINATION_POINT_NAMES.map( (point) => `<option value="${ point }" ${ point === city ? 'checked' : '' } ${ getCurrenPointId(city, destinations, state) }></option>` ).join('') }
  </datalist>
  </div>`);


const createEditFormElement = (state, destinations, offers) => {
  const { basePrice = '', dateFrom = dayjs() , dateTo = dayjs(), type, destination, currentPointCityName } = state;
  const currentPointDestination = destinations.filter( (element) => element.id === destination );
  const { description, name, pictures } = currentPointDestination[0];
  console.log(state);

  const generatedOffersForCurrentType = createOffersForCurrentType(state, offers);

  return (
    `<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${ type }.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            ${ createEventTypeItemTemplate(type) }
          </div>
        </fieldset>
      </div>
    </div>
    ${ createDestinationsTemplate(currentPointCityName === null ? name : currentPointCityName, type, destinations, state) } 
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ formatToTimeDateDual(dateFrom) }">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ formatToTimeDateDual(dateTo) }">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${ basePrice }">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">  
      ${ createEventOffersTemplate(generatedOffersForCurrentType, type) }
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${ getCurrenPointDescription(currentPointCityName, destinations, description) }</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[0].src }" 
          alt="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[0].description }">
          <img class="event__photo" src="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[1].src }" 
          alt="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[1].description }">
          <img class="event__photo" src="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[2].src }" 
          alt="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[2].description }">
          <img class="event__photo" src="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[3].src }" 
          alt="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[3].description }">
          <img class="event__photo" src="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[4].src }" 
          alt="${ getCurrenPointPhotos(currentPointCityName, destinations, pictures)[4].description }">
        </div>
      </div>
    </section>
  </section>
</form>
</li>`
  );
};

class EditFormView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;

  constructor(point, destinations, offers) {
    super();
    this._state = EditFormView.parseWaypointDataToState(point);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#setInnerHandlers();
  }


  reset = (point) => {
    this.updateElement(
      EditFormView.parseWaypointDataToState(point),
    );
  };

  get template() {
    return createEditFormElement(this._state, this.#destinations, this.#offers);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormCancelHandler(this._callback.formCancel);
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#currentOffersCheckHandler);
  };

  #currentOffersCheckHandler = (evt) => {
    const currentId = evt.target.value;
    console.log(currentId);
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement( {
      currentPointCityName: evt.target.value,
    } );
  };

  #eventTypeChangeHandler = (evt) => {
    this.updateElement( {
      type: evt.target.value,
    } );
  };

  static parseWaypointDataToState = (point) => (
    {
      ...point,
      currentPointCityName: null,
    }
  );

  static parseStateToWaypointData = (state) => {
    const waypointData = {...state};
    delete waypointData.currentPointCityName;
    return waypointData;
  };

  setFormSubmitHandler(cb) {
    this._callback.formSubmit = cb;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToWaypointData(this._state) );
  };

  setFormCancelHandler(cb) {
    this._callback.formCancel = cb;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formCancelHandler);
  }

  #formCancelHandler = () => {
    this._callback.formCancel();
  };
}

export { EditFormView };


/*  const createOffersForCurrentPoint = (currentPoint, currentOffers) => {
    function СurrentOffers (title, price) {
      this.title = title;
      this.price = price;
    }
    const newOffers = [];
    let currentOffer;
    const offerType = currentOffers.filter( (element) => element.type === type );
    const offersType = offerType[0].offers;
    const offersTypeMap = new Map(Object.entries(offersType) );
    const mapedOffersType = Object.entries(offersType).map( (id) => id[1].id );
    state.offers = mapedOffersType;
    currentPoint.offers.forEach( (id) => {
      let currentOfferTitle;
      let currentOfferPrice;
      for (const offer of offersTypeMap) {
        if (offer[1].id === id ) {
          currentOfferTitle = offer[1].title;
          currentOfferPrice = offer[1].price;
          currentOffer = new СurrentOffers(currentOfferTitle, currentOfferPrice);
          newOffers.push(currentOffer);
        }
      }
    } );
    return newOffers;
  };

  const allOffers = createOffersForCurrentPoint(state, offers);

  const createEventOffers = (waypointOffers) => Object.entries(waypointOffers).map( ( offer ) =>
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${ type }" type="checkbox" name="event-offer-${ type }">
    <label class="event__offer-label" for="event-offer-${ type }">
    <span class="event__offer-title">${ offer[1].title }</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${ offer[1].price }</span>
    </label>
    </div>` ).join('');*/
