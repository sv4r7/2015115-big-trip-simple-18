import { Observable } from '../framework/observable.js';
import { FilterType } from '../const.js';

class FilterModel extends Observable {

  #filter = FilterType.EVERYTHING;

  get filter () {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };

}

export { FilterModel };
