import { nanoid } from 'nanoid';
import { getRandomNumber, getRandomIndex } from '../util.js';
import { OFFERS, OFFER_BY_TYPE } from './mock-data.js';

const destinations = [];

let offerType;

const getDestinationId = () => {
  const destinationId = nanoid(5);
  destinations.push(destinationId);
  return destinationId;
};

const getOfferType = () => {
  offerType = OFFER_BY_TYPE[ getRandomIndex(OFFER_BY_TYPE) ];
  return offerType;
};

const getOfferId = (type) => {
  const ids = [];
  const filteredId = OFFERS.filter( (element) => element.type === type );
  filteredId[0].offers.forEach( (element) => ids.push(element.id) );
  return ids;
};

const generateRoutePoint = () => (
  {
    'basePrice': getRandomNumber(0, 2000),
    'dateFrom': `2023-07-${getRandomNumber(10,30)}T22:${getRandomNumber(10,59)}:56.845Z`,
    'dateTo': `2023-${getRandomNumber(10,12)}-${getRandomNumber(10,30)}T${getRandomNumber(10,23)}:22:13.375Z`,
    'destination': getDestinationId(),
    'id': nanoid(10),
    'type': getOfferType(),
    'offers': getOfferId(offerType)
  }
);

export { generateRoutePoint, destinations };
