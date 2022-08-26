import { render } from '../render.js';
import { FormFiltersView } from '../view/filters-view.js';
import { FormSortingView } from '../view/sort-view.js';
import { EditFormView } from '../view/edit-form-view.js';
import { WaypointsListView } from '../view/waypoints-list-view.js';
import { WaypointView } from '../view/waypoint-view.js';
import { getRandomIndex } from '../util.js';

const routeMainContainerElement = document.querySelector('.trip-main');
const routeControlsFiltersContainerElement = routeMainContainerElement.querySelector('.trip-controls__filters');
const routeEventSectionElement = document.querySelector('.trip-events');

class RoutePresenter {
  #wayPointListElement = new WaypointsListView();
  #routeModel = null;
  #currentRoutes = null;
  #destinations = null;

  initiatePage = (routeModel) => {
    this.#routeModel = routeModel;
    this.#currentRoutes = [...this.#routeModel.routes ];
    this.#destinations = [...this.#routeModel.destinations ];
    render(new FormFiltersView(), routeControlsFiltersContainerElement);
    render(new FormSortingView(), routeEventSectionElement);
    render(this.#wayPointListElement, routeEventSectionElement);
    render(new EditFormView(this.#currentRoutes[ getRandomIndex(this.#currentRoutes) ], this.#destinations[ getRandomIndex(this.#destinations) ] ), this.#wayPointListElement.element );

    for (let i = 0; i <= this.#currentRoutes.length - 1; i++) {
      render(new WaypointView( this.#currentRoutes[i], this.#destinations ), this.#wayPointListElement.element );
    }
  };
}

export { RoutePresenter };
