import { ApiService } from './framework/api-service.js';
import { Method,
  DataType } from './const.js';

class WaypointsApiService extends ApiService {

  get waypoints () {
    return this._load( {url: DataType.POINTS } )
      .then(ApiService.parseResponse);
  }

  get destinations () {
    return this._load( {url: DataType.DESTINATIONS} )
      .then(ApiService.parseResponse);
  }

  get offers () {
    return this._load( {url: DataType.OFFERS} )
      .then(ApiService.parseResponse);
  }

  updateWaypoint = async (waypoint) => {
    const response = await this._load( {
      url: `points/${ waypoint.id }`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(waypoint) ),
      headers: new Headers( {
        'Content-Type': 'application/json'
      } ),
    } );

    const parsedResponce = await ApiService.parseResponse(response);

    return parsedResponce;
  };

  addWaypoint = async (waypoint) => {

    const response = await this._load( {
      url: 'points/',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(waypoint) ),
      headers: new Headers( {
        'Content-Type': 'application/json'
      } ),
    } );
    const parsedResponce = await ApiService.parseResponse(response);
    return parsedResponce;
  };

  deleteWaypoint = async (waypoint) => {
    const response = await this._load( {
      url: `points/${ waypoint.id }`,
      method: Method.DELETE,
    } );
    return response;
  };

  #adaptToServer = (waypoint) => {
    const adaptedWaypoint = {
      ...waypoint,
      'base_price': waypoint.basePrice,
      'date_from': waypoint.dateFrom,
      'date_to': waypoint.dateTo,
    };

    delete adaptedWaypoint.basePrice;
    delete adaptedWaypoint.dateFrom;
    delete adaptedWaypoint.dateTo;

    return adaptedWaypoint;
  };

}

export { WaypointsApiService };
