import { createElement } from '../component/createElement';

export class MapBlock {
  constructor() {
  }

  createMapBlock() {
    const mapBlock = createElement ('div', 'map-block');
    const map = createElement ('div', 'map');
    map.id = 'map';

    mapBlock.append(
      map
    )

    return mapBlock;
  }

  addMap(mapKey, x=50, y=50) {
  
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  
    mapboxgl.accessToken = 'pk.eyJ1IjoiazItbTUiLCJhIjoiY2thdTZzZTdwMDg4ejJzbGZmNWhueWxqYyJ9.OXbeiDM2288nOEa_m4K92w';
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/dark-v10', //hosted style id
        center: [x, y], // starting position
        zoom: 3 // starting zoom
    })

    return(map);
  };

  updateMap(lat, lon) {
    this.map.flyTo({
        center: [lon, lat],
        zoom: 8,
    });
  }
}