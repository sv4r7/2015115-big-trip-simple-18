import { AbstractView } from '../framework/view/abstract-view.js';

const createTripWaypointsListElement = () => '<ul class="trip-events__list"></ul>';

class WaypointsListView extends AbstractView {

  get template() {
    return createTripWaypointsListElement();
  }

}

export { WaypointsListView };
