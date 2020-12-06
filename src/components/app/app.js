import { createElement } from '../../utils/createElement';
import WeatherToday from '../WeatherPanel/WeatherPanel';
import ControlPanel from '../ControlPanel/ControlPanel';
import SearchPanel from '../SearchPanel/SearchPanel';
import MapBlock from '../MapBlock/MapBlock';
import mapKey from '../../config/config';
import ApiService from '../FetchApp/ApiService';
import data from '../FetchApp/data';
import language from '../../utils/words';

export class App {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.weatherPanel = new WeatherToday();
    this.mapBlock = new MapBlock(mapKey);
    this.controlPanel = new ControlPanel(rootElement);
    this.searchPanel = new SearchPanel();
    this.api = new ApiService();
    this.data = data;
    this.language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en';

    this.bodyRoot = createElement('div', 'information-block');
    this.root = document.getElementById('root');
    this.louderContainer = document.getElementById('louder');

    this.controlPanel.bindClickImageBtn(this.api.getImage.bind(this.api));
    this.controlPanel.bindClickSwitchBtn(
      this.weatherPanel.FtoC.bind(this.weatherPanel),
      this.weatherPanel.CtoF.bind(this.weatherPanel)
    );
    this.controlPanel.bindClickLanguageBtn(this.changeLanguageHandler.bind(this));

    this.searchPanel.bindClickFormSearch(this.searchHandler.bind(this));
  }

  hideApp() {
    this.root.classList.add('inactive');
  }

  showApp() {
    this.root.classList.remove('inactive');
  }

  hideLouder() {
    this.louderContainer.classList.add('inactive');
  }

  showLouder() {
    this.louderContainer.classList.remove('inactive');
  }

  changeLanguageHandler(lang) {
    this.mapBlock.renderDataLanguageMap(language[lang]);
    this.searchPanel.renderDataLanguage(language[lang].searchElements);
    this.weatherPanel.renderTranslate(language[lang]);
    this.weatherPanel.updateForecastData(this.data.forecast, language[lang].nameWeek);
  }

  async createApp() {
    await this.api.initData();

    setTimeout(() => {
      this.hideLouder();
      const map = this.mapBlock.createMapBlock(language[this.language]);
      this.createControlBlock();
      this.weatherPanel.createWeatherTodayBlock(
        this.bodyRoot,
        {
          city: this.data.city,
          tempToday: this.data.weather.temp,
          weather: this.data.weather.description,
          feels: this.data.weather.feelsLike,
          wind: this.data.weather.wind,
          humidity: this.data.weather.humidity,
          weatherImgCode: this.data.weather.icon,
        },
        this.data.forecast,
        language[this.language]
      );
      this.bodyRoot.append(map);
      this.rootElement.append(this.bodyRoot);
      this.mapBlock.addMap(this.data.coordinate.lng, this.data.coordinate.ltd);
    }, 0);
  }

  async searchHandler(searchString) {
    this.hideApp();
    this.showLouder();
    await this.api.getDataUserRequest(searchString);

    setTimeout(() => {
      this.hideLouder();
      this.weatherPanel.updateWeatherData(
        this.data.city,
        this.data.weather.temp,
        this.data.weather.description,
        this.data.weather.feelsLike,
        this.data.weather.wind,
        this.data.weather.humidity,
        this.data.weather.icon
      );
      this.weatherPanel.updateForecastData(this.data.forecast, language[this.language].nameWeek);
      this.mapBlock.updateMap(this.data.coordinate.lng, this.data.coordinate.ltd);
      this.showApp();
    }, 0);
  }

  createControlBlock() {
    const headerRoot = createElement('div', 'controls_block');
    headerRoot.append(
      this.controlPanel.createControlBlock(),
      this.searchPanel.createSearchBlock(language[this.language].searchElements)
    );
    this.rootElement.append(headerRoot);
  }

  initApp() {
    this.showLouder();
    this.createApp();
  }
}
