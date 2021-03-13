const dsv = require('d3-dsv');
const fs = require('fs');

const porticPointcallsDescriptions = require('./data/portic_pointcalls_descriptions.json')
const porticFlowsDescriptions = require('./data/portic_flows_descriptions.json')
const navigoPointCalls = dsv.csvParse(fs.readFileSync('./data/navigo_pointcalls_poitou_1789.csv', 'utf8'));
const navigoFlows = dsv.csvParse(fs.readFileSync('./data/navigo_flows_poitou_1789.csv', 'utf8'));

const toflit18Descriptions = require('./data/toflit18_sources_schema.json')
const toflitFlux = dsv.csvParse(fs.readFileSync('./data/toflit18_poitou_1789.csv', 'utf8'));


const NAVIGO_OMIT_LIST = [
  // 'pkid',
  // 'record_id',
  // 'pointcall_uhgs_id',
  // 'toponyme_en',
  // 'latitude',
  // 'longitude',
  // 'source_doc_id',
  // 'ship_id',
  // 'homeport_uhgs_id',
  // 'homeport_toponyme_en',
  // 'homeport_latitude',
  // 'homeport_longitude',
  // 'homeport_states_en',
  // 'homeport_substates_en',
  // 'homeport_substate_1789_en',
  // 'source_number',
  // 'source_main_port_uhgs_id',
  // 'captain_id',
  // 'outdate_fixed',
  // 'pointcall_in_date',
  // 'ship_flag_id',
  // 'in_crew',
  // 'pointcall_point',
  // 'date_fixed',
  // 'pointcall_rankfull',
  // 'commodity_id',
  // 'commodity_id2',
  // 'commodity_id3',
  // 'commodity_id4',
  // 'commodity_id5',
  // 'all_cargos',
  // 'commodity_permanent_coding',
  // 'commodity_permanent_coding2',
  // 'commodity_permanent_coding3',
  // 'commodity_permanent_coding4',
  // 'commodity_permanent_coding5',
]

const TOFLIT_OMIT_LIST = [
  // 'line_number',
  // 'source',
  // 'data_collector',
  // 'duty_remarks',
  // 'nb_occurence_BdCFR',
  // 'needs_more_details',
  // 'value',
  // 'filepath',
  // 'sheet',
  // 'value_total',
  // 'absurd_observation',
  // 'value_minus_unit_val_x_qty'
]

const buildFileName = (sourceName, property) => `public/profiles/${sourceName}_${property}.csv`;

const buildProfiles = (data, sourceName, omitList = []) => {
  const columns = data.columns.filter(id => !omitList.includes(id));
  console.log('columns', columns.join('\n'))
  
  const allModalities = columns.reduce((res, id, modIndex) => {
    console.log('process', id)
    return {
      ...res,
      [id]: data.reduce((mod, datum, index) => {
        if (index%100 === 0) {
          console.log(sourceName, id, modIndex + 1, '/', columns.length, index + 1, '/', data.length);
        }
        const value = datum[id] || 'vide';
        return {
          ...mod,
          [value]: mod[value] === undefined ? 1 : mod[value] + 1
        }
      }, {})
    }
  }, {})
  Object.entries(allModalities).forEach(([property, modalitiesMap]) => {
    const modalities = Object.entries(modalitiesMap)
    .map(([value, count]) => ({value, count}))
    .sort((a, b) => {
      if (a.value > b.value) {
        return 1;
      } else if (a.value < b.value) {
        return -1;
      }
      return 0;
    });
    const fileName = buildFileName(sourceName, property);
    fs.writeFileSync(fileName, dsv.csvFormat(modalities), 'utf8')
  })
}

const buildProfilesSummary = (sources => {
  const finalData = sources.reduce((res, source) => {
    const metadata = source.metadata;
    const files = source.data.columns.filter(id => !source.omitKeys.includes(id))
    .map(modality => {
      const file_path = `profiles/${source.source}_${modality}.csv`;
      return {
        source: source.source,
        modality,
        file_path,
        description: metadata && metadata[modality] ? metadata[modality].description : ''
      }
    })
    return [
      ...res,
      ...files
    ]
  }, [])
  fs.writeFileSync(`public/profiles_summary.csv`, dsv.csvFormat(finalData), 'utf8')
})

const preparePorticDescriptions = (desc) => {
  return desc.reduce((res, endpoint) => ({
    ...res,
    [endpoint.name]: {
      description: endpoint.description
    }
  }), {})
}

const prepareToflitDescriptions = () => {
  return toflit18Descriptions.fields.reduce((res, field) => ({
    ...res,
    [field.name]: {
      description: field.description
    }
  }), {})
}

buildProfiles(toflitFlux, 'toflit18', TOFLIT_OMIT_LIST)
buildProfiles(navigoPointCalls, 'navigo_pointcalls', NAVIGO_OMIT_LIST)
buildProfiles(navigoFlows, 'navigo_flows', NAVIGO_OMIT_LIST)
buildProfilesSummary([
  {
    source: 'navigo_pointcalls',
    omitKeys: NAVIGO_OMIT_LIST,
    data: navigoPointCalls,
    metadata: preparePorticDescriptions(porticPointcallsDescriptions)
  },
  {
    source: 'navigo_flows',
    omitKeys: NAVIGO_OMIT_LIST,
    data: navigoFlows,
    metadata: preparePorticDescriptions(porticFlowsDescriptions)
  },
  {
    source: 'toflit18',
    omitKeys: TOFLIT_OMIT_LIST,
    data: toflitFlux,
    metadata: prepareToflitDescriptions(toflit18Descriptions)
  },
])
console.log('all done');