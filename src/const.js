import dayjs from 'dayjs';

const routeMainContainerElement = document.querySelector('.trip-main');
const routeControlsFiltersContainerElement = routeMainContainerElement.querySelector('.trip-controls__filters');
const routeEventSectionElement = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic hS2sfS44g6hjk964';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const DataType = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

const SortType = {
  DAY: 'sort-day',
  PRICE: 'sort-price',
};

const State = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
};

const UserAction = {
  UPDATE_ROUTEPOINT: 'UPDATE_ROUTEPOINT',
  ADD_ROUTEPOINT: 'ADD_ROUTEPOINT',
  DELETE_ROUTEPOINT: 'DELETE_ROUTEPOINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const EMPTY_WAYPOINT = {
  'basePrice': 1000,
  'dateFrom': dayjs(),
  'dateTo': dayjs(),
  'destination': '',
  'id': '',
  'type': 'taxi',
  'offers': [1,2,3],
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const OFFER_BY_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export { SortType,
  State,
  FilterType,
  UserAction,
  UpdateType,
  routeControlsFiltersContainerElement,
  routeEventSectionElement,
  routeMainContainerElement,
  EMPTY_WAYPOINT,
  AUTHORIZATION,
  END_POINT,
  Method,
  DataType,
  OFFER_BY_TYPE,
  TimeLimit,
};
