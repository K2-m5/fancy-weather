import Api from './api';

export default class PlaceCoordinateApi extends Api {
  constructor() {
    super();
    this.apiKeys = {
      TOKEN: '&key=ee04ecdb632d47b0b1fc6b541148a06e',
      URL: 'https://api.opencagedata.com/geocode/v1/json?q=',
      PARAMS: '',
    };
  }

  async getCoordinateByPlace(city, lang) {
    const url = `${this.apiKeys.URL + city + this.apiKeys.TOKEN}&language=${lang}`;
    const data = await this.getJsonData(url);
    if (data.results.length === 0) {
      return false;
    }
    return data;
  }

  async getInfoByCoords(lat, lon, lang) {
    const url = `${
      this.apiKeys.URL + lat + lon + this.apiKeys.KEY + this.apiKeys.PARAMS
    }&language=${lang}`;
    const data = await this.getJsonData(url);
    return data;
  }
}
