import { createElement } from '../render.js';

const createEmptyWaypointsListTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

class EmptyWaypointsList {
  #element = null;

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template () {
    return createEmptyWaypointsListTemplate();
  }

  removeElement () {
    this.#element = null;
  }
}

export { EmptyWaypointsList };
