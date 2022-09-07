import { AbstractView } from '../framework/view/abstract-view.js';
import { Filter } from '../const.js';

const createNewFormFiltersTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
    <label class="trip-filters__filter-label" for="filter-everything" data-filter="${Filter.EVERYTHING}">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
    <label class="trip-filters__filter-label" for="filter-future" data-filter="${Filter.FUTURE}">Future</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`
);

class FormFiltersView extends AbstractView {

  get template() {
    return createNewFormFiltersTemplate();
  }

  setFilterChangeHandler = (cb) => {
    this._callback.filterChange = cb;
    this.element.addEventListener('click', this.#filterChangeHandler);
  };

  #filterChangeHandler = (evt) => {
    if (evt.target.dataset.filter) {
      this._callback.filterChange(evt.target.dataset.filter);
    }
  };

}

export { FormFiltersView };

