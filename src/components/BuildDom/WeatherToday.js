import { createElement } from '../component/createElement';

const weatherCity = createElement('div', 'weather_today_block--city_country', 'text_base');


export class WeatherToday {
  constructor() {
    this.date = new Date

  }

  updateData(city) {
    weatherCity.innerText = city;
  }

  createWeatherTodayBlock(rootElement) {
    const weatherBlock = createElement('div', 'weather_block');
    // const weatherCity = createElement('div', 'weather_today_block--city_country', 'text_base');
    const weatherDate =createElement('div', 'text_base', 'weather_today_block--date_time');
    const weatherToday = createElement('div', 'weather-today');
    const weatherTodayTemp = createElement('div', 'text_base', 'weather_today_block--temp');
    const weatherTodayImg = createElement('img', 'weather_today_block--sign');
    const weatherTodayInfoList = createElement('div', 'weather_today_block--info_list');
    const weatherTodayInfoListItem1 = createElement('div', 'text_base', 'weather_today_block--info_list-item');
    const weatherTodayInfoListItem2 = createElement('div', 'text_base', 'weather_today_block--info_list-item');
    const weatherTodayInfoListItem3 = createElement('div', 'text_base', 'weather_today_block--info_list-item');
    const weatherTodayInfoListItem4 = createElement('div', 'text_base', 'weather_today_block--info_list-item');
    
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

    weatherCity.innerText = 'Belarus, Minsk';
    weatherDate.innerText = `${this.date.getHours()} : ${this.date.getMinutes()}`;
    weatherTodayTemp.innerText = '+54';
    weatherTodayImg.setAttribute('src', 'assets/img/rain.png');
    weatherTodayInfoListItem1.innerText = 'rain';
    weatherTodayInfoListItem2.innerText = 'Feels like:  +5°';
    weatherTodayInfoListItem3.innerText = 'Wind: 8 m/s';
    weatherTodayInfoListItem4.innerText = 'Humidity: 88%n';

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
      weatherTodayInfoListItem1,
      weatherTodayInfoListItem2,
      weatherTodayInfoListItem3,
      weatherTodayInfoListItem4
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
