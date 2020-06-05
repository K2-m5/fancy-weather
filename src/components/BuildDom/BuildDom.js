import { createElement } from '../component/createElement';
import { WeatherToday } from './WeatherToday';
import { ControlBlock } from './ControlBlock';
import { SearchBlock } from './SearchBlock';
import { MapBlock } from './MapBlock';
import { WeatherFetch } from '../FetchApp/WeatherFetch'
import { CoordUserFetch } from '../FetchApp/CoordUserFetch';
import { openWeatherKeys, mapKey } from '../const/const';
 
export class BuildDom {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.weatherTodayApp = new WeatherToday();
    this.controlBlock = new ControlBlock();
    this.mapBlock = new MapBlock();
    this.weatherFetch = new WeatherFetch(openWeatherKeys);
    this.coordUserFetch = new CoordUserFetch();
    
  }

  createControlBlock() {
    const headerRoot = createElement('div', 'controls_block');
    const controlBlock = this.controlBlock.createControlBlock(headerRoot);
    const searchBlock = new SearchBlock (async searchString => {
      const data = await this.weatherFetch.getCurrentWeatherByCity(searchString);
      
      console.log(data);
      this.weatherTodayApp.updateData(
        data.name,
        data.main.temp,
        data.weather[0].main,
        data.main.feels_like,
        data.wind.speed,
        data.main.humidity
        );
      
      this.mapBlock.updateMap(data.coord.lat, data.coord.lon);
    });

    headerRoot.append(
      controlBlock,
      searchBlock.createSearchBlock()
    );

    this.rootElement.append(headerRoot);
  }

  createWeatherBlock() {
    const bodyRoot = createElement('section', 'information-block');
    const weatherBlock = this.weatherTodayApp.createWeatherTodayBlock();
    const map = this.mapBlock.createMapBlock();
    this.mapBlock.addMap(mapKey);

    bodyRoot.append(
      weatherBlock,
      map
    );

    this.rootElement.append(bodyRoot);
  }

  buildDom() {
    this.createControlBlock();
    this.createWeatherBlock();
  }
}
