const addMap = (mapKey, x=50, y=50) => {

  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

  mapboxgl.accessToken = 'pk.eyJ1IjoiazItbTUiLCJhIjoiY2thdTZzZTdwMDg4ejJzbGZmNWhueWxqYyJ9.OXbeiDM2288nOEa_m4K92w';
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v10', //hosted style id
      center: [x, y], // starting position
      zoom: 3 // starting zoom
  })

  return(map);
};

export default addMap;
