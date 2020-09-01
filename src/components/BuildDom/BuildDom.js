/* eslint-disable camelcase */
import { createElement } from '../utils/createElement';
import { WeatherToday } from './WeatherToday';
import { ControlBlock } from './ControlBlock';
import { SearchPanel } from '../SearchPanel/SearchPanel';
import MapBlock from '../MapBlock/MapBlock';
import { WeatherFetch } from '../FetchApp/WeatherFetch';
import { CoordUserFetch } from '../FetchApp/CoordUserFetch';
import { openWeatherKeys, mapKey } from '../const/const';
import ImageFetch from '../FetchApp/ImageFetch';

export class BuildDom {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.imageFetch = new ImageFetch();
    this.weatherTodayApp = new WeatherToday();
    this.mapBlock = new MapBlock(mapKey);
    this.controlBlock = new ControlBlock(rootElement);
    this.weatherFetch = new WeatherFetch(openWeatherKeys);
    this.coordUserFetch = new CoordUserFetch();
    this.searchPanel = new SearchPanel();

    this.userPlace = {};
    this.weatherDataToDay = {};
    this.weatherDataForecast = {};

    this.forecastData = [];
    this.bodyRoot = createElement('section', 'information-block');

    this.controlBlock.bindClickImageBtn(this.imageFetch.getImage.bind(this.imageFetch));
    this.controlBlock.bindClickSwitchBtn(this.weatherTodayApp.FtoC.bind(this.weatherTodayApp),
      this.weatherTodayApp.CtoF.bind(this.weatherTodayApp));
  }

  changeLanguageHandler(lang) {
    console.log('hi');
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

    const n3dw = this.getNext3DaysWeather(dataNextDay.list);
    this.weatherTodayApp.updateForecastData(n3dw);

    this.mapBlock.updateMap(String(weatherData.coord.lon), String(weatherData.coord.lat));
  }

  createControlBlock() {
    const headerRoot = createElement('div', 'controls_block');
    headerRoot.append(
      this.controlBlock.createControlBlock(),
      this.searchPanel.createSearchBlock()
    );

    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      attributeOldValue: false
    };

    const observer = new MutationObserver((mutationRecords) => this.changeLanguageHandler(mutationRecords));

    observer.observe(this.controlBlock.changeLanguage, config);

    // this.controlBlock.changeLanguage.addEventListener('change', (event) => {
    //   this.changeLanguageHandler(event.target.value);
    // });

    this.searchPanel.formSearchRoot.addEventListener('submit', (e) => {
      e.preventDefault();

      this.searchHandler(this.searchPanel.inputSearch.value);
    });

    this.rootElement.append(headerRoot);
  }

  getStartData() {
    const getData = (async () => {
      this.userPlace = await this.coordUserFetch.getPlaceByIp();
      const { city } = this.userPlace;
      await this.imageFetch.getImage(city);
      this.weatherDataToDay = await this.weatherFetch.getCurrentWeatherByCity(city);
      this.weatherDataForecast = await this.weatherFetch.getForecastByCity(city);
    });
    return getData();
  }

  createWeatherBlock() {
    const map = this.mapBlock.createMapBlock();
    const startData = (async () => {
      await this.getStartData();
      const { region } = this.userPlace;
      const {
        main: {
          feels_like,
          temp,
          humidity
        },
        wind: {
          speed
        },
        weather:
        [{
          main,
          icon
        }]
      } = this.weatherDataToDay;
      const { list } = this.weatherDataForecast;
      const n3dw = this.getNext3DaysWeather(list);

      this.weatherTodayApp.createWeatherTodayBlock(
        this.bodyRoot, {
          city: region,
          tempToday: temp,
          weather: main,
          feels: feels_like,
          wind: speed,
          humidity: humidity,
          weatherImgCode: icon
        },
        n3dw
      );

      this.bodyRoot.append(map);

      this.rootElement.append(this.bodyRoot);
      this.mapBlock.addMap(this.userPlace.loc.slice(8, 15), this.userPlace.loc.slice(0, 7));
    });
    startData();
  }

  getNext3DaysWeather(weatherList) {
    const currentDate = new Date().toDateString();
    const newDayIndex = weatherList.findIndex(
      (listItem) => currentDate !== new Date(listItem.dt_txt).toDateString()
    );
    const todayExcluded = weatherList.slice(newDayIndex);
    this.forecastData = [];
    for (let i = 4; i < todayExcluded.length; i += 8) {
      this.forecastData.push(todayExcluded[i]);
    }
    return this.forecastData.slice(0, 3);
  }

  buildDom() {
    this.createControlBlock();
    this.createWeatherBlock();
  }
}
