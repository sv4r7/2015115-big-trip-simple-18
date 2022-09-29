import { AbstractView } from '../framework/view/abstract-view';

const createNewEventButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

class NewEventButton extends AbstractView {

  get template() {
    return createNewEventButtonTemplate();
  }

  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

}

export { NewEventButton };
