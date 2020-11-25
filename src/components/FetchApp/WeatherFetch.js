import Api from './api';

export default class WeatherApi extends Api {
  constructor() {
    super();
    this.apiKeys = {
      KEY: '&APPID=3066604c97083b97576234dd7fff14e2',
      URL: 'https://api.openweathermap.org/data/2.5/',
      FORECAST: 'forecast?',
      WEATHER: 'weather?',
      LAT: 'lat=',
      LONG: '&lon=',
      LANG: '&lang=',
      UNITS: '&units=',
    };
  }

  async getDataWeatherByCity(city) {
    const url = `${this.apiKeys.URL + this.apiKeys.WEATHER}q=${city}${
      this.apiKeys.LANG + WeatherApi.getLanguage()
    }${this.apiKeys.UNITS + WeatherApi.getUnits()}${this.apiKeys.KEY}`;

    const data = await this.getJsonData(url);
    if (!data) {
      return false;
    }
    return data;
  }

  async getDataForecastByCity(city) {
    const url = `${this.apiKeys.URL + this.apiKeys.FORECAST}q=${city}${
      this.apiKeys.LANG + WeatherApi.getLanguage()
    }${this.apiKeys.UNITS + WeatherApi.getUnits()}${this.apiKeys.KEY}`;

    const data = await this.getJsonData(url);
    if (!data) {
      return false;
    }
    return data;
  }

  async getDataWeather(lng, ltd) {
    const url =
      this.apiKeys.URL +
      this.apiKeys.WEATHER +
      this.apiKeys.LAT +
      ltd +
      this.apiKeys.LONG +
      lng +
      this.apiKeys.LANG +
      WeatherApi.getLanguage() +
      this.apiKeys.UNITS +
      WeatherApi.getUnits() +
      this.apiKeys.KEY;

    const data = await this.getJsonData(url);
    return data;
  }

  async getDataForecast(lng, ltd) {
    const url =
      this.apiKeys.URL +
      this.apiKeys.FORECAST +
      this.apiKeys.LAT +
      ltd +
      this.apiKeys.LONG +
      lng +
      this.apiKeys.LANG +
      WeatherApi.getLanguage() +
      this.apiKeys.UNITS +
      WeatherApi.getUnits() +
      this.apiKeys.KEY;

    const data = await this.getJsonData(url);
    return data;
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
