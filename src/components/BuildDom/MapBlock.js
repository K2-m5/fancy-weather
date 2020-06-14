import { createElement } from '../component/createElement';
import mapboxgl from 'mapbox-gl';
import { words } from '../const/words';

export class MapBlock {
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
