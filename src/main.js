import { RoutePresenter } from './presenter/route-presenter.js';
import { RouteModel } from './model/route-points-model.js';
import { FilterModel } from './model/filter-model.js';
import { FilterPresenter } from './presenter/filter-presenter.js';
import { routeControlsFiltersContainerElement } from './const.js';

const routeModel = new RouteModel();
const filterModel = new FilterModel();

const routePresenter = new RoutePresenter(routeModel, filterModel);
const filterPresenter = new FilterPresenter(routeControlsFiltersContainerElement, filterModel, routeModel);

routePresenter.initiatePage();
filterPresenter.initiateFilters();
