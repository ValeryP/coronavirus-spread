import React, {useEffect, useState} from 'react';
import './App.css';
import Papa from 'papaparse';
import Chart from "./Chart";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import _ from "lodash";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

function App() {
    const classes = useStyles();

    const [labels, setLabels] = useState([] as string[]);
    const [data, setData] = useState([] as any[]);
    const [country, setCountry] = useState("Worldwide");
    const [countries, setCountries] = useState([] as string[]);

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCountry(event.target.value as string);
    };

    const loadData = () => {
        Papa.parse("https://cowid.netlify.com/data/total_cases.csv", {
            skipEmptyLines: true, header: true, download: true, delimiter: ',',
            complete: function (results) {
                setCountries(_.uniq(_.flatMap(_.values(results.data)).flatMap(x => _.keys(x))).filter(x => x !== 'date'))
                setLabels(results.data.map(row => row['date']))
                console.log(_.values(results.data))
                setData(results.data)
            }
        });
    }

    useEffect(loadData, []);

    function buildSelect() {
        return <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Country
                </InputLabel>
                <Select
                    labelId="select-country-label"
                    id="select-country"
                    value={country}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                >
                    {
                        countries.map((country, index) =>
                            <MenuItem key={index} value={country}>{country}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>
    }

    return (
        <div className="App">
            {buildSelect()}
            {data.length && <Chart labels={labels} data={data} country={country}/>}
        </div>
    );
}

export default App;
