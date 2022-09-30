import { remove, render, RenderPosition } from '../framework/render.js';
import { FormSortingView } from '../view/sort-view.js';
import { WaypointsListView } from '../view/waypoints-list-view.js';
import { EmptyWaypointsList } from '../view/empty-waypoints-list-view.js';
import { NewEventButton } from '../view/new-event-btn-view.js';
import { WaypointPresenter } from './waypoint-presenter.js';
import { NewWaypointPresenter } from './new-waypoint-presenter.js';
import { SortType,
  UpdateType,
  UserAction,
  FilterType,
  routeEventSectionElement,
  routeMainContainerElement,
} from '../const.js';
import { sortWaypointUp, sortPrice } from '../util.js';
import { filter } from '../util.js';

class RoutePresenter {

  #wayPointListContainerElement = new WaypointsListView();
  #newEventButtonElement = new NewEventButton();
  #newWaypointPresenter = null;
  #emptyWaypointList = null;
  #formSortingElement = null;
  #routeModel = null;
  #filterModel = null;
  #waypointPresenter = new Map ();
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;

  constructor (routeModel, filterModel) {
    this.#routeModel = routeModel;
    this.#filterModel = filterModel;

    this.#newWaypointPresenter = new NewWaypointPresenter(this.#wayPointListContainerElement.element, this.#handleViewAction);

    this.#routeModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  initiatePage = () => {
    this.#renderPageFilling();
  };

  createEvent = (cb) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newWaypointPresenter.initiateNewWaypoint(cb, this.#routeModel.destinations, this.#routeModel.offers);
  };

  get routes () {
    this.#currentFilterType = this.#filterModel.filter;
    const currentRoutes = this.#routeModel.routes;
    const filteredRoutes = filter[this.#currentFilterType](currentRoutes);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredRoutes.sort(sortWaypointUp);
      case SortType.PRICE:
        return filteredRoutes.sort(sortPrice);
    }

    return filteredRoutes;
  }

  #handleNewEventFormClose = () => {
    this.#newEventButtonElement.element.disabled = false;
  };

  #handleNewEventButtonClick = () => {
    this.createEvent(this.#handleNewEventFormClose);
    this.#newEventButtonElement.element.disabled = true;
  };

  #renderNewEventButtonElement = () => {
    render(this.#newEventButtonElement, routeMainContainerElement);
    this.#newEventButtonElement.setClickHandler(this.#handleNewEventButtonClick);
  };

  #renderEmptyWaypointList = () => {
    this.#emptyWaypointList = new EmptyWaypointsList (this.#currentFilterType);
    render(this.#emptyWaypointList, routeEventSectionElement);
  };

  #renderFormSortingElement = () => {
    this.#formSortingElement = new FormSortingView(this.#currentSortType);
    this.#formSortingElement.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#formSortingElement, routeEventSectionElement, RenderPosition.AFTERBEGIN);
  };

  #renderWaypointListContainerElement = () => {
    render(this.#wayPointListContainerElement, routeEventSectionElement);
  };

  #renderPageFilling = () => {
    const routes = this.routes;
    const routesCount = routes.length;

    this.#renderNewEventButtonElement();

    if (routesCount === 0) {
      this.#renderEmptyWaypointList();
      return;
    }
    this.#renderFormSortingElement();
    this.#renderWaypointListContainerElement();

    this.#renderWaypointsList();
  };

  #renderWaypointsList = () => {
    this.routes.forEach( (waypoint) => this.#renderWaypoint(waypoint, this.#routeModel.destinations, this.#routeModel.offers) );
  };

  #renderWaypoint = (waypoint, destination, offers) => {
    const waypointPresenter = new WaypointPresenter(
      this.#wayPointListContainerElement.element,
      this.#handleViewAction,
      this.#handleStateChange,
    );
    waypointPresenter.initiateWaypoint(
      waypoint,
      destination,
      offers
    );
    this.#waypointPresenter.set(waypoint.id, waypointPresenter);
  };

  #handleStateChange = () => {
    this.#newWaypointPresenter.destroy();
    this.#waypointPresenter.forEach( (subclass) => subclass.resetView() );
  };

  #clearWaypointList = ( {resetSortType = false} = {} ) => {
    this.#newWaypointPresenter.destroy();

    this.#waypointPresenter.forEach( (subclass) => subclass.destroy() );
    this.#waypointPresenter.clear();

    remove(this.#formSortingElement);

    if (this.#emptyWaypointList) {
      remove(this.#emptyWaypointList);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearWaypointList();
    this.#renderFormSortingElement();
    this.#renderWaypointsList();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_ROUTEPOINT:
        this.#routeModel.updateRoute(updateType, update);
        break;
      case UserAction.ADD_ROUTEPOINT:
        this.#routeModel.addRoute(updateType, update);
        break;
      case UserAction.DELETE_ROUTEPOINT:
        this.#routeModel.deleteRoute(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearWaypointList();
        this.#renderFormSortingElement();
        this.#renderWaypointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearWaypointList( {resetSortType: true } );
        this.#renderFormSortingElement();
        this.#renderWaypointsList();
        break;
    }
  };

}
export { RoutePresenter };
