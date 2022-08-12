import { createElement } from '../render.js';

const createTripEventsListElement = () => '<ul class="trip-events__list"></ul>';

class EventsListView {
  getTemplate() {
    return createTripEventsListElement();
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

export { EventsListView };
