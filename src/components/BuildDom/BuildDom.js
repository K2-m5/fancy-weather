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

    const weatherTodayInfoList = createElement('div', 'weather_today_block--info_list')
    const weatherTodayInfoListItem1 = createElement('div', 'text_base', 'weather_today_block--info_list-item')
    const weatherTodayInfoListItem2 = createElement('div', 'text_base', 'weather_today_block--info_list-item')
    const weatherTodayInfoListItem3 = createElement('div', 'text_base', 'weather_today_block--info_list-item')
    const weatherTodayInfoListItem4 = createElement('div', 'text_base', 'weather_today_block--info_list-item')

    const weatherNextDayList = createElement('div', 'weather_days_block');
    const weatherNextDay1 = createElement('div', 'day_block');
    const weatherNextDayWeak1 = createElement('div', 'text_base', 'day_block--name');
    const weatherNextDay1Temp = createElement('div', 'text_base', 'day_block--temp');
    const weatherNextDay1Img =createElement('img', 'day_block--sign')

    const weatherNextDay2 = createElement('div', 'day_block');
    const weatherNextDayWeak2 = createElement('div', 'text_base', 'day_block--name');
    const weatherNextDay2Temp = createElement('div', 'text_base', 'day_block--temp');
    const weatherNextDay2Img =createElement('img', 'day_block--sign')

    const weatherNextDay3 = createElement('div', 'day_block');
    const weatherNextDayWeak3 = createElement('div', 'text_base', 'day_block--name');
    const weatherNextDay3Temp = createElement('div', 'text_base', 'day_block--temp');
    const weatherNextDay3Img =createElement('img', 'day_block--sign')

    const mapBlock = createElement ('div', 'map-block');
    const map = createElement ('div', 'map');
    map.id = 'map';
    weatherTodayImg.setAttribute('src', 'assets/img/rain.png');
    weatherNextDay1Img.setAttribute('src', 'assets/img/rain.png');
    weatherNextDay2Img.setAttribute('src', 'assets/img/rain.png');
    weatherNextDay3Img.setAttribute('src', 'assets/img/rain.png');

    weatherCity.innerText = 'Belarus, Minsk';
    weatherDate.innerText = toString(new Date);
    weatherTodayTemp.innerText = '+54';
    weatherNextDay1Temp.innerText = '+55';
    weatherNextDay2Temp.innerText = '+55';
    weatherNextDay3Temp.innerText = '+55';
    weatherNextDayWeak1.innerText = 'Monday';
    weatherNextDayWeak2.innerText = 'Tuesda';
    weatherNextDayWeak3.innerText = 'Wensday';
    weatherTodayInfoListItem1.innerText = 'rain';
    weatherTodayInfoListItem2.innerText = 'Feels like:  +5°';
    weatherTodayInfoListItem3.innerText = 'Wind: 8 m/s';
    weatherTodayInfoListItem4.innerText = 'Humidity: 88%n';

    weatherNextDay1.append(
      weatherNextDayWeak1,
      weatherNextDay1Temp,
      weatherNextDay1Img
    )

    weatherNextDay2.append(
      weatherNextDayWeak2,
      weatherNextDay2Temp,
      weatherNextDay2Img
    )

    weatherNextDay3.append(
      weatherNextDayWeak3,
      weatherNextDay3Temp,
      weatherNextDay3Img
    )

    weatherTodayInfoList.append(
      weatherTodayInfoListItem1,
      weatherTodayInfoListItem2,
      weatherTodayInfoListItem3,
      weatherTodayInfoListItem4
    )

    weatherToday.append(
      weatherTodayTemp,
      weatherTodayImg,
      weatherTodayInfoList
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
