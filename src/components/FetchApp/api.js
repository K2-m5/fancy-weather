export default class Api {
  async getJsonData(url) {
    this.url = url;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  }
}
