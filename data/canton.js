const fetch = require('node-fetch')
const pays = require('./data') // .json
const pays_poly = require('./pays.json')
const canton = require('./cantons_abbrev.json').features // .json
const R = require('ramda')
const fs = require('fs')


const saveJSON = canton_data => {
  // data est la liste d'objets créés avec "formatData"
  fs.writeFile(
    'cantons_svg.json', // le nom du fichier
    JSON.stringify(pays_data, null, 2), // les données transformées en chaîne de charactères
    'utf-8', // l'encodage du fichier
    err => err ? console.log(err) : console.log('cantons_svg.json')
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


fs.writeFile("cantons_svg.json", jsonContent, function(err) {
    if (err) {
        console.log(err);
    }
});