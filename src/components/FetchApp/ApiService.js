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

  async getDataPlace() {
    const dataPlace = await this.userPlaceApi.getPlaceByIp();
    this.data.city = dataPlace.city;
    this.data.region = dataPlace.region;
    this.data.country = dataPlace.country;
    this.data.timezone = dataPlace.timezone;
    this.data.coordinate.ltd = dataPlace.loc.slice(0, dataPlace.loc.indexOf(','));
    this.data.coordinate.lng = dataPlace.loc.slice(dataPlace.loc.indexOf(',') + 1);
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

  async getDataWeather() {
    const {
      coordinate: { lng, ltd },
    } = this.data;
    const dataWeather = await this.weatherApi.getDataWeather(lng, ltd);
    const dataForecast = await this.weatherApi.getDataForecast(lng, ltd);
    this.provideDataWeather(dataWeather, dataForecast);
  }

  async getDataUserRequest(city) {
    await this.getCoordinateByPlace(city);
    const dataWeather = await this.weatherApi.getDataWeatherByCity(city);
    const dataForecast = await this.weatherApi.getDataForecastByCity(city);
    if (dataWeather && dataForecast) {
      this.provideDataWeather(dataWeather, dataForecast);
      console.log(this.data);
    } else {
      console.log('Data by weather does not found');
    }
  }

  async getCoordinateByPlace(city) {
    const crd = await this.placeCrdApi.getCoordinateByPlace(city);
    if (crd.results.length) {
      this.data.city = crd.results[0].components.city;
      this.data.region = crd.results[0].components.country;
      this.data.country = crd.results[0].components.country;
      this.data.timezone = crd.results[0].annotations.timezone.name;
      this.data.coordinate.ltd = String(crd.results[0].geometry.lat);
      this.data.coordinate.lng = String(crd.results[0].geometry.lng);
    } else {
      console.log('Coordinate does not found');
    }
  }

  async getData() {
    await this.getDataPlace();
    await this.getImage(this.data.city);
    await this.getDataWeather();
    console.log(this.data);
  }
}
