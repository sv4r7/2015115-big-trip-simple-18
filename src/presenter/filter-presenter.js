import {render, replace, remove } from '../framework/render.js';
import { FormFiltersView } from '../view/filters-view';
import { filter } from '../util.js';
import { FilterType, UpdateType } from '../const.js';

class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #routeModel = null;


  #filterComponent = null;

  constructor (filterContainer, filterModel, routeModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#routeModel = routeModel;

    this.#routeModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters () {
    const routes = this.#routeModel.routes;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](routes).length,
      },

      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: filter[FilterType.FUTURE](routes).length,
      },
    ];
  }

  initiateFilters = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FormFiltersView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.initiateFilters();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}


export { FilterPresenter };
