import { AbstractView } from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const noEventTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyWaypointsListTemplate = (filterType) => {
  const noEventTextValue = noEventTextType[filterType];

  return (
    `<p class="trip-events__msg">
    ${ noEventTextValue }
    </p>`
  );

};

class EmptyWaypointsList extends AbstractView {
  #filterType = null;

  constructor (filterType) {
    super();
    this.#filterType = filterType;
  }

  get template () {
    return createEmptyWaypointsListTemplate(this.#filterType);
  }

}

export { EmptyWaypointsList };
