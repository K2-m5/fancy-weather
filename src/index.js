import { BuildDom } from './components/BuildDom/BuildDom';
import { addMap } from './components/map';
import { openWeatherKeys, mapKey } from './components/const';
import { WeatherApi } from './components/WeatherApi/WeatherApi';

import './styles.css';

const buildDom = new BuildDom(document.body);
buildDom.buildDom();

addMap(mapKey, 50, 60);

const weather = new WeatherApi(openWeatherKeys);

const data = weather.getCurrentWeatherByCity('Minsk');

console.log(data);