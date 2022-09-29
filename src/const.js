import dayjs from 'dayjs';

const routeMainContainerElement = document.querySelector('.trip-main');
const routeControlsFiltersContainerElement = routeMainContainerElement.querySelector('.trip-controls__filters');
const routeEventSectionElement = document.querySelector('.trip-events');

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

export { SortType,
  State,
  FilterType,
  UserAction,
  UpdateType,
  routeControlsFiltersContainerElement,
  routeEventSectionElement,
  routeMainContainerElement,
  EMPTY_WAYPOINT,
};
