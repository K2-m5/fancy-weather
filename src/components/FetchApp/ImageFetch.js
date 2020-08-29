export default class ImageFetch {
  constructor() {
    this.urlBase = 'https://api.unsplash.com/photos/?client_id=';
    this.apiAccessKeys = '-X8223ZLTnhLaRLPkyJu7rUYZyBryiLt5ZZSrs2HJSc';
  }

  async getImage() {
    const url = `${this.urlBase + this.apiAccessKeys}`;

    const response = await fetch(url);
    const data = await response.json();

    document.body.style = `
    background:linear-gradient(rgba(255,255,255,0.1), rgba(0,0,0,0.5)),url(${data[0].urls.regular});
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: top;
    font-family: Montserrat;
    `;
  }
}
