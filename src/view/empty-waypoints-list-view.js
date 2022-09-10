import { AbstractView } from '../framework/view/abstract-view.js';

const createEmptyWaypointsListItemTemplate = (filter) => {
  const { name } = filter;
  return name === 'everything' ? 'Click New Event to create your first point' : 'There are no future events now';
};

const createEmptyWaypointsListTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map( (filter, index) => createEmptyWaypointsListItemTemplate(filter, index === 0) );
  return (
    `<p class="trip-events__msg">${filterItemsTemplate}</p>`
  );
};

class EmptyWaypointsList extends AbstractView {

  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template () {
    return createEmptyWaypointsListTemplate(this.#filters);
  }

}

export { EmptyWaypointsList };
