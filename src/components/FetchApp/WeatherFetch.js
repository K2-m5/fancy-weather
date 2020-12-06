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

  async getDataWeatherByCity(city, lang, units) {
    const url = `${this.apiKeys.URL + this.apiKeys.WEATHER}q=${city}${this.apiKeys.LANG + lang}${
      this.apiKeys.UNITS + units
    }${this.apiKeys.KEY}`;

    const data = await this.getJsonData(url);
    if (!data) {
      return false;
    }
    return data;
  }

  async getDataForecastByCity(city, lang, units) {
    const url = `${this.apiKeys.URL + this.apiKeys.FORECAST}q=${city}${this.apiKeys.LANG + lang}${
      this.apiKeys.UNITS + units
    }${this.apiKeys.KEY}`;

    const data = await this.getJsonData(url);
    if (!data) {
      return false;
    }
    return data;
  }

  async getDataWeather(lng, ltd, lang, units) {
    const url =
      this.apiKeys.URL +
      this.apiKeys.WEATHER +
      this.apiKeys.LAT +
      ltd +
      this.apiKeys.LONG +
      lng +
      this.apiKeys.LANG +
      lang +
      this.apiKeys.UNITS +
      units +
      this.apiKeys.KEY;

    const data = await this.getJsonData(url);
    return data;
  }

  async getDataForecast(lng, ltd, lang, units) {
    const url =
      this.apiKeys.URL +
      this.apiKeys.FORECAST +
      this.apiKeys.LAT +
      ltd +
      this.apiKeys.LONG +
      lng +
      this.apiKeys.LANG +
      lang +
      this.apiKeys.UNITS +
      units +
      this.apiKeys.KEY;

    const data = await this.getJsonData(url);
    return data;
  }
}
