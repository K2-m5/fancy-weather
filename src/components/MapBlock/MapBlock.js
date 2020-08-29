import { createElement } from '../utils/createElement';
import mapboxgl from 'mapbox-gl';
import { words } from '../const/words';
import { symbolCoordinate } from '../const/symbol';

import './MapBlock.css';

const { hour, min, sec } = symbolCoordinate;
const index = (str) => str.indexOf('.');

export default class MapBlock {
  constructor(mapKey) {
    this.mapboxGl = mapboxgl;
    this.map = null;
    this.mapBlock = createElement('div', 'map-block');
    this.mapboxGl.accessToken = mapKey;
    this.latitude = createElement('div', 'text_base', 'latitude');
    this.latitudeValue = createElement('div', 'text_base', 'latitude_value');
    this.longitude = createElement('div', 'text_base', 'longitude');
    this.longitudeValue = createElement('div', 'text_base', 'longitude_value');
  }

  createMapBlock() {
    const map = createElement('div', 'map');
    const coordinateLat = createElement('div', 'coordinate');
    const coordinateLong = createElement('div', 'coordinate');
    map.id = 'map';

    this.latitude.innerText = 'Latitude';
    this.longitude.innerText = 'Longitude';
    coordinateLat.append(
      this.latitude,
      this.latitudeValue
    );
    coordinateLong.append(
      this.longitude,
      this.longitudeValue
    );
    this.mapBlock.append(
      map,
      coordinateLat,
      coordinateLong
    );
    return this.mapBlock;
  }

  addMap(lon, lat) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 12
    });
    this.latitudeValue.innerText = `${lat.slice(0, index(lat)) + hour} ${lat.slice(index(lat) + 1, index(lat) + 3) + min} ${lat.slice(index(lat) + 3) + sec}`;
    this.longitudeValue.innerText = `${lon.slice(0, index(lon)) + hour} ${lon.slice(index(lon) + 1, index(lon) + 3) + min} ${lon.slice(index(lon) + 3) + sec}`;
    return (this.map);
  }

  updateMap(lon, lat) {
    if (!this.map) return;

    this.map.flyTo({
      center: [lon, lat],
      zoom: 12
    });
    this.latitudeValue.innerText = `${lat.slice(0, index(lat)) + hour} ${lat.slice(index(lat) + 1, index(lat) + 3) + min} ${lat.slice(index(lat) + 3) + sec}`;
    this.longitudeValue.innerText = `${lon.slice(0, index(lon)) + hour} ${lon.slice(index(lon) + 1, index(lon) + 3) + min} ${lon.slice(index(lon) + 3) + sec}`;
  }

  renderDataLanguageMap(lang) {
    let wordText = words.find(item => item.language === lang);
    this.latitude.innerText = wordText.latitude;
    this.longitude.innerText = wordText.longitude;
  }
}
