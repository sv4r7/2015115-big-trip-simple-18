import { render, replace, remove } from '../framework/render.js';
import { EditFormView } from '../view/edit-form-view.js';
import { WaypointView } from '../view/waypoint-view.js';
import { isEscKey } from '../util.js';
import { State } from '../const.js';

class WaypointPresenter {

  #waypointsContainer = null;
  #waypointComponent = null;
  #editFormComponent = null;
  #changeState = null;

  #waypoint = null;
  #destination = null;
  #offers = null;
  #state = State.DEFAULT;

  constructor(waypointsContainer, changeState) {
    this.#waypointsContainer = waypointsContainer;
    this.#changeState = changeState;
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

  destroy = () => {
    remove(this.#waypointComponent);
    remove(this.#editFormComponent);
  };

  resetView = () => {
    if (this.#state !== State.DEFAULT) {
      this.#editFormComponent.reset(this.#waypoint);
      this.#replaceEditFormToWaypoint();
    }
  };

  #replaceWaypointToEditForm = () => {
    replace(this.#editFormComponent, this.#waypointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeState();
    this.#state = State.EDITING;
  };

  #replaceEditFormToWaypoint = () => {
    replace(this.#waypointComponent, this.#editFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#state = State.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt) ) {
      evt.preventDefault();
      this.#editFormComponent.reset(this.#waypoint);
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
    this.#editFormComponent.reset(this.#waypoint);
    this.#replaceEditFormToWaypoint();
  };

}

export { WaypointPresenter };
