const fetch = require('node-fetch')
const pays = require('./data') // .json
const canton = require('./cantons_abbrev.json').features // .json

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

const addGeom = d =>({
  type : "Feature",
  properties : d,
  
})





console.log(preparePays(pays[1]))




