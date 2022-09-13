import { AbstractView } from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const createEmptyWaypointsListTemplate = () => (
  `<p class="trip-events__msg">
  ${FilterType.EVERYTHING ? 'Click New Event to create your first point' : 'There are no future events now'}
  </p>`
);

class EmptyWaypointsList extends AbstractView {

  get template () {
    return createEmptyWaypointsListTemplate();
  }

}

export { EmptyWaypointsList };
