import React, {useEffect, useState} from 'react';
import './App.css';
import Papa from 'papaparse';
import Chart from "./Chart";


function App() {
    const [labels, setLabels] = useState([] as string[]);
    const [data, setData] = useState([] as number[]);
    const [country, setCountry] = useState("");

    const loadData = (country: string = "Germany") => {
        setCountry(country);
        Papa.parse("https://cowid.netlify.com/data/total_cases.csv", {
            skipEmptyLines: true, header: true, download: true, delimiter: ',',
            complete: function (results) {
                setLabels(results.data.map(row => row['date']))
                setData(results.data.map(row => row[country]))
            }
        });
    }

    console.log(data);

    useEffect(loadData, []);

    return (
        <div className="App">
            <h1>{country}</h1>
            <Chart labels={labels} data={data} country={country}/>
        </div>
    );
}

export default App;
