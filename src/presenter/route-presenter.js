import { render } from '../framework/render.js';
import { FormFiltersView } from '../view/filters-view.js';
import { FormSortingView } from '../view/sort-view.js';
import { WaypointsListView } from '../view/waypoints-list-view.js';
import { EmptyWaypointsList } from '../view/empty-waypoints-list-view.js';
import { WaypointPresenter } from './waypoint-presenter.js';
import { SortType } from '../const.js';
import { sortWaypointUp, sortPrice } from '../util.js';
import { generateFilter } from '../mock/filter.js';

const routeMainContainerElement = document.querySelector('.trip-main');
const routeControlsFiltersContainerElement = routeMainContainerElement.querySelector('.trip-controls__filters');
const routeEventSectionElement = document.querySelector('.trip-events');

class RoutePresenter {

  #wayPointListContainerElement = new WaypointsListView();
  #formSortingElement = new FormSortingView();
  #routeModel = null;
  #currentRoutes = [];
  #destinations = null;
  #offers = null;
  #filters = [];
  #waypointPresenter = new Map ();
  #currentSortType = SortType.DAY;
  #defaultWaypoints = [];

  initiatePage = (routeModel) => {
    this.#routeModel = routeModel;
    this.#defaultWaypoints = [...this.#routeModel.routes ];
    this.#currentRoutes = [...this.#routeModel.routes ].sort(sortWaypointUp);
    this.#destinations = [...this.#routeModel.destinations ];
    this.#offers = [...this.#routeModel.offers ];
    this.#filters = generateFilter(this.#currentRoutes);

    this.#renderPageFilling();
  };

  #renderFormFiltersElement = () => {
    render(new FormFiltersView(this.#filters), routeControlsFiltersContainerElement);
  };

  #renderFormSortingElement = () => {
    render(this.#formSortingElement, routeEventSectionElement);
    this.#formSortingElement.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderWaypointListContainerElement = () => {
    render(this.#wayPointListContainerElement, routeEventSectionElement);
  };

  #renderPageFilling = () => {
    this.#renderFormFiltersElement();
    this.#renderFormSortingElement();
    this.#renderWaypointListContainerElement();

    this.#renderWaypointsList();
  };

  #renderWaypointsList = () => {
    if (this.#currentRoutes.length === 0) {
      render(new EmptyWaypointsList(), this.#wayPointListContainerElement.element);
    } else {
      this.#currentRoutes.forEach( (waypoint) => this.#renderWaypoint(waypoint, this.#destinations, this.#offers) );
    }
  };

  #renderWaypoint = (waypoint, destination, offers) => {
    const waypointPresenter = new WaypointPresenter(
      this.#wayPointListContainerElement.element,
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

  #clearWaypointList = () => {
    this.#waypointPresenter.forEach( (subclass) => subclass.destroy() );
    this.#waypointPresenter.clear();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortWaypoints(sortType);
    this.#clearWaypointList();
    this.#renderWaypointsList();
  };

  #sortWaypoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#currentRoutes.sort(sortWaypointUp);
        break;
      case SortType.PRICE:
        this.#currentRoutes.sort(sortPrice);
        break;
    }
    this.#currentSortType = sortType;
  };

}
export { RoutePresenter };
