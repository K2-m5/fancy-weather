/* eslint-disable camelcase */
import { createElement } from '../../utils/createElement';
import * as dayjs from 'dayjs';
import { changeKtoC, changeKtoF, updateTemperature } from '../../utils/changeTempDimension';

import './WeatherPanel.css';
import language from '../../utils/words';

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
    this.weatherTodayTemp = {
      key: createElement('div', 'text_base', 'weather_today_block--temp-item_symbol'),
      value: createElement('div', 'text_base', 'weather_today_block--temp-item'),
    };
    this.weatherTodayWeather = createElement('div', 'text_base', 'info_list--item-value');
    this.weatherTodayFeels = {
      key: createElement('div', 'text_base', 'info_list--item-key'),
      value: createElement('div', 'text_base', 'info_list--item-value'),
    };

    this.weatherTodayWind = {
      key: createElement('div', 'text_base', 'info_list--item-key'),
      value: createElement('div', 'text_base', 'info_list--item-value'),
    };
    this.weatherTodayHumidity = {
      key: createElement('div', 'text_base', 'info_list--item-key'),
      value: createElement('div', 'text_base', 'info_list--item-value'),
    };
    this.weatherTodayImg = createElement('img', 'weather_today_block--sign');
    this.tempThreeDaysForecast = [];
  }

  updateWeatherData(city, tempToday, weather, feels, wind, humidity, weatherImgCode) {
    this.weatherCity.innerText = city;
    this.weatherTodayTemp.innerText.value = tempToday;
    this.weatherTodayWeather.innerText = weather;
    this.weatherTodayFeels.innerText.value = feels;
    this.weatherTodayWind.innerText.value = wind;
    this.weatherTodayHumidity.innerText.value = humidity;
    this.weatherTodayImg.setAttribute('src', `assets/img/${weatherImgCode}.svg`);
  }

  createInfoList() {
    const weatherTodayInfoList = createElement('ul', 'weather_today_block--info_list');
    const weatherWrapper = createElement('li', 'weather_today_block--info_list-item');
    const feelsLikeWrapper = createElement('li', 'weather_today_block--info_list-item');
    const windWrapper = createElement('li', 'weather_today_block--info_list-item');
    const humidityWrapper = createElement('li', 'weather_today_block--info_list-item');

    weatherWrapper.append(this.weatherTodayWeather);
    feelsLikeWrapper.append(this.weatherTodayFeels.key, this.weatherTodayFeels.value);
    windWrapper.append(this.weatherTodayWind.key, this.weatherTodayWind.value);
    humidityWrapper.append(this.weatherTodayHumidity.key, this.weatherTodayHumidity.value);

    weatherTodayInfoList.append(weatherWrapper, feelsLikeWrapper, windWrapper, humidityWrapper);
    return weatherTodayInfoList;
  }

  renderTranslate(lang) {
    this.weatherTodayFeels.key.innerText = lang.feelsLike;
    this.weatherTodayWind.key.innerText = lang.wind;
    this.weatherTodayHumidity.key.innerText = lang.humidity;
    document.querySelectorAll('.text_base day_block--name').forEach((el, i) => {
      el.innerHTML += lang.nameWeek[i];
    });
  }

  createWeatherTodayBlock(rootElement, currentWeather, next3DaysWeather, text) {
    const { city, tempToday, weather, feels, wind, humidity, weatherImgCode } = currentWeather;
    const weatherToday = createElement('div', 'weather-today');
    const weatherTodayTempWrapper = createElement('div', 'weather_today_block--temp');

    weatherTodayTempWrapper.append(this.weatherTodayTemp.value, this.weatherTodayTemp.key);

    this.updateDate();
    this.weatherCity.innerText = city;
    this.weatherTodayTemp.key.innerText = '°';
    this.weatherTodayTemp.value.innerText = tempToday;
    this.weatherTodayWeather.innerText = weather;
    this.weatherTodayFeels.key.innerText = text.feelsLike;
    this.weatherTodayFeels.value.innerText = `${feels}`;
    this.weatherTodayWind.key.innerText = text.wind;
    this.weatherTodayWind.value.innerText = wind;
    this.weatherTodayHumidity.key.innerText = text.humidity;
    this.weatherTodayHumidity.value.innerText = humidity;
    this.weatherTodayImg.setAttribute('src', `assets/img/${weatherImgCode}.svg`);

    this.weatherNextDayList = createElement('div', 'weather_days_block');
    this.createDayForecastBlock(next3DaysWeather, text.nameWeek);

    weatherToday.append(weatherTodayTempWrapper, this.weatherTodayImg, this.createInfoList());

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

  createDayForecastBlock(forecast, nameWeek) {
    for (let i = 0; i < forecast.length; i += 1) {
      const {
        main: { temp },
        weather,
      } = forecast[i];

      let dayNumber = dayjs()
        .add(i + 1, 'day')
        .day();
      this.createDayWeatherItem(
        this.weatherNextDayList,
        nameWeek[dayNumber],
        temp,
        weather[0].icon
      );
      this.tempThreeDaysForecast.push(temp);
    }
  }

  updateForecastData(next3DaysWeather, nameWeek) {
    for (let i = 0; i < next3DaysWeather.length; i += 1) {
      const {
        dt_txt,
        main: { temp },
        weather,
      } = next3DaysWeather[i];
      const date = new Date(dt_txt);
      this.weekDay.innerText = nameWeek[date.getDay()];
      this.temperature.innerText = Math.round(temp);
      this.image.setAttribute('src', `assets/img/${weather[0].icon}.svg`);
    }
  }

  createDayWeatherItem(container, day, temp, imageCode) {
    const dayRoot = createElement('div', 'day_block');
    this.weekDay = createElement('div', 'text_base', 'day_block--name');
    this.temperature = createElement('div', 'text_base', 'day_block--temp');
    this.image = createElement('img', 'day_block--sign');

    this.weekDay.innerText = day;
    this.temperature.innerText = Math.round(temp);
    this.image.setAttribute('src', `assets/img/${imageCode}.svg`);

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
      .querySelectorAll('.day_block--temp-item')
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
