import { AbstractView } from '../framework/view/abstract-view.js';

const createEmptyWaypointsListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

class EmptyWaypointsList extends AbstractView {

  get template () {
    return createEmptyWaypointsListTemplate();
  }

}

export { EmptyWaypointsList };
