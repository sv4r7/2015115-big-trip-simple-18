import { render } from '../render.js';
import { FormFiltersView } from '../view/filters-view.js';
import { FormSortingView } from '../view/sort-view.js';
import { EditFormView } from '../view/edit-form-view.js';
import { EventsListView } from '../view/events-list-view.js';
import { WaypointView } from '../view/waypoint-view.js';
import { getRandomIndex } from '../util.js';

const tripMainContainerElement = document.querySelector('.trip-main');
const tripControlsFiltersContainerElement = tripMainContainerElement.querySelector('.trip-controls__filters');
const tripEventSectionElement = document.querySelector('.trip-events');

class TripPresenter {
  wayPointListElement = new EventsListView();

  initiatePage = (routeModel) => {
    this.routeModel = routeModel;
    this.currentRoutes = [...this.routeModel.getRoutes() ];
    this.destinations = [...this.routeModel.getDestinations() ];
    render(new FormFiltersView(), tripControlsFiltersContainerElement);
    render(new FormSortingView(), tripEventSectionElement);
    render(this.wayPointListElement, tripEventSectionElement);
    render(new EditFormView(this.currentRoutes[ getRandomIndex(this.currentRoutes) ], this.destinations[ getRandomIndex(this.destinations) ] ), this.wayPointListElement.getElement() );

    for (let i = 0; i <= this.currentRoutes.length - 1; i++) {
      render(new WaypointView( this.currentRoutes[i], this.destinations ), this.wayPointListElement.getElement() );
    }
  };
}

export { TripPresenter };
