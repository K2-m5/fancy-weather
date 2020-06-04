import { createElement } from '../component/createElement';

const weatherBlock = createElement('div', 'weather_block');
const weatherCity = createElement('div', 'weather_today_block--city_country', 'text_base');
const weatherDate =createElement('div', 'text_base', 'weather_today_block--date_time');
const weatherToday = createElement('div', 'weather-today');

const weatherTodayImg = createElement('img', 'weather_today_block--sign');
const weatherTodayInfoList = createElement('div', 'weather_today_block--info_list');
const weatherTodayInfoListWeather = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayInfoListFeels = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayInfoListWind = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayInfoListHumidity = createElement('div', 'text_base', 'weather_today_block--info_list-item');
const weatherTodayTemp = createElement('div', 'text_base', 'weather_today_block--temp');
const weatherNextDayList = createElement('div', 'weather_days_block');
const weatherNextDay1 = createElement('div', 'day_block');
const weatherNextDayWeak1 = createElement('div', 'text_base', 'day_block--name');
const weatherNextDay1Temp = createElement('div', 'text_base', 'day_block--temp');
const weatherNextDay1Img =createElement('img', 'day_block--sign')
const weatherNextDay2 = createElement('div', 'day_block');
const weatherNextDayWeak2 = createElement('div', 'text_base', 'day_block--name');
const weatherNextDay2Temp = createElement('div', 'text_base', 'day_block--temp');
const weatherNextDay2Img =createElement('img', 'day_block--sign')
const weatherNextDay3 = createElement('div', 'day_block');
const weatherNextDayWeak3 = createElement('div', 'text_base', 'day_block--name');
const weatherNextDay3Temp = createElement('div', 'text_base', 'day_block--temp');
const weatherNextDay3Img =createElement('img', 'day_block--sign');

export class WeatherToday {
  constructor() {
    this.date = new Date

  }

  updateData(city, tempToday, weather, feels, wind, humidity) {
    weatherCity.innerText = city;
    weatherTodayTemp.innerText = tempToday
    weatherTodayInfoListWeather.innerText = weather;
    weatherTodayInfoListFeels.innerText = feels;
    weatherTodayInfoListWind.innerText = wind;
    weatherTodayInfoListHumidity.innerText = humidity;
  }

  createWeatherTodayBlock(rootElement) {
    weatherCity.innerText = 'Belarus, Minsk';
    weatherDate.innerText = `${this.date.getHours()} : ${this.date.getMinutes()}`;
    weatherTodayTemp.innerText = '+54';
    weatherTodayImg.setAttribute('src', 'assets/img/rain.png');
    weatherTodayInfoListWeather.innerText = 'rain';
    weatherTodayInfoListFeels.innerText = 'Feels like:  +5°';
    weatherTodayInfoListWind.innerText = 'Wind: 8 m/s';
    weatherTodayInfoListHumidity.innerText = 'Humidity: 88%n';

    weatherNextDay1Img.setAttribute('src', 'assets/img/rain.png');
    weatherNextDay2Img.setAttribute('src', 'assets/img/rain.png');
    weatherNextDay3Img.setAttribute('src', 'assets/img/rain.png');

    weatherNextDay1Temp.innerText = '+55';
    weatherNextDay2Temp.innerText = '+55';
    weatherNextDay3Temp.innerText = '+55';
    weatherNextDayWeak1.innerText = 'Monday';
    weatherNextDayWeak2.innerText = 'Tuesday';
    weatherNextDayWeak3.innerText = 'Wenesday';

    weatherNextDay1.append(
      weatherNextDayWeak1,
      weatherNextDay1Temp,
      weatherNextDay1Img
    )

    weatherNextDay2.append(
      weatherNextDayWeak2,
      weatherNextDay2Temp,
      weatherNextDay2Img
    )

    weatherNextDay3.append(
      weatherNextDayWeak3,
      weatherNextDay3Temp,
      weatherNextDay3Img
    )

    weatherNextDayList.append(
      weatherNextDay1,
      weatherNextDay2,
      weatherNextDay3
    )

    weatherTodayInfoList.append(
      weatherTodayInfoListWeather,
      weatherTodayInfoListFeels,
      weatherTodayInfoListWind,
      weatherTodayInfoListHumidity
    )

    weatherToday.append(
      weatherTodayTemp,
      weatherTodayImg,
      weatherTodayInfoList
    )

    weatherBlock.append(
      weatherCity,
      weatherDate,
      weatherToday,
      weatherNextDayList
    )

    return weatherBlock;
  }

}
