import { Observable } from '../framework/observable.js';
import { generateRoutePoint } from '../mock/route-point.js';
import { makeDestinations } from '../mock/destination-point.js';
import { CURRENT_OFFERS_COUNT } from '../mock/mock-data.js';
import { OFFERS } from '../mock/mock-data.js';

class RouteModel extends Observable {
  #routes = Array.from( {length:CURRENT_OFFERS_COUNT}, generateRoutePoint);
  #destinations = makeDestinations();
  #offers = OFFERS.slice();

  get routes () {
    return this.#routes;
  }

  get destinations () {
    return this.#destinations;
  }

  get offers () {
    return this.#offers;
  }

  updateRoute = (updateType, update) => {
    const index = this.#routes.findIndex( (route) => route.id === update.id );
    if (index === -1) {
      throw new Error ('Can\'t update unexisting routepoint');
    }

    this.#routes = [
      ...this.#routes.slice(0, index),
      update,
      ...this.#routes.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addRoute = (updateType, update) => {
    this.#routes = [
      update,
      ...this.#routes,
    ];

    this._notify(updateType, update);
  };

  deleteRoute = (updateType, update) => {
    const index = this.#routes.findIndex( (route) => route.id === update.id);

    if (index === -1) {
      throw new Error ('Can\'t delete unexsisting routepoint');
    }

    this.#routes = [
      ...this.#routes.slice(0, index),
      ...this.#routes.slice(index + 1),
    ];

    this._notify(updateType);
  };

}

export { RouteModel };
