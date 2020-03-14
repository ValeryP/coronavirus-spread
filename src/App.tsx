import React, {useEffect, useState} from 'react';
import Papa, {ParseResult} from 'papaparse';
import Chart from "./Chart";
import {FormControl, Grid, InputLabel, Link, MenuItem, Select, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import _ from "lodash";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: 0,
            margin: theme.spacing(2),
            textAlign: 'center'
        },
        formControl: {
            margin: theme.spacing(2),
            minWidth: 100,
        },
        footer: {
            marginTop: theme.spacing(2),
        },
        chart: {
            width: '95%',
            height: '95%'
        }
    }),
);

function App() {
    const classes = useStyles();
    const baseUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-";
    const types = {
        'Confirmed': '#2C98F0',
        'Deaths': '#FC562E',
        'Recovered': '#52AF55'
    };
    const daysMapping = {
        'Tomorrow': 1,
        '2 days': 2,
        '3 days': 3,
        '4 days': 4,
        '5 days': 5,
        '1 week': 7,
        '2 weeks': 14,
        '3 weeks': 21,
        '1 month': 31
    }

    const [labels, setLabels] = useState([] as string[]);
    const [country, setCountry] = useState("Italy");
    const [dataType, setDataType] = useState("Confirmed");
    const [countries, setCountries] = useState([] as string[]);
    const [days, setDays] = useState(1);
    const [data, setData] = useState([] as any[]);

    const inputCountryLabel = React.useRef<HTMLLabelElement>(null);
    const [labelCountryWidth, setLabelCountryWidth] = React.useState(0);
    const inputDaysLabel = React.useRef<HTMLLabelElement>(null);
    const [labelDaysWidth, setLabelDaysWidth] = React.useState(0);
    const inputDataTypeLabel = React.useRef<HTMLLabelElement>(null);
    const [labelDataTypeWidth, setLabelDataTypeWidth] = React.useState(0);

    React.useEffect(() => {
        setLabelCountryWidth(inputCountryLabel.current!.offsetWidth);
        setLabelDaysWidth(inputDaysLabel.current!.offsetWidth);
        setLabelDataTypeWidth(inputDataTypeLabel.current!.offsetWidth);
    }, []);

    const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCountry(event.target.value as string);
    };

    const handleDaysChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDays(event.target.value as number);
    };

    const handleDataTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDataType(event.target.value as string);
    };

    function processLoadedData(results: ParseResult) {
        let data = results.data;
        let labels = _.slice(_.keys(data[0]), 4) as string[]
        let countries = data.map(row => row['Province/State'].length > 0 ? `${row['Country/Region']}/${row['Province/State']}` : row['Country/Region']);
        setCountries(countries)
        setLabels(labels)
        setData(data)
    }

    const loadData = () => {
        Papa.parse(baseUrl + dataType + '.csv', {
            skipEmptyLines: true, header: true, download: true, delimiter: ',',
            complete: function (results) {
                processLoadedData(results);
            }
        });
    }

    useEffect(loadData, [dataType]);

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

    function buildTypeSelect() {
        return <>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputDataTypeLabel}
                            id="select-type-input-id">Type</InputLabel>
                <Select
                    labelId="select-type-select-label"
                    id="select-type-select-id"
                    value={dataType}
                    onChange={handleDataTypeChange}
                    labelWidth={labelDataTypeWidth}
                >
                    {
                        _.map(_.keys(types), (value, index) => <MenuItem key={index}
                                                                         value={value}>{value}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>
    }

    function buildChart() {
        // @ts-ignore
        let color = types[dataType];
        return data.length
            ? <Chart labels={labels} dataPerCountry={getCasesPerCountry(country)} country={country}
                     days={days} color={color}/>
            : '';
    }

    function getFooter() {
        return <Typography variant={"caption"}>
            <Link target="_blank" href="https://github.com/CSSEGISandData/COVID-19">
                Data source
            </Link>
            {' | '}
            <Link target="_blank" href="https://t.me/coronavirus_spread">
                Feedback
            </Link>
            {' | '}
            <Link target="_blank" href="https://github.com/ValeryP/coronavirus-spread">
                Github
            </Link>
        </Typography>;
    }

    return (
        <Grid
            container direction="column" justify="center" alignItems="center"
            className={classes.root}>
            <Grid item>
                {buildTypeSelect()}
                {buildCountrySelect()}
                {buildDaysSelect()}
            </Grid>
            <Grid item className={classes.chart}>
                {buildChart()}
            </Grid>
            <Grid item className={classes.footer} >
                {getFooter()}
            </Grid>
        </Grid>
    )
}

export default App;
