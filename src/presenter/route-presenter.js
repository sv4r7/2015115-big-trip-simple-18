import { render } from '../render.js';
import { FormFiltersView } from '../view/filters-view.js';
import { FormSortingView } from '../view/sort-view.js';
import { WaypointsListView } from '../view/waypoints-list-view.js';
import { WaypointView } from '../view/waypoint-view.js';
import { EditFormView } from '../view/edit-form-view.js';
import { isEscKey } from '../util.js';
import { EmptyWaypointsList } from '../view/empty-waypoints-list-view.js';

const routeMainContainerElement = document.querySelector('.trip-main');
const routeControlsFiltersContainerElement = routeMainContainerElement.querySelector('.trip-controls__filters');
const routeEventSectionElement = document.querySelector('.trip-events');

class RoutePresenter {

  #emptyWaypointsList = new EmptyWaypointsList();
  #wayPointListElement = new WaypointsListView();
  #routeModel = null;
  #currentRoutes = null;
  #destinations = null;
  #offers = null;

  initiatePage = (routeModel) => {
    this.#routeModel = routeModel;
    this.#currentRoutes = [...this.#routeModel.routes ];
    this.#destinations = [...this.#routeModel.destinations ];
    this.#offers = [...this.#routeModel.offers ];
    render(new FormFiltersView(), routeControlsFiltersContainerElement);
    render(new FormSortingView(), routeEventSectionElement);
    render(this.#wayPointListElement, routeEventSectionElement);

    this.#renderPageFilling();
  };

  #renderPageFilling = () => {
    if(!this.#wayPointListElement) {
      render(this.#emptyWaypointsList, this.#wayPointListElement.element);
    } else {
      for (let i = 0; i <= this.#currentRoutes.length - 1; i++) {
        this.#renderWaypoint(this.#currentRoutes[i], this.#destinations, this.#offers);
      }
    }
  };

  #renderWaypoint = (waypoint, destination, offers) => {
    const waypointComponent = new WaypointView(waypoint, destination, offers);
    const editFormComponent = new EditFormView(waypoint, destination, offers);
    const replaceWaypointToEditForm = () => {
      this.#wayPointListElement.element.replaceChild(editFormComponent.element, waypointComponent.element);
    };
    const replaceEditFormToWaypoint = () => {
      this.#wayPointListElement.element.replaceChild(waypointComponent.element, editFormComponent.element);
    };

    const onEscKeydown = (evt) => {
      if (isEscKey(evt) ) {
        evt.preventDefault();
        replaceEditFormToWaypoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    waypointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceWaypointToEditForm();
      document.addEventListener('keydown', onEscKeydown);
    });
    editFormComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToWaypoint();
      document.removeEventListener('keydown', onEscKeydown);
    });
    editFormComponent.element.querySelector('.event__reset-btn').addEventListener('click', ()=> {
      replaceEditFormToWaypoint();
      document.removeEventListener('keydown', onEscKeydown);
    });

    render(waypointComponent, this.#wayPointListElement.element);
  };

}

export { RoutePresenter };
