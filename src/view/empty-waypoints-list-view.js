import { AbstractView } from '../framework/view/abstract-view.js';

const createEmptyWaypointsListTemplate = (filterTypes, filterName) => {
  const currentFilterType = filterTypes;
  const currentFilterName = filterName;
  return (
    `<p class="trip-events__msg">
    ${ currentFilterType.EVERYTHING === currentFilterName ? 'Click New Event to create your first point' : 'There are no future events now'}
    </p>`
  );
};

class EmptyWaypointsList extends AbstractView {

  #filterTypes = null;
  #filterName = null;

  constructor(filterTypes, filterName) {
    super();
    this.#filterTypes = filterTypes;
    this.#filterName = filterName;
  }

  get template () {
    return createEmptyWaypointsListTemplate(this.#filterTypes, this.#filterName);
  }

}

export { EmptyWaypointsList };
