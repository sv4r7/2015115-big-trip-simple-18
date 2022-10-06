import { RoutePresenter } from './presenter/route-presenter.js';
import { RouteModel } from './model/route-model.js';
import { FilterModel } from './model/filter-model.js';
import { FilterPresenter } from './presenter/filter-presenter.js';
import { routeControlsFiltersContainerElement,
  routeMainContainerElement,
  routeEventSectionElement,
  END_POINT,
  AUTHORIZATION } from './const.js';
import { WaypointsApiService } from './waypoints-api-service.js';
import { NewEventButtonView } from './view/new-event-button-view.js';
import { render } from './framework/render.js';

const routeModel = new RouteModel(new WaypointsApiService(END_POINT, AUTHORIZATION) );
const filterModel = new FilterModel();
const newEventButtonElement = new NewEventButtonView();

const routePresenter = new RoutePresenter(routeModel, filterModel);
const filterPresenter = new FilterPresenter(routeControlsFiltersContainerElement, filterModel, routeModel);

const handleNewEventFormClose = () => {
  newEventButtonElement.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  routePresenter.createEvent(handleNewEventFormClose);
  newEventButtonElement.element.disabled = true;
};

filterPresenter.initiateFilters();
routePresenter.initiatePage();
routeModel.initiateRoute()
  .catch( () => {
    newEventButtonElement.element.disabled = true;
    routeEventSectionElement.firstChild.remove();
    routePresenter.renderLoadingError();
  } )
  .finally( () => {
    render(newEventButtonElement, routeMainContainerElement);
    newEventButtonElement.setClickHandler(handleNewEventButtonClick);
  } );
