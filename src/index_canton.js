import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'css/style.css';
import L from 'leaflet';
import data from '../data/cantons.json';

var mapboxAccessToken = 'pk.eyJ1IjoiYXVkcmlzYyIsImEiOiJjanZpMHVuMXAwMHlzNDBrM213NWh6OWljIn0.JDKCs2ccUj31mzgn4YquRg';
var map = L.map('cantonid').setView([47.02, 8.33], 7.5);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
}).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light'
}).addTo(map);

L.geoJson(data).addTo(map);