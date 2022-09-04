import { render } from '../framework/render.js';
import { FormFiltersView } from '../view/filters-view.js';
import { FormSortingView } from '../view/sort-view.js';
import { WaypointsListView } from '../view/waypoints-list-view.js';
import { EmptyWaypointsList } from '../view/empty-waypoints-list-view.js';
import { WaypointPresenter } from './waypoint-presenter.js';

const routeMainContainerElement = document.querySelector('.trip-main');
const routeControlsFiltersContainerElement = routeMainContainerElement.querySelector('.trip-controls__filters');
const routeEventSectionElement = document.querySelector('.trip-events');

class RoutePresenter {

  #emptyWaypointsList = new EmptyWaypointsList();
  #wayPointListElement = new WaypointsListView();
  #formFiltersElement = new FormFiltersView();
  #formSortingElement = new FormSortingView();
  #routeModel = null;
  #currentRoutes = null;
  #destinations = null;
  #offers = null;
  #waypointPresenter = new Map ();

  initiatePage = (routeModel) => {
    this.#routeModel = routeModel;
    this.#currentRoutes = [...this.#routeModel.routes ];
    this.#destinations = [...this.#routeModel.destinations ];
    this.#offers = [...this.#routeModel.offers ];

    this.#renderPageFilling();
    this.#checkChildNodesOnWaypointListElement();
  };

  #renderFormFiltersElement = () => {
    render(this.#formFiltersElement, routeControlsFiltersContainerElement);
  };

  #renderFormSortingElement = () => {
    render(this.#formSortingElement, routeEventSectionElement);
  };

  #renderWaypointListElement = () => {
    render(this.#wayPointListElement, routeEventSectionElement);
  };

  #renderPageFilling = () => {
    this.#renderFormFiltersElement();
    this.#renderFormSortingElement();
    this.#renderWaypointListElement();

    for (let i = 0; i <= this.#currentRoutes.length - 1; i++) {
      this.#renderWaypoint(this.#currentRoutes[i], this.#destinations, this.#offers);
    }
  };

  #checkChildNodesOnWaypointListElement = () => {
    if (!this.#wayPointListElement.element.hasChildNodes() ) {
      render(this.#emptyWaypointsList, this.#wayPointListElement.element);
    }
  };

  #renderWaypoint = (waypoint, destination, offers) => {
    const waypointPresenter = new WaypointPresenter(
      this.#wayPointListElement.element,
      this.#handleStateChange
    );
    waypointPresenter.initiateWaypoint(
      waypoint,
      destination,
      offers
    );
    this.#waypointPresenter.set(waypoint.id, waypointPresenter);
  };

  #handleStateChange = () => {
    this.#waypointPresenter.forEach( (subclass) => subclass.resetView() );
  };

}
export { RoutePresenter };
