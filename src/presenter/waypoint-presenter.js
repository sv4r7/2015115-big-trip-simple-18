import { render, replace, remove } from '../framework/render.js';
import { EditFormView } from '../view/edit-form-view.js';
import { WaypointView } from '../view/waypoint-view.js';
import { isEscKey } from '../util.js';
import { State, UserAction, UpdateType } from '../const.js';

class WaypointPresenter {

  #waypointsContainer = null;
  #waypointComponent = null;
  #editFormComponent = null;
  #changeState = null;
  #changeData = null;

  #waypoint = null;
  #destination = null;
  #offers = null;
  #state = State.DEFAULT;

  constructor(waypointsContainer, changeData, changeState) {
    this.#waypointsContainer = waypointsContainer;
    this.#changeData = changeData;
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
    this.#editFormComponent.setFormDeleteHandler(this.#handleFormDelete);

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

  #handleFormSubmit = (waypoint) => {
    this.#changeData (
      UserAction.UPDATE_ROUTEPOINT,
      UpdateType.MINOR,
      waypoint,
    );

    this.#replaceEditFormToWaypoint();
  };

  #handleFormDelete = (waypoint) => {
    this.#changeData(
      UserAction.DELETE_ROUTEPOINT,
      UpdateType.MINOR,
      waypoint,
    );
  };

  #handleFormCancel = () => {
    this.#editFormComponent.reset(this.#waypoint);
    this.#replaceEditFormToWaypoint();
  };

}

export { WaypointPresenter };
