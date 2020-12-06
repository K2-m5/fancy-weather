import WeatherApi from './WeatherFetch';
import CoordUserFetch from './UserPlaceApi';
import ImageFetch from './ImageFetch';
import PlaceCoordinateApi from './PlaceCoordinateApi';
import data from './data';

export default class ApiService {
  constructor() {
    this.weatherApi = new WeatherApi();
    this.userPlaceApi = new CoordUserFetch();
    this.imageApi = new ImageFetch();
    this.placeCrdApi = new PlaceCoordinateApi();
    this.data = data;
  }

  async getImage(city) {
    const image = await this.imageApi.getImage(city);
    if (image) {
      document.body.style = `
      background:linear-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.5)),url(${image.urls.regular});
      background-repeat: no-repeat;
      background-size: cover;
      background-attachment: fixed;
      background-position: top;
      font-family: Montserrat;
      `;
    }
  }

  async getDataPlace(lang) {
    const dataCity = await this.userPlaceApi.getPlaceByIp();
    const dataPlace = await this.placeCrdApi.getCoordinateByPlace(dataCity.city, lang);
    this.provideDataPlace(dataPlace);
  }

  getForecast(dataForecast) {
    this.currentDate = new Date().toDateString();
    const newDayIndex = dataForecast.findIndex(
      (listItem) => this.currentDate !== new Date(listItem.dt_txt).toDateString()
    );
    const todayExcluded = dataForecast.slice(newDayIndex);
    const forecastData = [];
    for (let i = 4; i < todayExcluded.length; i += 8) {
      forecastData.push(todayExcluded[i]);
    }
    return forecastData.slice(0, 3);
  }

  provideDataWeather(dataWeather, dataForecast) {
    this.data.weather.feelsLike = Math.round(dataWeather.main.feels_like);
    this.data.weather.temp = Math.round(dataWeather.main.temp);
    this.data.weather.humidity = dataWeather.main.humidity;
    this.data.weather.description = dataWeather.weather[0].description;
    this.data.weather.icon = dataWeather.weather[0].icon;
    this.data.weather.wind = dataWeather.wind.speed;
    this.data.forecast = this.getForecast(dataForecast.list);
  }

  async getDataWeather(lang, units) {
    const {
      coordinate: { lng, ltd },
    } = this.data;
    const dataWeather = await this.weatherApi.getDataWeather(lng, ltd, lang, units);
    const dataForecast = await this.weatherApi.getDataForecast(lng, ltd, lang, units);
    this.provideDataWeather(dataWeather, dataForecast);
  }

  async getDataUserRequest(city) {
    const lang = ApiService.getLanguage();
    const units = ApiService.getUnits();
    const dataPlace = await this.placeCrdApi.getCoordinateByPlace(city, lang);
    if (dataPlace) {
      this.provideDataPlace(dataPlace);
    } else {
      return;
    }
    await this.getImage(city);
    const dataWeather = await this.weatherApi.getDataWeatherByCity(city, lang, units);
    const dataForecast = await this.weatherApi.getDataForecastByCity(city, lang, units);
    if (dataWeather && dataForecast) {
      this.provideDataWeather(dataWeather, dataForecast);
      console.log(this.data);
    } else {
      console.log('Data by weather does not found');
    }
  }

  provideDataPlace(dataPlace) {
    this.data.city = dataPlace.results[0].components.city;
    this.data.region = dataPlace.results[0].components.country;
    this.data.country = dataPlace.results[0].components.country;
    this.data.timezone = dataPlace.results[0].annotations.timezone.name;
    this.data.coordinate.ltd = String(dataPlace.results[0].geometry.lat);
    this.data.coordinate.lng = String(dataPlace.results[0].geometry.lng);
  }

  async initData() {
    const lang = ApiService.getLanguage();
    const units = ApiService.getUnits();
    await this.getDataPlace(lang);
    await this.getImage(this.data.city);
    await this.getDataWeather(lang, units);
    console.log(this.data);
  }

  static getUnits() {
    if (localStorage.getItem('temperature') === 'F') {
      return 'imperial';
    }
    return 'metric';
  }

  static getLanguage() {
    if (localStorage.getItem('language') === 'by') return 'ru';
    return localStorage.getItem('language');
  }
}
