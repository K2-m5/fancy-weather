export default class ImageFetch {
  constructor() {
    this.urlBase = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=';
    this.apiAccessKeys = '&client_id=-X8223ZLTnhLaRLPkyJu7rUYZyBryiLt5ZZSrs2HJSc';
  }

  async getImage(city) {
    const url = `${this.urlBase + city + this.apiAccessKeys}`;
    const response = await fetch(url);
    const data = await response.json();

    document.body.style = `
    background:linear-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.5)),url(${data.urls.regular});
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: top;
    font-family: Montserrat;
    `;
  }
}
