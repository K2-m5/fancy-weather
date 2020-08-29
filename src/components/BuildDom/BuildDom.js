import { createElement } from '../component/createElement';
import { WeatherToday } from './WeatherToday';
import { ControlBlock } from './ControlBlock';
import { SearchBlock } from './SearchBlock';
import { MapBlock } from './MapBlock';
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
    this.searchBlock = new SearchBlock();
    this.forecastData = [];
    this.bodyRoot = createElement('section', 'information-block');
  }

  changeLanguageHandler(lang) {
    this.mapBlock.renderDataLanguageMap(lang);
    this.searchBlock.renderDataLanguage(lang);
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
          weatherImgCode: weatherDataToDay.weather[0].icon
        },
        n3dw
      );

      this.bodyRoot.append(
        map
      );

      this.rootElement.append(this.bodyRoot);
      this.mapBlock.addMap(cityData.loc.slice(8, 15), cityData.loc.slice(0, 7));
    });
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
    this.imageFetch.getImage();
    this.createControlBlock();
    this.createWeatherBlock();
  }
}
