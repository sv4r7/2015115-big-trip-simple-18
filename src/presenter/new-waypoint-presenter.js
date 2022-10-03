import { remove, render, RenderPosition } from '../framework/render.js';
import { EditFormView } from '../view/edit-form-view.js';
import { UserAction, UpdateType, EMPTY_WAYPOINT } from '../const.js';
import { isEscKey } from '../util.js';

class NewWaypointPresenter {
  #waypointsListContainer = null;
  #changeData = null;
  #editFormComponent = null;
  #destroyCallback = null;

  constructor(waypointListContainer, changeData) {
    this.#waypointsListContainer = waypointListContainer;
    this.#changeData = changeData;
  }

  initiateNewWaypoint = (cb, destinations, offers) => {
    this.#destroyCallback = cb;
    if (this.#editFormComponent !== null) {
      return;
    }

    this.#editFormComponent = new EditFormView(EMPTY_WAYPOINT, destinations, offers);
    this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editFormComponent.setFormDeleteHandler(this.#handleFormDelete);

    render(this.#editFormComponent, this.#waypointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editFormComponent === null) {
      return;
    }
    this.#destroyCallback?.();

    remove(this.#editFormComponent);
    this.#editFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);

  };

  setSaving = () => {
    this.#editFormComponent.updateElement( {
      isDisabled: true,
      isSaving: true,
    } );
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#editFormComponent.updateElement( {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      } );
    };
    this.#editFormComponent.shake(resetFormState);
  };

  #handleFormSubmit = (waypoint) => {
    this.#changeData(
      UserAction.ADD_ROUTEPOINT,
      UpdateType.MINOR,
      waypoint,
    );
  };

  #handleFormDelete = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt) ) {
      evt.preventDefault();
      this.destroy();
    }
  };

}

export { NewWaypointPresenter };
