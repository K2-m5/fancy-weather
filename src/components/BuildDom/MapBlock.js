import { createElement } from '../component/createElement';
import mapboxgl from 'mapbox-gl';
import { words } from '../const/words';

export class MapBlock {
  constructor(mapKey) {
    this.mapboxGl = mapboxgl;
    this.map = null;
    this.mapBlock = createElement('div', 'map-block');
    this.mapboxGl.accessToken = mapKey;
    this.latitude = createElement('div', 'text_base', 'map_latitude');
    this.latitudeValue = createElement('span', 'map_latitude');
    this.longitude = createElement('div', 'text_base', 'map_longitude');
    this.longitudeValue = createElement('span', 'map_longitude');
  }

  createMapBlock() {
    const map = createElement('div', 'map');

    map.id = 'map';
    this.latitude.id = 'latitude';
    this.longitude.id = 'longitude';
    this.latitude.innerText = 'Latitude';
    this.longitude.innerText = 'Longitude';
    this.latitude.append(this.latitudeValue);
    this.longitude.append(this.longitudeValue);
    this.mapBlock.append(
      map,
      this.latitude,
      this.longitude
    );
    return this.mapBlock;
  }

  addMap(lon, lat) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lon, lat],
      zoom: 12
    });
    this.latitudeValue.innerText = lat;
    this.longitudeValue.innerText = lon;
    return (this.map);
  }

  updateMap(lon, lat) {
    if (!this.map) return;

    this.map.flyTo({
      center: [lon, lat],
      zoom: 12
    });
    this.latitudeValue.innerText = lat;
    this.longitudeValue.innerText = lon;
  }

  renderDataLanguageMap(lang) {
    let wordText = words.find(item => item.language === lang);
    this.latitude.innerText = wordText.latitude;
    this.longitude.innerText = wordText.longitude;
  }
}
