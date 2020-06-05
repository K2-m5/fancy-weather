import { BuildDom } from './components/BuildDom/BuildDom';
import { openWeatherKeys } from './components/const';
import { WeatherFetch } from './components/FetchApp/WeatherFetch';
import { CoordUserFetch } from './components/FetchApp/CoordUserFetch';

import './styles.css';

const buildDom = new BuildDom(document.body, openWeatherKeys);
const weather = new WeatherFetch(openWeatherKeys);

const data = weather.getCurrentWeatherByCity('Minsk');
console.log(data);

buildDom.buildDom();


