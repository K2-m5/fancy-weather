export class CoordUserFetch {
  constructor() {
    this.apiKeys = {
      TOKEN: 'token=aa64ada01df09a',
      URL: 'https://ipinfo.io/json?'
    };
  }

  async getPlaceByIp() {
    const url = this.apiKeys.URL + this.apiKeys.TOKEN;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
