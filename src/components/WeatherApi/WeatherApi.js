
export class WeatherApi {
  constructor(openWeatherKeys) {
    this.apiKeys = openWeatherKeys
  }

  async getCurrentWeatherByCity(city) {
      const url = `${this.apiKeys.URL + this.apiKeys.WEATHER
      }q=${city
      }${this.apiKeys.LANG}${this.apiKeys.UNITS}${this.apiKeys.KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      return data;
  }

  getForecastByCity(city) {
      const url = `${this.apiKeys.URL + this.apiKeys.FORECAST
      }q=${city
      }${this.apiKeys.LANG}${this.apiKeys.UNITS}${this.apiKeys.KEY}`;

      return getDataJson(url);
  }
}