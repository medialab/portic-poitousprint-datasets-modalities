import get from 'axios';
import {csvParse} from 'd3-dsv';
import {useState, useEffect} from 'react';
import ModalitiesPage from './ModalitiesPage';
import './App.css';

const profilesSummaryPath = `${process.env.PUBLIC_URL}/profiles_summary.csv`

function App() {
  const [profilesSummary, setProfilesSummary] = useState([]);
  useEffect(() => {
    get(profilesSummaryPath)
    .then(({data: csv}) => {
      const data = csvParse(csv);
      setProfilesSummary(data);
    })
  }, [])
  return profilesSummary.length ? (
    <>
      {
        profilesSummary
        // .filter(s => s.source === 'navigo')
        .map((summary, index) => {
          return (
            <ModalitiesPage key={index} summary={summary} />
          )
        })
      }
    </>
  ) : null;
}

export default App;
