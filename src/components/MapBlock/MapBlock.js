import { createElement } from '../../utils/createElement';
import mapboxgl from 'mapbox-gl';
import { symbolCoordinate } from '../../utils/symbol';

import './MapBlock.css';

const { hour, min, sec } = symbolCoordinate;
const index = (str) => str.indexOf('.');

export default class MapBlock {
  constructor(mapKey) {
    this.mapboxGl = mapboxgl;
    this.map = null;
    this.mapBlock = createElement('div', 'map-block');
    this.mapBlockWrapper = createElement('div', 'wrapper-map-block');
    this.mapboxGl.accessToken = mapKey;
    this.latitude = createElement('div', 'latitude');
    this.latitudeValue = createElement('div', 'latitude_value');
    this.longitude = createElement('div', 'longitude');
    this.longitudeValue = createElement('div', 'longitude_value');
  }

  createMapBlock(lang) {
    const map = createElement('div', 'map');
    const coordinatedWrapper = createElement('div', 'coordinate--wrapper');
    const coordinateLat = createElement('div', 'coordinate');
    const coordinateLong = createElement('div', 'coordinate');
    map.id = 'map';

    this.latitude.innerText = lang.latitude;
    this.longitude.innerText = lang.longitude;
    coordinateLat.append(this.latitude, this.latitudeValue);
    coordinateLong.append(this.longitude, this.longitudeValue);
    coordinatedWrapper.append(coordinateLat, coordinateLong);
    this.mapBlock.append(map);
    this.mapBlockWrapper.append(this.mapBlock, coordinatedWrapper);
    return this.mapBlockWrapper;
  }

  addMap(lon, lat) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: 12,
      trackResize: true,
    });
    this.latitudeValue.innerText = `${lat.slice(0, index(lat)) + hour} ${
      lat.slice(index(lat) + 1, index(lat) + 3) + min
    } ${lat.slice(index(lat) + 3) + sec}`;
    this.longitudeValue.innerText = `${lon.slice(0, index(lon)) + hour} ${
      lon.slice(index(lon) + 1, index(lon) + 3) + min
    } ${lon.slice(index(lon) + 3) + sec}`;
    return this.map;
  }

  updateMap(lon, lat) {
    if (!this.map) return;

    this.map.flyTo({
      center: [lon, lat],
      zoom: 12,
    });
    this.latitudeValue.innerText = `${lat.slice(0, index(lat)) + hour} ${
      lat.slice(index(lat) + 1, index(lat) + 3) + min
    } ${lat.slice(index(lat) + 3) + sec}`;
    this.longitudeValue.innerText = `${lon.slice(0, index(lon)) + hour} ${
      lon.slice(index(lon) + 1, index(lon) + 3) + min
    } ${lon.slice(index(lon) + 3) + sec}`;
  }

  renderDataLanguageMap(lang) {
    this.latitude.innerText = lang.latitude;
    this.longitude.innerText = lang.longitude;
  }
}
