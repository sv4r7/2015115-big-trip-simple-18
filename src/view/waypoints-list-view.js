import { createElement } from '../render.js';

const createTripWaypointsListElement = () => '<ul class="trip-events__list"></ul>';

class WaypointsListView {
  #element = null;

  get template() {
    return createTripWaypointsListElement();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

export { WaypointsListView };
