/* eslint-disable camelcase */
import { createElement } from '../utils/createElement';
import WeatherToday from '../WeatherPanel/WeatherPanel';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import SearchPanel from '../SearchPanel/SearchPanel';
import MapBlock from '../MapBlock/MapBlock';
import WeatherApi from '../FetchApp/WeatherFetch';
import UserPlaceApi from '../FetchApp/UserPlaceApi';
import { mapKey } from '../const/const';
import ImageFetch from '../FetchApp/ImageFetch';
import ApiService from '../FetchApp/ApiService';
import data from '../FetchApp/data';

export class BuildDom {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.imageFetch = new ImageFetch();
    this.weatherTodayApp = new WeatherToday();
    this.mapBlock = new MapBlock(mapKey);
    this.controlPanel = new ControlPanel(rootElement);
    this.weatherFetch = new WeatherApi();
    this.coordUserFetch = new UserPlaceApi();
    this.searchPanel = new SearchPanel();
    this.api = new ApiService();
    this.data = data;

    this.userPlace = {};
    this.weatherDataToDay = {};
    this.weatherDataForecast = {};

    this.forecastData = [];
    this.bodyRoot = createElement('section', 'information-block');

    this.controlPanel.bindClickImageBtn(this.imageFetch.getImage.bind(this.imageFetch));
    this.controlPanel.bindClickSwitchBtn(this.weatherTodayApp.FtoC.bind(this.weatherTodayApp),
      this.weatherTodayApp.CtoF.bind(this.weatherTodayApp));
  }

  changeLanguageHandler(lang) {
    this.mapBlock.renderDataLanguageMap(lang);
    this.searchPanel.renderDataLanguage(lang);
  }

  async searchHandler(searchString) {
    const weatherData = await this.weatherFetch.getCurrentWeatherByCity(searchString);
    const dataNextDay = await this.weatherFetch.getForecastByCity(searchString);

    this.weatherTodayApp.updateWeatherData(
      weatherData.name,
      weatherData.main.temp,
      weatherData.weather[0].main,
      weatherData.main.feels_like,
      weatherData.wind.speed,
      weatherData.main.humidity,
      weatherData.weather[0].icon
    );

    const n3dw = this.api.getForecast(dataNextDay.list);
    this.weatherTodayApp.updateForecastData(n3dw);

    this.mapBlock.updateMap(String(weatherData.coord.lon), String(weatherData.coord.lat));
  }

  createControlBlock() {
    const headerRoot = createElement('div', 'controls_block');
    headerRoot.append(
      this.controlPanel.createControlBlock(),
      this.searchPanel.createSearchBlock()
    );

    this.searchPanel.formSearchRoot.addEventListener('submit', (e) => {
      e.preventDefault();
      this.searchHandler(this.searchPanel.inputSearch.value);
    });

    this.rootElement.append(headerRoot);
  }

  createWeatherBlock() {
    const map = this.mapBlock.createMapBlock();
    const startData = (async () => {
      await this.api.getData();
      this.weatherTodayApp.createWeatherTodayBlock(
        this.bodyRoot, {
          city: this.data.weather.city,
          tempToday: this.data.weather.temp,
          weather: this.data.weather.description,
          feels: this.data.weather.feelsLike,
          wind: this.data.weather.wind,
          humidity: this.data.weather.humidity,
          weatherImgCode: this.data.weather.icon
        },
        this.data.forecast
      );

      this.bodyRoot.append(map);
      this.rootElement.append(this.bodyRoot);
      this.mapBlock.addMap(this.data.coordinate.lng, this.data.coordinate.ltd);
    });
    startData();
  }

  buildDom() {
    this.createControlBlock();
    this.createWeatherBlock();
  }
}
