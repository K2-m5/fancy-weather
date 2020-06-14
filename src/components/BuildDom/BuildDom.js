import { createElement } from '../component/createElement';
import { WeatherToday } from './WeatherToday';
import { ControlBlock } from './ControlBlock';
import { SearchBlock } from './SearchBlock';
import { MapBlock } from './MapBlock';
import { WeatherFetch } from '../FetchApp/WeatherFetch';
import { CoordUserFetch } from '../FetchApp/CoordUserFetch';
import { openWeatherKeys, mapKey } from '../const/const';

export class BuildDom {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.weatherTodayApp = new WeatherToday();
    this.mapBlock = new MapBlock(mapKey);
    this.controlBlock = new ControlBlock(rootElement);
    this.weatherFetch = new WeatherFetch(openWeatherKeys);
    this.coordUserFetch = new CoordUserFetch();
    this.searchBlock = new SearchBlock();
    this.result = [];
    this.bodyRoot = createElement('section', 'information-block');
  }

  changeLanguageHandler(lang) {
    this.mapBlock.renderDataLanguageMap(lang);
    this.searchBlock.renderDataLanguage(lang);
  }

  async searchHandler(searchString) {
    const weatherData = await this.weatherFetch.getCurrentWeatherByCity(searchString);

    this.weatherTodayApp.updateData(
      weatherData.name,
      weatherData.main.temp,
      weatherData.weather[0].main,
      weatherData.main.feels_like,
      weatherData.wind.speed,
      weatherData.main.humidity,
      weatherData.weather[0].icon
    );

    this.mapBlock.updateMap(weatherData.coord.lon, weatherData.coord.lat);
  }

  createControlBlock() {
    const headerRoot = createElement('div', 'controls_block');
    headerRoot.append(
      this.controlBlock.createControlBlock(),
      this.searchBlock.createSearchBlock()
    );

    this.controlBlock.changeLanguage.addEventListener('change', (event) => {
      this.changeLanguageHandler(event.target.value);
    });

    this.searchBlock.formSearchRoot.addEventListener('submit', (e) => {
      e.preventDefault();

      this.searchHandler(this.searchBlock.inputSearch.value);
    });

    this.rootElement.append(headerRoot);
  }

  createWeatherBlock() {
    const map = this.mapBlock.createMapBlock();
    navigator.geolocation.getCurrentPosition(async () => {
      const cityData = await this.coordUserFetch.getPlaceByIp();
      const dataNextDay = await this.weatherFetch.getForecastByCoords(
        cityData.loc.slice(8),
        cityData.loc.slice(0, 5)
      );
      const weatherDataToDay = await this.weatherFetch.getCurrentWeatherByCoords(
        cityData.loc.slice(8),
        cityData.loc.slice(0, 5)
      );
      const n3dw = this.getNext3DaysWeather(dataNextDay.list);
      this.weatherTodayApp.createWeatherTodayBlock(
        this.bodyRoot, {
          city: weatherDataToDay.name,
          tempToday: weatherDataToDay.main.temp,
          weather: weatherDataToDay.weather[0].main,
          feels: weatherDataToDay.main.feels_like,
          wind: weatherDataToDay.wind.speed,
          humidity: weatherDataToDay.main.humidity,
          weatherImgCode: weatherDataToDay.weather[0].main
        },
        n3dw
      );

      this.bodyRoot.append(
        map
      );

      this.rootElement.append(this.bodyRoot);
      this.mapBlock.addMap(cityData.loc.slice(8, 13), cityData.loc.slice(0, 5));
    });
  }

  getNext3DaysWeather(weatherList) {
    const todayExcluded = weatherList.slice(8);
    this.result = [];
    for (let i = 3; i < todayExcluded.length; i += 8) {
      this.result.push(todayExcluded[i]);
    }
    return this.result.slice(0, 3);
  }

  buildDom() {
    this.createControlBlock();
    this.createWeatherBlock();
  }
}
