import { createElement } from '../component/component';

export default class BuildDom {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  createControlBlock() {
    const headerRoot = createElement('div', 'controls_block');
    const buttonPanel = createElement('div', 'wrapper', 'button-panel');
    const searchPanel = createElement('div', 'wrapper', 'search-panel');
    const headerTitle = createElement('h1', 'header', 'title');

    headerTitle.innerText = 'Fancy weather';

    headerRoot.append(
      buttonPanel,
      searchPanel,
      headerTitle
    );

    this.rootElement.append(headerRoot);
  }

  createWeatherBlock() {
    const bodyRoot = createElement('div', 'weather-block');
    const weatherToday = createElement('div', 'weather-today');
    const weatherNextDay = createElement('div', 'weather-next-day');

    bodyRoot.append(
      weatherToday,
      weatherNextDay
    )

    this.rootElement.append(bodyRoot);
  }

  createMapBlock() {
    const mapBlock = createElement ('div', 'map-block');

    this.rootElement.append(mapBlock);
  }

  buildDom() {
    this.createControlBlock();
    this.createWeatherBlock();
    this.createMapBlock();
  }
}
