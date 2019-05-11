const fetch = require('node-fetch')
const pays = require('./data') // .json
const pays_poly = require('./pays.json')
const canton = require('./cantons_abbrev.json').features // .json
const R = require('ramda')
const fs = require('fs')

const getCanton = (cantons, features) =>
  features.find(f => f.properties.abbrev === cantons)


const preparePays = d => ({
    name : d.pays,
    list : Object.keys(d)
    .filter(key => key !== "pays")
    .map(abbrev => ({
      abbrev, 
      valeur: d[abbrev]
    }))
})

const getGeometry = name => 
R.prop('geometry',pays_poly.features.find(R.pathEq(['properties', 'name_fr'], name)))

const addGeom = d =>({
  type : "Feature",
  properties : d,
  geometry : getGeometry(d.name)
  
})

const saveJSON = pays_data => {
  // data est la liste d'objets créés avec "formatData"
  fs.writeFile(
    'pays_cantons.json', // le nom du fichier
    JSON.stringify(pays_data, null, 2), // les données transformées en chaîne de charactères
    'utf-8', // l'encodage du fichier
    err => err ? console.log(err) : console.log('Saved pays_cantons.json')
    // cette fonction est appelée quand le fichier a été sauvé
    // ou si une erreur est survenue
    // elle prends un argument "err" qui est l'erreur s'il y en a une
    // si "err" existe, nous écrivons l'erreur dans la console
    // sinon nous disons que le fichier a été sauvé
  )
}

const test = pays
              .map(preparePays)
              .map(addGeom); 
//console.log(test);

var jsonContent = JSON.stringify(test, null, 3);
//console.log(jsonContent);


fs.writeFile("pays_poly_cantons.json", jsonContent, function(err) {
    if (err) {
        console.log(err);
    }
});

//saveJSON(test)
//console.log(pays.map(preparePays).map(addGeom))




