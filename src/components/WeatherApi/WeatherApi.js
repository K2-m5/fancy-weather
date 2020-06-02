import getDataJson from '../getDataJson/getDataJson';

export class WeatherApi {
  constructor(openWeatherKeys) {
    this.apiKeys = openWeatherKeys
  }

  getCurrentWeatherByCity(city) {
      const url = `${this.apiKeys.URL + this.apiKeys.WEATHER
      }q=${city
      }${this.apiKeys.LANG}${this.apiKeys.UNITS}${this.apiKeys.KEY}`;

      return getDataJson(url);
  }

  getForecastByCity(city) {
      const url = `${this.apiKeys.URL + this.apiKeys.FORECAST
      }q=${city
      }${this.apiKeys.LANG}${this.apiKeys.UNITS}${this.apiKeys.KEY}`;

      return getDataJson(url);
  }
}