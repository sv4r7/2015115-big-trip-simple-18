import { generateRoutePoint } from '../mock/route-point.js';
import { makeDestinations } from '../mock/destination-point.js';
import { CURRENT_OFFERS_COUNT } from '../mock/mock-data.js';
import { OFFERS } from '../mock/mock-data.js';

class RouteModel {
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
}

export { RouteModel };
