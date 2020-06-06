import { createElement } from '../component/createElement';
import * as dayjs from 'dayjs';


const weatherToday = createElement('div', 'weather-today');
const weatherTodayImg = createElement('img', 'weather_today_block--sign');
const weatherTodayInfoList = createElement('div', 'weather_today_block--info_list');

const weatherTodayInfoListFeels = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayInfoListWind = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayInfoListHumidity = createElement('div', 'text_base', 'weather_today_block--info_list-item');

const weatherNextDayList = createElement('div', 'weather_days_block');
export class WeatherToday {
  constructor() {
    this.weatherBlock = createElement('div', 'weather_block');
    this.weatherCity = createElement('div', 'weather_today_block--city_country', 'text_base');
    this.weatherDate = createElement('div', 'text_base', 'weather_today_block--date_time');
    this.weatherTodayTemp = createElement('div', 'text_base', 'weather_today_block--temp');
    this.weatherTodayInfoListWeather = createElement('div', 'text_base', 'weather_today_block--info_list-item');

  }

  updateData(city, tempToday, weather, feels, wind, humidity, weatherImg) {
    this.weatherCity.innerText = city;
    this.weatherTodayTemp.innerText = tempToday;
    this.weatherTodayInfoListWeather.innerText = weather;
    weatherTodayInfoListFeels.innerText = `Feels like: ${feels}`;
    weatherTodayInfoListWind.innerText = `Wind: ${wind}`;
    weatherTodayInfoListHumidity.innerText = `Humidity: ${humidity}`;
    weatherTodayImg.setAttribute('src', `assets/img/${weatherImg}.png`);
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
    this.weatherCity.innerText = city;
    this.weatherTodayTemp.innerText = tempToday - 273.15 + ''.concat(String.fromCharCode(176));
    this.weatherTodayInfoListWeather.innerText = weather;
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
      this.weatherTodayInfoListWeather,
      weatherTodayInfoListFeels,
      weatherTodayInfoListWind,
      weatherTodayInfoListHumidity
    );

    weatherToday.append(
      this.weatherTodayTemp,
      weatherTodayImg,
      weatherTodayInfoList
    );

    this.weatherBlock.append(
      this.weatherCity,
      this.weatherDate,
      weatherToday,
      weatherNextDayList
    );

    rootElement.append(this.weatherBlock);
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
