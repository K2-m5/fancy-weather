import { createElement } from '../component/component';

export default class BuildDom {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  createControlBlock() {
    const headerRoot = createElement('div', 'controls_block');
    const buttonPanel = createElement('div', 'wrapper', 'button-panel');
    const changePicture = createElement('button', 'button-base', 'change-picture');

    const changeLanguage = createElement('select', 'drop-list-language');
    const languageEN = createElement('option', 'item-language-en');
    const languageRU = createElement('option', 'item-language-ru');
    const languageBY = createElement('option', 'item-language-by');

    languageEN.setAttribute('value', 'en');
    languageEN.innerText = 'EN';
    languageRU.setAttribute('value', 'ru');
    languageRU.innerText = 'RU';
    languageBY.setAttribute('value', 'by');
    languageBY.innerText = 'BY';

    const switchUnitTemp = createElement('div', 'switch-temp');
    const switchUnit = createElement('label', 'switch-label');
    const switchInput = createElement('input', 'switch-input');
    const switchSpan = createElement('span', 'switch-span');
    const switchSpanHandle = createElement('span', 'switch-handle');

    switchUnit.setAttribute('for','switch-input');
    switchInput.setAttribute('checked','true');
    switchSpan.setAttribute('data-on','&degF');
    switchSpan.setAttribute('data-off','&degC');

    const searchPanel = createElement('div', 'wrapper', 'search-panel');
    const formSearchRoot = createElement('form', 'search-root');
    const inputSearch = createElement('input', 'input_base');
    const buttonSearch = createElement('button', 'button-base', 'search-btn');

    formSearchRoot.append(
      inputSearch,
      buttonSearch
    );

    searchPanel.append(
      formSearchRoot
    )

    switchUnit.append(
      switchInput,
      switchSpan,
      switchSpanHandle
    );

    switchUnitTemp.append(
      switchUnit
    );

    changeLanguage.append(
      languageEN,
      languageRU,
      languageBY
    );

    buttonPanel.append(
      changePicture,
      changeLanguage,
      switchUnitTemp
      );

    headerRoot.append(
      buttonPanel,
      searchPanel
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
    mapBlock.id = 'map-block';

    this.rootElement.append(mapBlock);
  }

  buildDom() {
    this.createControlBlock();
    this.createWeatherBlock();
    this.createMapBlock();
  }
}
