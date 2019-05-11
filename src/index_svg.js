import {select, geoMercator, geoPath} from 'd3'
import cantons from '../data/cantons_abbrev.json'; 
import 'd3'; 


const body = select(document.body)
const svg = body.append('svg').attr('viewBox', `0 0 600 200`)

const projection = geoMercator().fitExtent([[0, 0], [600, 200]], cantons)
const pathCreator = geoPath().projection(projection)

const DATA = cantons.features.map(feature => ({
    abbrev: feature.properties.abbrev,
    d: pathCreator(feature),
}))

const drawCanton = (svg, pathCreator) => {
    
    svg.selectAll('DATA.coordinates') //Mon select all n'est pas détecté
        .data(DATA.features)
        .enter()
        .append('DATA')
            .attr('class', 'cantion')
            .attr('d', pathCreator)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('stroke-linecap', 'round')


}


drawCanton(svg, pathCreator)
