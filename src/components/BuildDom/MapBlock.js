import { createElement } from '../component/createElement';
import mapboxgl from 'mapbox-gl'

export class MapBlock {
  constructor(mapKey) {
    this.mapboxGl = mapboxgl;
    this.map = null;

    this.mapboxGl.accessToken = mapKey;
  }

  createMapBlock() {
    const mapBlock = createElement ('div', 'map-block');
    const map = createElement ('div', 'map');
    map.id = 'map';

    mapBlock.append(map);

    return mapBlock;
  }

  addMap(lon, lat) {
      this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/dark-v10',
          center: [lon, lat],
          zoom: 12
      });

      return(map);
    };

  updateMap(lon, lat) {
    if (!this.map) return;

    this.map.flyTo({
      center: [lon, lat],
      zoom: 12,
    });
  }

}