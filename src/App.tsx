import React, {useEffect, useState} from 'react';
import Papa from 'papaparse';
import Chart from "./Chart";
import {FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import _ from "lodash";
import ReactGA from 'react-ga';
import moment from "moment";
import {useCookies} from "react-cookie";
import {strings} from './strings'

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
            opacity: 0.5
        },
        latestUpdate: {
            opacity: 0.5
        },
        chart: {
            width: '90%'
        }
    }),
);

const {Octokit} = require("@octokit/rest");
const octokit = new Octokit();

function App() {
    const classes = useStyles();
    const baseUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-";
    const types = {
        [strings.Confirmed]: '#2C98F0',
        [strings.Deaths]: '#FC562E',
        [strings.Recovered]: '#52AF55'
    };
    const daysMapping = {
        [strings.Tomorrow]: 1,
        [strings.days2]: 2,
        [strings.days3]: 3,
        [strings.week1]: 7
    }
    const [cookies, setCookie] = useCookies(['saved-prefs']);

    const [labels, setLabels] = useState([] as Date[]);
    const [country, setCountry] = useState(cookies['country'] || strings.Worldwide);
    const [dataType, setDataType] = useState(cookies['type'] || strings.Confirmed);
    const [countries, setCountries] = useState([] as string[]);
    const [days, setDays] = useState(cookies['prediction'] || 1);
    const [data, setData] = useState([] as any[]);
    const [lastUpdate, setLastUpdate] = useState('');

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
        let newCountry = event.target.value as string;
        ReactGA.event({
            category: 'Select',
            action: 'Country',
            label: newCountry
        });
        setCookie('country', newCountry, {path: '/'});
        setCountry(newCountry);
    };

    const handleDaysChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let newRange = event.target.value as number;
        ReactGA.event({
            category: 'Select',
            action: 'Range',
            label: _.findKey(newRange)
        });
        setCookie('prediction', newRange, {path: '/'});
        setDays(newRange);
    };

    const handleDataTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let newType = event.target.value as string;
        ReactGA.event({
            category: 'Select',
            action: 'Type',
            label: newType
        });
        setCookie('type', newType, {path: '/'});
        setDataType(newType);
    };

    const loadData = () => {
        Papa.parse(baseUrl + dataType + '.csv', {
            skipEmptyLines: true, header: true, download: true, delimiter: ',',
            complete: function (results) {
                let data = results.data;
                let labels = _.map(_.slice(_.keys(data[0]), 4), (strDate) => moment(strDate).add(1, 'days').toDate())
                let countries = _.concat([strings.Worldwide], _.sortBy(data.map(row => row['Province/State'].length > 0 ? `${row['Country/Region']}/${row['Province/State']}` : row['Country/Region'])));
                setCountries(countries)
                setLabels(labels)
                setData(data)
            }
        });
    }

    const loadLastUpdateTime = () => {
        octokit.repos.listCommits({
            owner: 'CSSEGISandData',
            repo: 'COVID-19'
        }).then((x: any) => {
            const latestCommitTime = _.values(x['data'])[0]['commit']['committer']['date']
            setLastUpdate(moment(latestCommitTime).fromNow());
        });
    }

    useEffect(loadData, [dataType]);
    useEffect(loadLastUpdateTime, []);

    function getCasesPerCountry(countryToCheck: string) {
        if (countryToCheck === strings.Worldwide) {
            let casesSelection = _.map(data, x => _.slice(_.values(x), 4) as string[]);
            return _.filter(_.reduce(casesSelection, (acc, value, index) => {
                acc[index] = String(_.sum(_.map(casesSelection, (row => Number(row[index])))));
                return acc
            }, [] as string[]), (value) => Number(value) > 0);
        } else {
            return _.slice(_.values(_.find(data, row => {
                let isComplexRegion = _.indexOf(countryToCheck, '/') !== -1;
                const region = isComplexRegion ? _.split(countryToCheck, '/')[0] : countryToCheck
                const state = isComplexRegion ? _.split(countryToCheck, '/')[1] : ""
                return row['Country/Region'] === region && row['Province/State'] === state
            })), 4) as string[];
        }
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
                        countries.map((country, index) =>
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

    function buildChart() {
        // @ts-ignore
        const color = types[dataType];
        const dataPerCountry = getCasesPerCountry(country);
        return data.length
            ? <Chart labels={labels} dataPerCountry={dataPerCountry} country={country}
                     days={days} color={color}/>
            : '';
    }

    function getFooter() {
        return <Typography variant={"caption"}>
            <ReactGA.OutboundLink
                eventLabel="Data source" target="_blank"
                to="https://github.com/CSSEGISandData/COVID-19">
                Data source
            </ReactGA.OutboundLink>
            {' | '}
            <ReactGA.OutboundLink
                eventLabel="Feedback" target="_blank"
                to="https://t.me/coronavirus_spread">
                Feedback
            </ReactGA.OutboundLink>
            {' | '}
            <ReactGA.OutboundLink
                eventLabel="Github" target="_blank"
                to="https://github.com/ValeryP/coronavirus-spread">
                Github
            </ReactGA.OutboundLink>
        </Typography>;
    }

    function buildLastUpdateLabel() {
        return <Typography variant={"caption"}>{`Latest update ${lastUpdate}`}</Typography>;
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
            {lastUpdate &&
            <Grid item className={classes.latestUpdate}>{buildLastUpdateLabel()}</Grid>}
            <Grid item className={classes.chart}>
                {buildChart()}
            </Grid>
            <Grid item className={classes.footer}>
                {getFooter()}
            </Grid>
        </Grid>
    )
}

export default App;
