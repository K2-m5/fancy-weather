import Api from './api';

export default class PlaceCoordinateApi extends Api {
  constructor() {
    super();
    this.apiKeys = {
      TOKEN: '&key=ee04ecdb632d47b0b1fc6b541148a06e',
      URL: 'https://api.opencagedata.com/geocode/v1/json?q=',
    };
  }

  async getCoordinateByPlace(city) {
    const url = this.apiKeys.URL + city + this.apiKeys.TOKEN;
    const data = await this.getJsonData(url);
    return data;
  }

  async getInfoByCity(query, lang) {
    const url = `${
      this.apiKeys.URL + query + this.apiKeys.KEY + this.apiKeys.PARAMS
    }&language=${lang}`;
    const data = await this.getJsonData(url);
    return data;
  }
}
