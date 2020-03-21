import React, {useEffect, useState} from 'react';
import Papa from 'papaparse';
import Chart from "./Chart";
import {
    Fade,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
    Typography
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import _, {Dictionary} from "lodash";
import ReactGA from 'react-ga';
import moment from "moment";
import {useCookies} from "react-cookie";
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import ReactHtmlParser from 'react-html-parser';

const {Octokit} = require("@octokit/rest");
const octokit = new Octokit();

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
            opacity: 0.5
        },
        latestUpdate: {
            opacity: 0.5
        },
        chart: {
            width: '90%'
        },
        infoIcon: {
            color: theme.palette.grey.A200,
            height: theme.spacing(2),
            width: theme.spacing(2),
            marginTop: 4,
            marginLeft: 2
        },
    }),
);

function App() {
    const classes = useStyles();
    const baseUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-";
    const types = {
        'Confirmed': '#f57c00',
        'Deaths': '#FC562E',
        'Recovered': '#388e3c'
    };
    const daysMapping = {
        'Tomorrow': 1,
        '2 days': 2,
        '3 days': 3,
        '1 week': 7
    }
    const [cookies, setCookie] = useCookies(['saved-prefs']);

    const [labels, setLabels] = useState([] as Date[]);
    const [country, setCountry] = useState(cookies['country'] || 'Worldwide');
    const [dataType, setDataType] = useState(cookies['type'] || 'Confirmed');
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
                let countries = _.concat(['Worldwide'], _.sortBy(data.map(row => row['Province/State'].length > 0 ? `${row['Country/Region']}/${row['Province/State']}` : row['Country/Region'])));
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
        function getCasesPerCountry(countryToCheck: string): string[] {
            if (countryToCheck === 'Worldwide') {
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

        function buildNextDaysLabels(startingDay: Date, days: number): Date[] {
            return _.reduce(_.range(1, +days + +1), (acc, v, i) => {
                acc[i] = moment(startingDay || Date.now()).add(i + 1, "days").toDate();
                return acc
            }, [] as Date[]);
        }

        function nextDayPrediction(allDays: Dictionary<number>, currentDate: Date) {
            const predictionSampleSize = 5;
            const index = _.indexOf(_.keys(allDays), moment(currentDate).format('l'))
            const lastPart = _.slice(_.values(allDays), index - predictionSampleSize, index + 1);
            const mults = _.reduce(lastPart, (acc, value, i) => {
                let previousValue = lastPart[i - 1];
                if (i > 0 && previousValue > 0 && !isNaN(value) && !isNaN(previousValue)) {
                    acc[i - 1] = value / previousValue
                }
                return acc
            }, [] as number[])
            let remove = _.filter(mults, x => !_.isNaN(x));
            const avgMult = _.mean(remove) || 1
            return _.reduce(_.range(1, 2), (acc, v, i) => {
                acc[i] = Math.round(_.reduce(_.range(0, v), (acc) => acc * avgMult, 1) * (_.last(lastPart) || 0));
                return acc
            }, [] as number[])[0];
        }

        function onlyValidNumbers(values: number[]) {
            return _.filter(values, (v) => v !== undefined);
        }

        function zipLabelsWithValues(dateLabels: Date[], values: number[]): Dictionary<number> {
            return _.zipObject(dateLabels.map(x => moment(x).format('l')), values);
        }

        function buildPrediction(labelsNormalized: Date[], existingData: Dictionary<number>, range: number) {
            let oneDayPrediction = _.concat([0], _.take(_.map(labelsNormalized, (date: Date) => nextDayPrediction(existingData, date)), _.values(existingData).length));
            let predictionAcc = zipLabelsWithValues(labelsNormalized, oneDayPrediction);
            for (let i = 1; i < range; i++) {
                const targetDay = labelsNormalized[_.findIndex(_.values(predictionAcc), v => v === undefined) - 1]
                const nextDayPredicted = nextDayPrediction(predictionAcc, targetDay)
                const newPredictionSerie = _.concat(onlyValidNumbers(_.values(predictionAcc)), [nextDayPredicted]);
                predictionAcc = zipLabelsWithValues(labelsNormalized, newPredictionSerie)
            }
            return _.values(predictionAcc);
        }

        function calculateAccuracy(dataExistingPlot: number[], dataPredictedPlot: number[], days: number) {
            function mismatchPercentage(existing: number, predicted: number) {
                if (existing === predicted) {
                    return 0;
                } else if (existing === 0 || predicted === 0) {
                    return (existing + predicted) * 100
                } else {
                    const biggerVal = _.max([existing, predicted])!;
                    const smallerVal = _.min([existing, predicted])!;
                    return Math.abs(1 - biggerVal / smallerVal) * 100;
                }
            }

            const deviationAgeDays = 7;
            const deviationsAll = _.zipWith(dataExistingPlot, dataPredictedPlot, mismatchPercentage);
            const rangeStart = deviationsAll.length - days - deviationAgeDays < 0 ? 0 : deviationsAll.length - days - deviationAgeDays;
            const deviations = _.slice(deviationsAll, rangeStart, rangeStart + deviationAgeDays).filter(x => !isNaN(x));
            const acc = _.round(100 - _.mean(deviations), 1);
            if (acc <= 0) {
                return 1;
            } else if (acc >= 100) {
                return 99;
            } else {
                return acc;
            }
        }

        const labelsNormalized = _.concat(labels, buildNextDaysLabels(_.last(labels)!, days));
        const dataPerCountry = getCasesPerCountry(country).map(Number);
        const existingData = zipLabelsWithValues(labels, dataPerCountry);
        const prediction = buildPrediction(labelsNormalized, existingData, days)
        let indexOfFirstPacient = _.findIndex(_.values(existingData), (x) => x > 0) - 1
        indexOfFirstPacient = indexOfFirstPacient < 0 ? 0 : indexOfFirstPacient
        let dataExistingPlot = _.values(existingData).slice(indexOfFirstPacient);
        let dataPredictedPlot = _.values(prediction).slice(indexOfFirstPacient);
        let labelsPlot = labelsNormalized.slice(indexOfFirstPacient).map(date => moment(date).format('ll'));
        const accuracy = calculateAccuracy(dataExistingPlot, dataPredictedPlot, days);
        if (accuracy < 60) {
            dataPredictedPlot = dataPredictedPlot.map(_ => NaN);
        }
        const predictionTomorrow = _.findLast(buildPrediction(labelsNormalized, existingData, 1), (x) => x !== undefined);
        // @ts-ignore
        const color = types[dataType];
        const titleTooltip = "The accuracy calculation is based on a comparison of the last 7 days prediction and actual values of those days"
        return data.length
            ? (
                <>
                    <Grid item>
                        <Grid item container direction="row" justify="center" alignItems="center">
                            {accuracy > 60
                                ? <>
                                    <Grid item>
                                        <Typography variant={"caption"}>
                                            {ReactHtmlParser(`There is <strong>${accuracy}%</strong> chance to have <strong>${predictionTomorrow}</strong> ${_.lowerCase(dataType)} tomorrow (${country})`)}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title={titleTooltip} arrow
                                                 TransitionComponent={Fade}>
                                            <InfoRoundedIcon className={classes.infoIcon}/>
                                        </Tooltip>
                                    </Grid>
                                </>
                                : <>
                                    <Typography variant={"caption"}>
                                        {ReactHtmlParser(`${country} does not have enough <strong>${_.lowerCase(dataType)}</strong> cases for reliable prediction`)}
                                    </Typography>
                                </>}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Chart labelsPlot={labelsPlot} dataExistingPlot={dataExistingPlot}
                               dataPredictedPlot={dataPredictedPlot} country={country}
                               color={color}/>
                    </Grid>
                </>
            )
            : '';
    }

    function getFooter() {
        return <Typography variant={"caption"}>
            <ReactGA.OutboundLink
                eventLabel="Data source" target="_blank"
                to="https://github.com/CSSEGISandData/COVID-19">
                Data source
            </ReactGA.OutboundLink>
            {' • '}
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
            <Grid item container direction="column" className={classes.chart}>
                {buildChart()}
            </Grid>
            <Grid item className={classes.footer}>{getFooter()}</Grid>
            {lastUpdate &&
            <Grid item className={classes.latestUpdate}>{buildLastUpdateLabel()}</Grid>}
        </Grid>
    )
}

export default App;
