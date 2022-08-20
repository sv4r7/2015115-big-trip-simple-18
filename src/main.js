import { RoutePresenter } from './presenter/route-presenter.js';
import { RouteModel } from './model/route-points-model.js';

const routePresenter = new RoutePresenter();
const routeModel = new RouteModel();

routePresenter.initiatePage(routeModel);
