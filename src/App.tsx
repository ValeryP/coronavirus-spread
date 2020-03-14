import React, {useEffect, useState} from 'react';
import Papa from 'papaparse';
import Chart from "./Chart";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import _ from "lodash";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
            textAlign: 'center'
        },
        formControl: {
            margin: theme.spacing(2),
            minWidth: 100,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

function App() {
    const classes = useStyles();
    const baseUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/";

    const [labels, setLabels] = useState([] as string[]);
    const [country, setCountry] = useState("Italy");
    const [dataSource, setDataSource] = useState("time_series_19-covid-Confirmed.csv");
    const [countries, setCountries] = useState([] as string[]);
    const [days, setDays] = useState(1);
    const [data, setData] = useState([] as any[]);

    const inputCountryLabel = React.useRef<HTMLLabelElement>(null);
    const [labelCountryWidth, setLabelCountryWidth] = React.useState(0);
    const inputDaysLabel = React.useRef<HTMLLabelElement>(null);
    const [labelDaysWidth, setLabelDaysWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelCountryWidth(inputCountryLabel.current!.offsetWidth);
        setLabelDaysWidth(inputDaysLabel.current!.offsetWidth);
    }, []);

    const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCountry(event.target.value as string);
    };

    const handleDaysChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDays(event.target.value as number);
    };

    const loadData = () => {
        Papa.parse(baseUrl + dataSource, {
            skipEmptyLines: true, header: true, download: true, delimiter: ',',
            complete: function (results) {
                let data = results.data;
                let labels = _.slice(_.keys(data[0]), 4) as string[]
                let countries = data.map(row => row['Province/State'].length > 0 ? `${row['Country/Region']}/${row['Province/State']}` : row['Country/Region']);
                setCountries(countries)
                setLabels(labels)
                setData(data)
            }
        });
    }

    useEffect(loadData, []);

    function getCasesPerCountry(countryToCheck: string) {
        return _.slice(_.values(_.find(data, row => {
            let isComplexRegion = _.indexOf(countryToCheck, '/') !== -1;
            const region = isComplexRegion ? _.split(countryToCheck, '/')[0] : countryToCheck
            const state = isComplexRegion ? _.split(countryToCheck, '/')[1] : ""
            return row['Country/Region'] === region && row['Province/State'] === state
        })), 4) as string[];
    }

    const listOfCountries = _.reverse(_.sortBy(countries, x => _.sum(getCasesPerCountry(x).map(x => Number(x)))));

    function buildCountrySelect() {
        return <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputCountryLabel}
                            id="select-country-input-id">Location</InputLabel>
                <Select
                    labelId="select-country-select-label"
                    id="select-country-select-id"
                    value={country}
                    onChange={handleCountryChange}
                    labelWidth={labelCountryWidth}
                >
                    {
                        listOfCountries.map((country, index) =>
                            <MenuItem key={index} value={country}>{country}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>
    }

    function buildDaysSelect() {
        const daysMapping = {
            'Tomorrow': 1,
            'in 2 days': 2,
            'in 3 days': 3,
            'in 4 days': 4,
            'in 5 days': 5,
            'in 1 week': 7,
            'in 2 weeks': 14,
            'in 3 weeks': 21,
            'in 1 month': 31
        }
        return <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputDaysLabel}
                            id="select-days-input-id">Prediction</InputLabel>
                <Select
                    labelId="select-days-select-label"
                    id="select-days-select-id"
                    value={days}
                    onChange={handleDaysChange}
                    labelWidth={labelDaysWidth}
                >
                    {
                        _.map(daysMapping, (values, key) => <MenuItem key={values}
                                                                      value={values}>{key}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>
    }

    return (
        <div className={classes.root}>
            {buildCountrySelect()}
            {buildDaysSelect()}
            {data.length &&
            <Chart labels={labels} dataPerCountry={getCasesPerCountry(country)} country={country}
                   days={days}/>}
        </div>
    );
}

export default App;
