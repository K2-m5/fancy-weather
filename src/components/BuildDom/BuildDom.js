import { createElement } from '../component/component';

export class BuildDom {
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
    switchSpan.setAttribute('data-on','&deg;F');
    switchSpan.setAttribute('data-off','&deg;C');

    const searchPanel = createElement('div', 'wrapper', 'search-panel');
    const formSearchRoot = createElement('form', 'search-root');
    const inputSearch = createElement('input', 'input_base');
    const buttonSearch = createElement('button', 'button-base', 'search-btn');

    buttonSearch.innerText = 'Search';

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
    const bodyRoot = createElement('section', 'information-block');
    const weatherBlock = createElement('div', 'weather_block');
    const weatherCity = createElement('div', 'weather_today_block--city_country', 'text_base');
    const weatherDate =createElement('div', 'text_base', 'weather_today_block--date_time');
    const weatherToday = createElement('div', 'weather-today');
    const weatherTodayTemp = createElement('div', 'text_base', 'weather_today_block--temp')
    const weatherTodayImg = createElement('img', 'weather_today_block--sign')

    const weatherNextDayList = createElement('div', 'weather_days_block');
    const weatherNextDay1 = createElement('div', 'day_block');
    const weatherNextDay2 = createElement('div', 'day_block');
    const weatherNextDay3 = createElement('div', 'day_block');
    const mapBlock = createElement ('div', 'map-block');
    const map = createElement ('div', 'map');
    map.id = 'map';
    weatherTodayImg.setAttribute('src', 'assets/img/rain.png')

    weatherCity.innerText = 'Belarus, Minsk';
    weatherDate.innerText = toString(new Date);
    weatherTodayTemp.innerText = '+54';
    weatherNextDay1.innerText = '+55';
    weatherNextDay2.innerText = '+55';
    weatherNextDay3.innerText = '+55';

    weatherToday.append(
      weatherTodayTemp,
      weatherTodayImg
    )

    weatherNextDayList.append(
      weatherNextDay1,
      weatherNextDay2,
      weatherNextDay3
    )

    weatherBlock.append(
      weatherCity,
      weatherDate,
      weatherToday,
      weatherNextDayList
    )

    mapBlock.append(
      map
    )

    bodyRoot.append(
      weatherBlock,
      mapBlock
    )

    this.rootElement.append(bodyRoot);
  }

  buildDom() {
    this.createControlBlock();
    this.createWeatherBlock();
  }
}
