const dsv = require('d3-dsv');
const fs = require('fs');
const allNavigoPointcalls = require('./data/navigo_all_pointcalls_1789.json')
const allNavigoFlows = require('./data/navigo_all_flows_1789.json')
const allToflit = dsv.csvParse(fs.readFileSync('./data/toflit18_all.csv', 'utf8'));

const writeNavigoPointcallsJSON = () => {
  const filtered = allNavigoPointcalls.filter(d => d.source_subset === 'Poitou_1789');
  fs.writeFileSync('data/navigo_pointcalls_poitou_1789.csv', dsv.csvFormat(filtered), 'utf8');
}

const writeNavigoFlowsJSON = () => {
  const filtered = allNavigoFlows.filter(d => d.source_subset === 'Poitou_1789');
  fs.writeFileSync('data/navigo_flows_poitou_1789.csv', dsv.csvFormat(filtered), 'utf8');
}

const toflit18JSON = () => {
  const filtered = allToflit.filter(d => d['customs_region'] === 'La Rochelle' && d['year'] === '1789');
  fs.writeFileSync('data/toflit18_poitou_1789.csv', dsv.csvFormat(filtered), 'utf8');
}

toflit18JSON();
writeNavigoPointcallsJSON();
writeNavigoFlowsJSON();