import Api from './api';

export default class ImageFetch extends Api {
  constructor() {
    super();
    this.urlBase = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=';
    this.apiAccessKeys = '&client_id=-X8223ZLTnhLaRLPkyJu7rUYZyBryiLt5ZZSrs2HJSc';
  }

  async getImage(city) {
    const url = `${this.urlBase + city + this.apiAccessKeys}`;
    const data = await this.getJsonData(url);
    return data;
  }
}
