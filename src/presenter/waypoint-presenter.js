import { render, replace } from '../framework/render.js';
import { EditFormView } from '../view/edit-form-view.js';
import { WaypointView } from '../view/waypoint-view.js';
import { isEscKey } from '../util.js';

class WaypointPresenter {

  #waypointsContainer = null;
  #waypointComponent = null;
  #editFormComponent = null;

  #waypoint = null;
  #destination = null;
  #offers = null;

  constructor(waypointsContainer) {
    this.#waypointsContainer = waypointsContainer;
  }

  initiateWaypoint(waypoint, destination, offers) {

    this.#waypoint = waypoint;
    this.#destination = destination;
    this.#offers = offers;

    this.#waypointComponent = new WaypointView(waypoint, destination, offers);
    this.#editFormComponent = new EditFormView(waypoint, destination, offers);

    this.#waypointComponent.setRollupButtonClicklHandler(this.#handleRollupButtonClick);
    this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editFormComponent.setFormCancelHandler(this.#handleFormCancel);

    render(this.#waypointComponent, this.#waypointsContainer);
  }

  #replaceWaypointToEditForm = () => {
    replace(this.#editFormComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceEditFormToWaypoint = () => {
    replace(this.#waypointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt) ) {
      evt.preventDefault();
      this.#replaceEditFormToWaypoint();
    }
  };

  #handleRollupButtonClick = () => {
    this.#replaceWaypointToEditForm();
  };

  #handleFormSubmit = () => {
    this.#replaceEditFormToWaypoint();
  };

  #handleFormCancel = () => {
    this.#replaceEditFormToWaypoint();
  };

}

export { WaypointPresenter };
