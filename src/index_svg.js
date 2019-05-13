const d3 = require('d3')
const finalPays = require('./getPays.js')

var pays = finalPays.getFinalPays();
//console.log(pays);

// une fonction qui prends une abbreviation (p.ex 'VD')
// et retourne un attribut "d" (p. ex 'M 0 0 L ...')
const chercherDParAbbrev = abbrev =>
  pays.find(x => x.abbrev === abbrev).d


// une fonction pour créer le svg
// elle prends "donneesJointes"
// qui est une liste de "fill" et "d"
const creerSvg = donneesJointes =>
  `<svg viewBox="0 0 500 300">
    ${
      donneesJointes.map(({ fill, d }) => `<path fill="${fill}" d="${d}" />`).join('\n')
    }
  </svg>`


module.exports = valeursParPays => {
  // l'échelle change dépendant de valeursParPays
  const echelleCouleur = d3.scaleLinear().domain([
    d3.min(valeursParPays.map(x => x.valeur)),
    d3.max(valeursParPays.map(x => x.valeur))
  ]).range(['yellow', 'red'])

  // joins "valeursParPays" aux "d" des cantons
  // retourne une liste de "fill" et "d"
  const joindre = valeursParPays =>
    valeursParPays.map(({ abbrev, valeur }) => ({
      fill: echelleCouleur(valeur),
      d: chercherDParAbbrev(abbrev),
    }))

  const donneesJointes = joindre(valeursParPays)
  return creerSvg(donneesJointes)

}