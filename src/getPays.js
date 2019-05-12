const cantons = require('../data/cantons_geoms_et_abbrev.json')
const pays = require('../data/pays_poly_cantons.json')

module.exports.getFinalPays = () => {
    var paysReduced = pays.map(feature => feature.properties);

    var finalPays = paysReduced.map(paysEl => {
        obj = {}
        obj.name = paysEl.name;

        newList = paysEl.list.map(canton => (
            {
                abbrev: canton.abbrev,
                valeur: canton.valeur,
                d: cantons.find( c => c.abbrev == canton.abbrev).d
            }
        ));

        obj.list = newList;

        return obj;
    });

    return finalPays;
}