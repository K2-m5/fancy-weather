export default class Api {
  async getJsonData(url) {
    try {
      this.url = url;
      const response = await fetch(url);
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
}
