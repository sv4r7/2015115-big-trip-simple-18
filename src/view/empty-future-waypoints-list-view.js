import { AbstractView } from '../framework/view/abstract-view.js';

const createEmptyFutureWaypointsListTemplate = () => (
  '<p class="trip-events__msg">There are no future events now</p>'
);

class EmptyFutureWaypointsList extends AbstractView {

  get template () {
    return createEmptyFutureWaypointsListTemplate();
  }

}

export { EmptyFutureWaypointsList };
