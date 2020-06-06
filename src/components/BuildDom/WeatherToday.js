import { createElement } from '../component/createElement';
import * as dayjs from 'dayjs';

const weatherBlock = createElement('div', 'weather_block');
const weatherCity = createElement('div', 'weather_today_block--city_country', 'text_base');
const weatherToday = createElement('div', 'weather-today');
const weatherTodayImg = createElement('img', 'weather_today_block--sign');
const weatherTodayInfoList = createElement('div', 'weather_today_block--info_list');
const weatherTodayInfoListWeather = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayInfoListFeels = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayInfoListWind = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayInfoListHumidity = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayTemp = createElement('div', 'text_base', 'weather_today_block--temp');
const weatherNextDayList = createElement('div', 'weather_days_block');
const weatherIdMap = {
  '804': 'clouds',
  '801': 'clouds',
  '803': 'clouds',
  '802': 'clouds'
};

export class WeatherToday {
  constructor() {

    this.weatherDate = createElement('div', 'text_base', 'weather_today_block--date_time');
  }

  updateData(city, tempToday, weather, feels, wind, humidity, weatherImg) {
    weatherCity.innerText = city;
    weatherTodayTemp.innerText = tempToday
    weatherTodayInfoListWeather.innerText = weather;
    weatherTodayInfoListFeels.innerText = `Feels like: ${feels}`;
    weatherTodayInfoListWind.innerText = `Wind: ${wind}`;
    weatherTodayInfoListHumidity.innerText = `Humidity: ${humidity}`;
    weatherTodayImg.setAttribute('src', `assets/img/${weatherIdMap[id]}.png`);
  }

  createWeatherTodayBlock(rootElement, currentWeather, next3DaysWeather) {
    const {
      city,
      tempToday,
      weather,
      feels,
      wind,
      humidity,
      weatherImgCode
    } = currentWeather;

    this.updateDate();
    weatherCity.innerText = city;
    weatherTodayTemp.innerText = tempToday - 273.15 + ''.concat(String.fromCharCode(176));
    weatherTodayInfoListWeather.innerText = weather;
    weatherTodayInfoListFeels.innerText = `Feels like: ${feels}`;
    weatherTodayInfoListWind.innerText = `Wind: ${wind}`;
    weatherTodayInfoListHumidity.innerText = `Humidity: ${humidity}`;
    weatherTodayImg.setAttribute('src', `assets/img/${weatherImgCode}.png`);

    const dayToLabelMap = {
      '0': 'Sunday',
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday'
    };

    for (let i = 0; i < next3DaysWeather.length; i++) {
      const { main: { temp }, weather } = next3DaysWeather[i];

      let dayNumber = dayjs().add(i + 1, 'day').day();
      this.createDayWeatherItem(
        weatherNextDayList,
        dayToLabelMap[dayNumber],
        temp,
        weather[0].main);
    }

    weatherTodayInfoList.append(
      weatherTodayInfoListWeather,
      weatherTodayInfoListFeels,
      weatherTodayInfoListWind,
      weatherTodayInfoListHumidity
    );

    weatherToday.append(
      weatherTodayTemp,
      weatherTodayImg,
      weatherTodayInfoList
    );

    weatherBlock.append(
      weatherCity,
      this.weatherDate,
      weatherToday,
      weatherNextDayList
    );

    rootElement.append(weatherBlock);
    setInterval(() => {
      this.updateDate();
    }, 1000);
  }

  createDayWeatherItem(container, day, temp, imageCode) {
    const dayRoot = createElement('div', 'day_block');
    const weekDay = createElement('div', 'text_base', 'day_block--name');
    const temperature = createElement('div', 'text_base', 'day_block--temp');
    const image = createElement('img', 'day_block--sign');

    weekDay.innerText = day;
    temperature.innerText = Math.round(temp - 273.15) + ''.concat(String.fromCharCode(176));
    image.setAttribute('src', `assets/img/${imageCode}.png`);

    dayRoot.append(
      weekDay,
      temperature,
      image
    );

    container.appendChild(dayRoot);
  }

  updateDate() {
    const currentDate = new Date(),
          currentHours = ('0' + currentDate.getHours()).slice(-2),
          currentMinutes = ('0' + currentDate.getMinutes()).slice(-2),
          currentSeconds = ('0' + currentDate.getSeconds()).slice(-2);

    this.weatherDate.innerText = `${currentHours} : ${currentMinutes} : ${currentSeconds}`;
  }

}
