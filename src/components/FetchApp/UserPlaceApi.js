import Api from './api';

export default class UserPlaceApi extends Api {
  constructor() {
    super();
    this.apiKeys = {
      TOKEN: 'token=aa64ada01df09a',
      URL: 'https://ipinfo.io/json?',
    };
  }

  async getPlaceByIp() {
    const url = this.apiKeys.URL + this.apiKeys.TOKEN;

    const data = await this.getJsonData(url);

    return data;
  }
}
