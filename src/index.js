import { BuildDom } from './components/BuildDom/BuildDom';
import { addMap } from './components/map';
import { openWeatherKeys, mapKey } from './components/const';
import { WeatherApi } from './components/WeatherApi/WeatherApi';

import './styles.css';

const buildDom = new BuildDom(document.body, openWeatherKeys);

const weather = new WeatherApi(openWeatherKeys);
const data = weather.getCurrentWeatherByCity('Minsk');

buildDom.buildDom();

console.log(data);