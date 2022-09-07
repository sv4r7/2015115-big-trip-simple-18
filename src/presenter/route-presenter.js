import { render } from '../framework/render.js';
import { FormFiltersView } from '../view/filters-view.js';
import { FormSortingView } from '../view/sort-view.js';
import { WaypointsListView } from '../view/waypoints-list-view.js';
import { EmptyWaypointsList } from '../view/empty-waypoints-list-view.js';
import { EmptyFutureWaypointsList } from '../view/empty-future-waypoints-list-view.js';
import { WaypointPresenter } from './waypoint-presenter.js';
import { SortType, Filter } from '../const.js';
import { sortWaypointUp, sortPrice, filterFutureWaypoints, filterEverythingWaypoints } from '../util.js';


const routeMainContainerElement = document.querySelector('.trip-main');
const routeControlsFiltersContainerElement = routeMainContainerElement.querySelector('.trip-controls__filters');
const routeEventSectionElement = document.querySelector('.trip-events');

class RoutePresenter {

  #emptyWaypointsList = new EmptyWaypointsList();
  #emptyFutureWaypointsList = new EmptyFutureWaypointsList();
  #wayPointListElement = new WaypointsListView();
  #formFiltersElement = new FormFiltersView();
  #formSortingElement = new FormSortingView();
  #routeModel = null;
  #currentRoutes = [];
  #destinations = null;
  #offers = null;
  #waypointPresenter = new Map ();
  #currentSortType = SortType.DAY;
  #currentFilter = Filter.EVERYTHING;
  #defaultWaypoints = [];

  initiatePage = (routeModel) => {
    this.#routeModel = routeModel;
    this.#defaultWaypoints = [...this.#routeModel.routes ];
    this.#currentRoutes = [...this.#routeModel.routes ].sort(sortWaypointUp);
    this.#destinations = [...this.#routeModel.destinations ];
    this.#offers = [...this.#routeModel.offers ];

    this.#renderPageFilling();
    this.#checkChildNodesOnWaypointListElement();
  };

  #renderFormFiltersElement = () => {
    render(this.#formFiltersElement, routeControlsFiltersContainerElement);
    this.#formFiltersElement.setFilterChangeHandler(this.#handleFilterChange);
  };

  #renderFormSortingElement = () => {
    render(this.#formSortingElement, routeEventSectionElement);
    this.#formSortingElement.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderWaypointListElement = () => {
    render(this.#wayPointListElement, routeEventSectionElement);
  };

  #renderPageFilling = () => {
    this.#renderFormFiltersElement();
    this.#renderFormSortingElement();
    this.#renderWaypointListElement();

    this.#renderWaypointsList();
  };

  #renderWaypointsList = () => {
    for (let i = 0; i <= this.#currentRoutes.length - 1; i++) {
      this.#renderWaypoint(this.#currentRoutes[i], this.#destinations, this.#offers);
    }
  };

  #checkChildNodesOnWaypointListElement = () => {
    if (!this.#wayPointListElement.element.hasChildNodes() ) {
      render(this.#emptyWaypointsList, this.#wayPointListElement.element);
      routeControlsFiltersContainerElement.querySelector('#filter-everything').disabled = true;
    }
  };

  #checkChildNodesOnFutureWaypointListElement = () => {
    if (!this.#wayPointListElement.element.hasChildNodes() ) {
      render(this.#emptyFutureWaypointsList, this.#wayPointListElement.element);
      routeControlsFiltersContainerElement.querySelector('#filter-future').disabled = true;
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

  #clearWaypointList = () => {
    this.#waypointPresenter.forEach( (subclass) => subclass.destroy() );
    this.#waypointPresenter.clear();
  };

  #handleFilterChange = (filter) => {
    if (this.#currentFilter === filter) {
      return;
    }
    this.#filterWaypoints(filter);
    this.#clearWaypointList();
    this.#renderWaypointsList();
    this.#checkChildNodesOnWaypointListElement();
    this.#checkChildNodesOnFutureWaypointListElement();
  };

  #filterWaypoints = (filter) => {
    this.#currentRoutes = this.#defaultWaypoints;
    switch (filter) {
      case Filter.EVERYTHING:
        routeEventSectionElement.querySelector('#sort-day').checked = true;
        filterEverythingWaypoints(this.#currentRoutes.sort(sortWaypointUp) );
        this.#handleSortTypeChange(SortType.DAY);
        break;
      case Filter.FUTURE:
        routeEventSectionElement.querySelector('#sort-day').checked = true;
        filterFutureWaypoints(this.#currentRoutes.sort(sortWaypointUp) );
        this.#handleSortTypeChange(SortType.DAY);
        break;
    }
    this.#currentFilter = filter;
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

