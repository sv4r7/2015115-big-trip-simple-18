import { TripPresenter } from './presenter/trip-presenter.js';
import { RouteModel } from './model/route-points-model.js';

const tripPresenter = new TripPresenter();
const routeModel = new RouteModel();

tripPresenter.initiatePage(routeModel);
