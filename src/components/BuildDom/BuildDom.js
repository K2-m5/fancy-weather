/* eslint-disable camelcase */
import { createElement } from '../utils/createElement';
import WeatherToday from '../WeatherPanel/WeatherPanel';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import SearchPanel from '../SearchPanel/SearchPanel';
import MapBlock from '../MapBlock/MapBlock';
import { mapKey } from '../const/const';
import ApiService from '../FetchApp/ApiService';
import data from '../FetchApp/data';

import './buildDom.css';

export class BuildDom {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.weatherTodayApp = new WeatherToday();
    this.mapBlock = new MapBlock(mapKey);
    this.controlPanel = new ControlPanel(rootElement);
    this.searchPanel = new SearchPanel();
    this.api = new ApiService();
    this.data = data;

    this.bodyRoot = createElement('div', 'information-block');
    this.root = document.getElementById('root');
    this.louderContainer = document.getElementById('louder');

    this.controlPanel.bindClickImageBtn(this.api.getImage.bind(this.api));
    this.controlPanel.bindClickSwitchBtn(
      this.weatherTodayApp.FtoC.bind(this.weatherTodayApp),
      this.weatherTodayApp.CtoF.bind(this.weatherTodayApp)
    );
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
    this.mapBlock.renderDataLanguageMap(lang);
    this.searchPanel.renderDataLanguage(lang);
  }

  async searchHandler(searchString) {
    this.hideApp();
    this.showLouder();
    await this.api.getDataUserRequest(searchString);

    setTimeout(() => {
      this.hideLouder();
      this.weatherTodayApp.updateWeatherData(
        this.data.city,
        this.data.weather.temp,
        this.data.weather.description,
        this.data.weather.feelsLike,
        this.data.weather.wind,
        this.data.weather.humidity,
        this.data.weather.icon
      );
      this.weatherTodayApp.updateForecastData(this.data.forecast);
      this.mapBlock.updateMap(
        this.data.coordinate.lng,
        this.data.coordinate.ltd
      );
      this.showApp();
    }, 3000);
  }

  createControlBlock() {
    const headerRoot = createElement('div', 'controls_block');
    headerRoot.append(
      this.controlPanel.createControlBlock(),
      this.searchPanel.createSearchBlock()
    );

    // this.searchPanel.formSearchRoot.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   this.searchHandler(this.searchPanel.inputSearch.value);
    // });

    this.rootElement.append(headerRoot);
  }

  createWeatherBlock() {
    const map = this.mapBlock.createMapBlock();
    const startData = async () => {
      await this.api.getData();
      setTimeout(() => {
        this.hideLouder();
        this.createControlBlock();
        this.weatherTodayApp.createWeatherTodayBlock(
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
          this.data.forecast
        );
        this.bodyRoot.append(map);
        this.rootElement.append(this.bodyRoot);
        this.mapBlock.addMap(
          this.data.coordinate.lng,
          this.data.coordinate.ltd
        );
      }, 3000);
    };
    startData();
  }

  buildDom() {
    this.showLouder();
    this.createWeatherBlock();
  }
}
