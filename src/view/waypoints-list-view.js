import { createElement } from '../render.js';

const createTripWaypointsListElement = () => '<ul class="trip-events__list"></ul>';

class WaypointsListView {
  getTemplate() {
    return createTripWaypointsListElement();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate() );
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export { WaypointsListView };
