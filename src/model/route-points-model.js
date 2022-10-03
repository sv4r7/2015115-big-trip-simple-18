import { Observable } from '../framework/observable.js';
import { UpdateType } from '../const.js';

class RouteModel extends Observable {
  #waypointsApiService = null;
  #routes = [];
  #destinations = [];
  #offers = [];

  constructor (waypointsApiService) {
    super();
    this.#waypointsApiService = waypointsApiService;

  }

  initiateModel = async () => {
    try {
      const waypoints = await this.#waypointsApiService.waypoints;
      const destinations = await this.#waypointsApiService.destinations;
      const offers = await this.#waypointsApiService.offers;
      this.#routes = waypoints.map(this.#adaptToClient);
      this.#destinations = destinations;
      this.#offers = offers;
    } catch(err) {
      this.#routes = [];
      this.#destinations = [];
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  };

  get routes () {
    return this.#routes;
  }

  get destinations () {
    return this.#destinations;
  }

  get offers () {
    return this.#offers;
  }

  updateWaypoint = async (updateType, update) => {
    const index = this.#routes.findIndex( (route) => route.id === update.id );
    if (index === -1) {
      throw new Error ('Can\'t update unexisting routepoint');
    }

    try {
      const response = await this.#waypointsApiService.updateWaypoint(update);
      const updatedRoute = this.#adaptToClient(response);
      this.#routes = [
        ...this.#routes.slice(0, index),
        updatedRoute,
        ...this.#routes.slice(index + 1),
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update routepoint');
    }
  };

  addWaypoint = async (updateType, update) => {
    try {
      const response = await this.#waypointsApiService.addWaypoint(update);
      const newRoute = this.#adaptToClient(response);
      this.#routes = [newRoute, ...this.#routes];
      this._notify(updateType, newRoute);
    } catch (err) {
      throw new Error('Can\'t add routepoint');
    }
  };

  deleteWaypoint = async (updateType, update) => {
    const index = this.#routes.findIndex( (route) => route.id === update.id);

    if (index === -1) {
      throw new Error ('Can\'t delete unexsisting routepoint');
    }

    try {
      await this.#waypointsApiService.deleteWaypoint(update);
      this.#routes = [
        ...this.#routes.slice(0, index),
        ...this.#routes.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete routepoint');
    }
  };

  #adaptToClient = (waypoint) => {
    const adaptedWaypoint = {
      ...waypoint,
      basePrice: waypoint['base_price'],
      dateFrom: waypoint['date_from'],
      dateTo: waypoint['date_to'],
    };

    delete adaptedWaypoint['base_price'];
    delete adaptedWaypoint['date_from'];
    delete adaptedWaypoint['date_to'];
    delete adaptedWaypoint['is_favorite'];

    return adaptedWaypoint;
  };

}

export { RouteModel };
