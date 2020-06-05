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

  addMap(mapKey) {
    const success = (pos) => {
      var crd = pos.coords;
    
      const data = {
        lon:crd.longitude,
        lat:crd.latitude
      };

      var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  
      mapboxgl.accessToken = mapKey;
      this.map = new mapboxgl.Map({
          container: 'map', // container id
          style: 'mapbox://styles/mapbox/dark-v10', //hosted style id
          center: [data.lon, data.lat], // starting position
          zoom: 12 // starting zoom
      })
  
      return(map);

    };
    

    navigator.geolocation.getCurrentPosition(success);
  
  };

  updateMap(lat, lon) {
    this.map.flyTo({
        center: [lon, lat],
        zoom: 8,
    });
  }
}