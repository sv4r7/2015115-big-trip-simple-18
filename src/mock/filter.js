import { filter } from '../util.js';

const generateFilter = (waypoints) => Object.entries(filter).map(
  ( [filterName, filterWaypoints] ) => ({
    name: filterName,
    count: filterWaypoints(waypoints).length,
  }),
);

export { generateFilter };
