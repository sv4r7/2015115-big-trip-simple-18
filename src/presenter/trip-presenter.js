import { render } from '../render.js';
import { FormFiltersView } from '../view/filters-view.js';
import { FormSortingView } from '../view/sort-view.js';
import { EditFormView } from '../view/edit-form-view.js';
import { EventsListView } from '../view/events-list-view.js';
import { WaypointView } from '../view/waypoint-view.js';

const tripMainContainerElement = document.querySelector('.trip-main');
const tripControlsFiltersContainerElement = tripMainContainerElement.querySelector('.trip-controls__filters');
const tripEventSectionElement = document.querySelector('.trip-events');

class TripPresenter {
  wayPointListElement = new EventsListView();

  initiatePage = () => {
    render(new FormFiltersView(), tripControlsFiltersContainerElement);
    render(new FormSortingView(), tripEventSectionElement);
    render(this.wayPointListElement, tripEventSectionElement);
    render(new EditFormView(), this.wayPointListElement.getElement() );

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.wayPointListElement.getElement() );
    }
  };
}

export { TripPresenter };
