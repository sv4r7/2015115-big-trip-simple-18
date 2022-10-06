import { remove, render, RenderPosition } from '../framework/render.js';
import { FormSortingView } from '../view/form-sorting-view.js';
import { WaypointsListView } from '../view/waypoints-list-view.js';
import { EmptyWaypointsListView } from '../view/empty-waypoints-list-view.js';
import { WaypointPresenter } from './waypoint-presenter.js';
import { NewWaypointPresenter } from './new-waypoint-presenter.js';
import { ApplicationErrorView } from '../view/application-error-view.js';
import { SortType,
  UpdateType,
  UserAction,
  FilterType,
  routeEventSectionElement,
  TimeLimit,
} from '../const.js';
import { sortWaypointUp, sortPrice } from '../util.js';
import { filter } from '../util.js';
import { LoadingWiew } from '../view/loading-view.js';
import { UiBlocker } from '../framework/ui-blocker/ui-blocker.js';

class RoutePresenter {

  #wayPointListContainerElement = new WaypointsListView();
  #loadindElement = new LoadingWiew();
  #errorTemplateElement = new ApplicationErrorView();
  #newWaypointPresenter = null;
  #emptyWaypointList = null;
  #formSortingElement = null;
  #routeModel = null;
  #filterModel = null;
  #waypointPresenter = new Map ();
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor (routeModel, filterModel) {
    this.#routeModel = routeModel;
    this.#filterModel = filterModel;

    this.#newWaypointPresenter = new NewWaypointPresenter(this.#wayPointListContainerElement.element, this.#handleViewAction);

    this.#routeModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

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

  initiatePage = () => {
    this.#renderPageFilling();
  };

  createEvent = (cb) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newWaypointPresenter.initiateNewWaypoint(cb, this.#routeModel.destinations, this.#routeModel.offers);
  };

  renderLoadingError = () => {
    render(this.#errorTemplateElement, routeEventSectionElement);
  };

  #renderEmptyWaypointList = () => {
    this.#emptyWaypointList = new EmptyWaypointsListView (this.#currentFilterType);
    render(this.#emptyWaypointList, routeEventSectionElement);
  };

  #renderFormSortingElement = () => {
    this.#formSortingElement = new FormSortingView(this.#currentSortType);
    this.#formSortingElement.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#formSortingElement, routeEventSectionElement, RenderPosition.AFTERBEGIN);
  };

  #renderWaypointListContainerElement = () => {
    render(this.#wayPointListContainerElement, routeEventSectionElement);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const routes = this.routes;
    const routesCount = routes.length;

    if (routesCount === 0) {
      this.#renderEmptyWaypointList();
      return;
    }
    this.#renderFormSortingElement();

  };

  #renderPageFilling = () => {
    this.#renderWaypointListContainerElement();
    this.#renderWaypointsList();
  };

  #renderLoading = () => {
    render(this.#loadindElement, routeEventSectionElement, RenderPosition.AFTERBEGIN);
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

  #clearWaypointList = ( {resetSortType = false} = {} ) => {
    this.#newWaypointPresenter.destroy();

    this.#waypointPresenter.forEach( (subclass) => subclass.destroy() );
    this.#waypointPresenter.clear();

    remove(this.#formSortingElement);
    remove(this.#loadindElement);

    if (this.#emptyWaypointList) {
      remove(this.#emptyWaypointList);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleStateChange = () => {
    this.#newWaypointPresenter.destroy();
    this.#waypointPresenter.forEach( (subclass) => subclass.resetView() );
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearWaypointList();
    this.#renderWaypointListContainerElement();
    this.#renderWaypointsList();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_ROUTEPOINT:
        this.#waypointPresenter.get(update.id).setSaving();
        try {
          await this.#routeModel.updateWaypoint(updateType, update);
        } catch (err) {
          this.#waypointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_ROUTEPOINT:
        this.#newWaypointPresenter.setSaving();
        try {
          this.#routeModel.addWaypoint(updateType, update);
        } catch (err) {
          this.#newWaypointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_ROUTEPOINT:
        this.#waypointPresenter.get(update.id).setDeleting();
        try {
          this.#routeModel.deleteWaypoint(updateType, update);
        } catch (err) {
          this.#waypointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearWaypointList();
        this.#renderWaypointListContainerElement();
        this.#renderWaypointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearWaypointList( {resetSortType: true } );
        this.#renderWaypointListContainerElement();
        this.#renderWaypointsList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadindElement);
        this.#renderWaypointListContainerElement();
        this.#renderWaypointsList();
        break;
    }
  };

}
export { RoutePresenter };

