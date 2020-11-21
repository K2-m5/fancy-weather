/* eslint-disable camelcase */
import { createElement } from '../utils/createElement';
import * as dayjs from 'dayjs';
import { changeKtoC, changeKtoF, updateTemperature } from '../utils//changeTempDimension';

import './WeatherPanel.css';

const dayToLabelMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export default class WeatherPanel {
  constructor() {
    this.weatherBlock = createElement('div', 'wrapper', 'weather_block');
    this.weatherCity = createElement('div', 'weather_today_block--city_country', 'text_base');
    this.weatherDate = createElement('div', 'text_base', 'weather_today_block--date_time');
    this.weatherTodayTemp = createElement('div', 'text_base', 'weather_today_block--temp');
    this.weatherTodayInfoListWeather = createElement(
      'div',
      'text_base',
      'weather_today_block--info_list-item'
    );
    this.weatherTodayInfoListFeels = createElement(
      'div',
      'text_base',
      'weather_today_block--info_list-item'
    );
    this.weatherTodayInfoListWind = createElement(
      'div',
      'text_base',
      'weather_today_block--info_list-item'
    );
    this.weatherTodayInfoListHumidity = createElement(
      'div',
      'text_base',
      'weather_today_block--info_list-item'
    );
    this.weatherTodayImg = createElement('img', 'weather_today_block--sign');
    this.tempToday = [];
    this.tempThreeDaysForecast = [];
  }

  updateWeatherData(city, tempToday, weather, feels, wind, humidity, weatherImg) {
    this.weatherCity.innerText = city;
    this.weatherTodayTemp.innerText = tempToday;
    this.weatherTodayInfoListWeather.innerText = weather;
    this.weatherTodayInfoListFeels.innerText = `Feels like: ${feels}`;
    this.weatherTodayInfoListWind.innerText = `Wind: ${wind}`;
    this.weatherTodayInfoListHumidity.innerText = `Humidity: ${humidity}`;
    this.weatherTodayImg.setAttribute('src', `http://openweathermap.org/img/w/${weatherImg}.png`);
  }

  createWeatherTodayBlock(rootElement, currentWeather, next3DaysWeather) {
    const { city, tempToday, weather, feels, wind, humidity, weatherImgCode } = currentWeather;
    this.tempToday = tempToday;
    const weatherToday = createElement('div', 'weather-today');
    const weatherTodayInfoList = createElement('div', 'weather_today_block--info_list');
    this.weatherNextDayList = createElement('div', 'weather_days_block');

    this.updateDate();
    this.weatherCity.innerText = city;
    this.weatherTodayTemp.innerText = tempToday;
    this.weatherTodayInfoListWeather.innerText = weather;
    this.weatherTodayInfoListFeels.innerText = `Feels like: ${Math.round(feels)}`;
    this.weatherTodayInfoListWind.innerText = `Wind: ${wind}`;
    this.weatherTodayInfoListHumidity.innerText = `Humidity: ${humidity}`;
    this.weatherTodayImg.setAttribute(
      'src',
      `http://openweathermap.org/img/w/${weatherImgCode}.png`
    );

    for (let i = 0; i < next3DaysWeather.length; i += 1) {
      const {
        main: { temp },
        weather,
      } = next3DaysWeather[i];

      let dayNumber = dayjs()
        .add(i + 1, 'day')
        .day();
      this.createDayWeatherItem(
        this.weatherNextDayList,
        dayToLabelMap[dayNumber],
        temp,
        weather[0].icon
      );
      this.tempThreeDaysForecast.push(temp);
    }

    weatherTodayInfoList.append(
      this.weatherTodayInfoListWeather,
      this.weatherTodayInfoListFeels,
      this.weatherTodayInfoListWind,
      this.weatherTodayInfoListHumidity
    );

    weatherToday.append(this.weatherTodayTemp, this.weatherTodayImg, weatherTodayInfoList);

    this.weatherBlock.append(
      this.weatherCity,
      this.weatherDate,
      weatherToday,
      this.weatherNextDayList
    );

    rootElement.append(this.weatherBlock);
    setInterval(() => {
      this.updateDate();
    }, 1000);
  }

  updateForecastData(next3DaysWeather) {
    for (let i = 0; i < next3DaysWeather.length; i += 1) {
      const {
        dt_txt,
        main: { temp },
        weather,
      } = next3DaysWeather[i];
      const date = new Date(dt_txt);
      this.weekDay.innerText = dayToLabelMap[date.getDay()];
      this.temperature.innerText = temp;
      this.image.setAttribute('src', `http://openweathermap.org/img/w/${weather[0].icon}.png`);
    }
  }

  createDayWeatherItem(container, day, temp, imageCode) {
    const dayRoot = createElement('div', 'day_block');
    this.weekDay = createElement('div', 'text_base', 'day_block--name');
    this.temperature = createElement('div', 'text_base', 'day_block--temp');
    this.image = createElement('img', 'day_block--sign');

    this.weekDay.innerText = day;
    this.temperature.innerText = Math.round(temp);
    this.image.setAttribute('src', `http://openweathermap.org/img/w/${imageCode}.png`);

    dayRoot.append(this.weekDay, this.temperature, this.image);

    container.appendChild(dayRoot);
  }

  updateDate() {
    const currentDate = new Date();
    const currentHours = ('0' + currentDate.getHours()).slice(-2);
    const currentMinutes = ('0' + currentDate.getMinutes()).slice(-2);
    const currentSeconds = ('0' + currentDate.getSeconds()).slice(-2);

    this.weatherDate.innerText = `${currentHours} : ${currentMinutes} : ${currentSeconds}`;
  }

  CtoF() {
    const newArr = [];
    document
      .querySelectorAll('.day_block--temp')
      .forEach((el) => newArr.push(changeKtoC(Number(el.innerHTML))));
    this.weatherTodayTemp.innerText = changeKtoC(this.weatherTodayTemp.innerText);
    updateTemperature(newArr);
  }

  FtoC() {
    const newArr = [];
    document
      .querySelectorAll('.day_block--temp')
      .forEach((el) => newArr.push(changeKtoF(Number(el.innerHTML))));
    this.weatherTodayTemp.innerText = changeKtoF(this.weatherTodayTemp.innerText);
    updateTemperature(newArr);
  }
}
