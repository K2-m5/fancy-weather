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
    this.controlBlock = new ControlBlock(rootElement, BuildDom.changeLanguageHandler);
    this.weatherFetch = new WeatherFetch(openWeatherKeys);
    this.coordUserFetch = new CoordUserFetch();
    this.result = [];
  }

  static changeLanguageHandler(lang) {
    MapBlock.renderDataLanguageMap(lang);
    SearchBlock.renderDataLanguage(lang);
  }

  createControlBlock() {
    const headerRoot = createElement('div', 'controls_block');
    const controlBlock = this.controlBlock.createControlBlock();

    const searchBlock = new SearchBlock(async searchString => {
      const {
        name,
        main: {
          temp,
          humidity,
          feelsLike
        },
        weather,
        wind: {
          speed
        },
        coord: {
          lon,
          lat
        }
      } = await this.weatherFetch.getCurrentWeatherByCity(searchString);

      this.weatherTodayApp.updateData(
        name,
        temp,
        weather[0].main,
        feelsLike,
        speed,
        humidity,
        weather[0].icon
      );

      this.mapBlock.updateMap(lon, lat);
    });

    headerRoot.append(
      controlBlock,
      searchBlock.createSearchBlock()
    );

    this.rootElement.append(headerRoot);
  }

  createWeatherBlock() {
    const bodyRoot = createElement('section', 'information-block');

    const map = this.mapBlock.createMapBlock();
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { coords: { longitude, latitude } } = pos;
      const dataNextDay = await this.weatherFetch.getForecastByCoords(longitude, latitude);

      const {
        name,
        main: {
          temp,
          humidity,
          feelsLike
        },
        weather,
        wind: {
          speed
        }
      } = await this.weatherFetch.getCurrentWeatherByCoords(longitude, latitude);
      const n3dw = this.getNext3DaysWeather(dataNextDay.list);
      this.weatherTodayApp.createWeatherTodayBlock(
        bodyRoot, {
          city: name,
          tempToday: temp,
          weather: weather[0].main,
          feels: feelsLike,
          wind: speed,
          humidity,
          weatherImgCode: weather[0].main
        },
        n3dw
      );

      bodyRoot.append(
        map
      );

      this.rootElement.append(bodyRoot);

      this.mapBlock.addMap(longitude, latitude);
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
