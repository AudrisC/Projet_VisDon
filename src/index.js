import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'css/style.css';
import L from 'leaflet';
import data from '../data/pays_poly_cantons.json';
import 'index_svg.js';
//import 'index_canton.js'

// Mise en place de la taille de la carte et de son centre 
var mymap = L.map('mapid').setView([52.52, 13.405], 8);

// Chargement du type de carte
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16,

}).addTo(mymap);

// Marker de base
var marker = L.marker([46.94, 7.46]).addTo(mymap);

// Insérer la data pays.json à la carte
var geojson = L.geoJson(data).addTo(mymap);

//Afficher le pop-up
geojson.eachLayer(function (layer) {
	layer.bindPopup(layer.feature.properties.name);
});


mymap.fitBounds(geojson.getBounds())
	.setView([52.52, 13.405], 4);
