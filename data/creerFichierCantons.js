const d3 = require('d3')
const fs = require('fs')
const cantons = require('./cantons_abbrev.json')

// copié de https://observablehq.com/@idris-maps/cantons
const projection = d3.geoMercator().fitExtent([[0, 0], [500, 300]], cantons)
const pathCreator = d3.geoPath().projection(projection)
const DATA = cantons.features.map(feature => ({
  abbrev: feature.properties.abbrev,
  d: pathCreator(feature),
}))

// copié de to fichier data/jointData.js
const saveJSON = data => {
  fs.writeFile(
    'cantons_geoms_et_abbrev.json',
    JSON.stringify(data, null, 2),
    'utf-8',
    err => err ? console.log(err) : console.log('Saved cantons_geoms_et_abbrev.json')
  )
}

saveJSON(DATA)
