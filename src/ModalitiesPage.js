import React, {useState, useEffect} from 'react';
import {VegaLite} from 'react-vega';
import get from 'axios';
import {csvParse} from 'd3-dsv';
// import Table from 'rc-table';

const MAX_MODALITIES_IN_VIZ = 40;

function ModalitiesPage({
  summary: {
    source, 
    modality, 
    file_path, 
    description = ''
}}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    get(`${process.env.PUBLIC_URL}/${file_path}`)
    .then(({data: csv}) => {
      const data = csvParse(csv);
      setData(data);
    })
    .catch(() => {
      console.log(`could not get ${process.env.PUBLIC_URL}/${file_path}`)
    })
  }, [file_path]);
  const completionData = data.reduce((res, {value, count}) => {
      if (value === 'vide') {
        res[0].count += (+count);
      }
      else {
        res[1].count += (+count);
      }
      return res;
    }, [{value: 'vide', count: 0}, {value: 'remplie', count: 0}])
  const visibleData = (data.length > MAX_MODALITIES_IN_VIZ ? data.slice(0, MAX_MODALITIES_IN_VIZ) : data).filter(d => d.value !== 'vide');
  return (
    <section className="ModalitiesPage">
      <h2>{modality} ({source})</h2>
      {
        data.length ?
        <div className="vis-container">
          {description && description.length ?
          <>
            <h3>Description de la dimension dans la doc</h3>
            <blockquote>
              {description}
            </blockquote>
          </>
          : null}
          <h3>Carte d'identité de la dimension</h3>
          
          <ul>
            <li>Nombre total de modalités : {data.filter(f => f.value !== 'vide').length}</li>
            <li>Exhaustivité (valeurs non-vides) : {parseFloat((completionData[1].count / (completionData[0].count + completionData[1].count)) * 100).toFixed(2)}% ({completionData[1].count} / {(completionData[0].count + completionData[1].count)})</li>
            <li>contrôle cumulation des valeurs : {data.reduce((sum, modality) => sum + +modality.count , 0)} entrées</li>
            <li>Nombre moyen de valeurs pour chaque modalité : {
            ((data.filter(d => d.value !== 'vide').reduce((sum, modality) => sum + (+modality.count) , 0)) / data.length).toFixed(2)}</li>
          </ul>
          <h3>{data.length > MAX_MODALITIES_IN_VIZ ? `${MAX_MODALITIES_IN_VIZ} principales modalités` : 'Toutes les modalités'} : </h3>
          <VegaLite spec={{
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "data": {
              "values": visibleData
            },
            "layer": [
              {
                "mark": "bar"
              }, {
                "mark": {
                  "type": "text",
                  "align": "left",
                  "baseline": "middle",
                  "dx": 3
                },
                "encoding": {
                  "text": {"field": "count", "type": "quantitative"}
                }
              }
            ],
            "encoding": {
              "x": {
                "field": "count", 
                "type": "quantitative", 
                "axis": {"labelAngle": 0}},
              "y": {
                "field": "value", 
                "type": "nominal",
                "sort": {"field": "count",  "op": "mean", "order": "descending"}
              }
            }
          }} />
        </div>
        : null
      }
      {
        /*
        for control only
        data.length && data.length < 300 ?
        <Table 
          columns={Object.keys(data[0]).map(key => ({
            title: key,
            dataIndex: key,
            key,
            width: 100,
          }))}  
          data={data.sort((a, b) => {
            if (+a.count > +b.count) {
              return -1;
            }
            return 1;
          })} 
        />
        : null
        */
      }
      
    </section>
  )
}

export default ModalitiesPage;