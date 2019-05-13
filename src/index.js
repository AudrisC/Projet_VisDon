import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'css/style.css';
import L from 'leaflet';
import data from '../data/pays_poly_cantons.json';

const finalPays = require('./getPays.js')
const d3 = require('d3')

// Mise en place de la taille de la carte et de son centre (Berlin)
var mymap = L.map('mapid').setView([52.52, 13.405], 8);
mymap.createPane('labels');
mymap.getPane('labels').style.zIndex = 650;
mymap.getPane('labels').style.pointerEvents = 'none';

// Chargement du type de carte sur Leaflet
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16,

}).addTo(mymap);

// Marker de base (Suisse)
var marker = L.marker([46.94, 7.46]).addTo(mymap);

// Insérer la data pays.json à la carte
var geojson = L.geoJson(data).addTo(mymap);

// Carte en SVG 
var pays = finalPays.getFinalPays();
const creerSvg = donneesJointes =>
	`<svg viewBox="0 0 500 300">
    ${
	donneesJointes.map(({ fill, d }) => `<path fill="${fill}" d="${d}" />`).join('\n')
	}
</svg>`


//Afficher le pop-up avec la répartition par Canton inclus. 
geojson.eachLayer(function (layer) {
	var namePays = layer.feature.properties.name;
	var found = pays.find(function (element) {
		return element.name == namePays;
	});
	var listPays = found.list;

	// fonction pour les échelles de couleur
	const echelleCouleur = d3.scaleLinear().domain([
		d3.min(listPays.map(x => x.valeur)),
		d3.max(listPays.map(x => x.valeur))
	]).range(['yellow', 'red'])
	
	// fonction pour rajouter l'échelle de couleur 
	const joindre = valeursParPays =>
		valeursParPays.map(({ abbrev, valeur, d }) => ({
			abbrev: abbrev,
			fill: echelleCouleur(valeur),
			d: d
		}))
	
	const resultatFinal = joindre(listPays);
	const dessin = creerSvg(resultatFinal);

	// Intégration du SVG dans le Popup
	var div = $(
		'<div class="svg_dessin lead" id="' + namePays + '" style="width: 550px; height:400px;" > \
							'+ dessin + ' \
							'+ namePays  +'</div>'
	)[0];
	var popup = L.popup().setContent(div);

	layer.bindPopup(popup, {
		maxWidth: "auto"
	  });
	//console.log(listPays);
	//layer.bindPopup(layer.feature.properties.name);
});


mymap.fitBounds(geojson.getBounds())
	.setView([52.52, 13.405], 4.5);

