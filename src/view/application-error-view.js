import { AbstractView } from '../framework/view/abstract-view.js';

const createErrorTemplate = () => (
  `<p class="trip-events__msg">
    Sorry...Server is not available...
    </p>`
);

class ApplicationErrorView extends AbstractView {

  get template () {
    return createErrorTemplate();
  }

}

export { ApplicationErrorView };
