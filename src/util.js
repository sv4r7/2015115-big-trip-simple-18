import dayjs from 'dayjs';
import { FilterType } from './const.js';

const RANGE_LIMIT = 1;

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getRandomNumber = (startValue, endValue) => {
  if (startValue < 0 || endValue < 0) {
    return;
  }
  const firstNumber = Math.ceil(startValue);
  const secondNumber = Math.floor(endValue);
  if (firstNumber < secondNumber) {
    return Math.floor( Math.random() * (secondNumber - firstNumber + RANGE_LIMIT) ) + firstNumber;
  }
  switch(firstNumber) {
    case secondNumber:
      return firstNumber;
    default: return Math.floor( Math.random() * (firstNumber - secondNumber + RANGE_LIMIT) ) + secondNumber;
  }
};

const formatToUtc = (data) =>dayjs(data).format('YYYY-MM-DDTHH:MM:ss[.]SSS[Z]');

const formatToTimeDate = (data) => dayjs(data).format('YYYY/MM/DD hh:mm');

const formatToTimeDateDual = (data) => dayjs(data).format('DD/MM/YY HH:MM');

const formatToDate = (data) => dayjs(data).format('DD MMMM YYYY');

const formatToDayMonth = (data) => dayjs(data).format('MMM DD');

const formatMinutesToTime = (data) => dayjs(data).format('HH [:] mm');

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortWaypointUp = (waypointA, waypointB) => {
  const weight = getWeightForNullDate(waypointA.dateFrom, waypointB.dateFrom);
  return weight ?? dayjs(waypointA.dateFrom).diff(dayjs(waypointB.dateFrom) );
};

const sortPrice = (waypointA, waypointB) => waypointB.basePrice - waypointA.basePrice;

const isFutureWaypoint = (waypoint) => {
  const dateNow = dayjs();
  return dayjs(waypoint.dateFrom).isAfter(dateNow) || dayjs(waypoint.dateTo).isAfter(dateNow);
};

const filter = {
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.FUTURE]: (waypoints) => waypoints.filter( (waypoint) => isFutureWaypoint(waypoint) ),
};

export { getRandomNumber,
  formatToTimeDate,
  formatToDate,
  sortPrice,
  formatToDayMonth,
  formatMinutesToTime,
  formatToTimeDateDual,
  isEscKey,
  sortWaypointUp,
  filter,
  formatToUtc };
