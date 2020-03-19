import React from 'react';
import {Line} from 'react-chartjs-2';
import _, {Dictionary} from "lodash";
import moment from "moment";

export default function Chart({labels, dataPerCountry, country, days, color}: { labels: Date[], dataPerCountry: string[], country: string, days: number, color: string }) {
    const commonLineStyle = {
        backgroundColor: color + 'AA',
        borderColor: color,
        pointBorderColor: color,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: color + '33',
        pointBackgroundColor: '#fff',
        fill: false,
        lineTension: 0.1,
        borderCapStyle: 'butt',
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderWidth: 1,
        pointHoverRadius: 10,
        pointHoverBorderWidth: 2,
        pointHitRadius: 10
    };
    const pastLineStyle = {...commonLineStyle, borderDash: [], pointRadius: 3};
    const predictionLineStyle = {
        ...commonLineStyle,
        borderDash: [5, 2],
        pointRadius: 2,
        backgroundColor: '#000AA',
        borderColor: '#2196f3',
        pointHoverRadius: 5,
        pointBorderColor: '#2196f3',
        pointHoverBackgroundColor: '#2196f3',
        pointHoverBorderColor: '#00033'
    };


    function buildNextDaysLabels(startingDay: Date, days: number): Date[] {
        return _.reduce(_.range(1, +days + +1), (acc, v, i) => {
            acc[i] = moment(startingDay || Date.now()).add(i + 1, "days").toDate();
            return acc
        }, [] as Date[]);
    }

    function nextDayPrediction(allDays: Dictionary<number>, currentDate: Date) {
        const predictionSampleSize = 3;
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

    function calculateAccuracy(dataExistingPlot: number[], dataPredictedPlot: number[]) {
        function mismatchPercentage(existing: number, predicted: number) {
            if (existing === predicted) {
                return 0;
            } else if (existing === 0 || predicted === 0) {
                return (existing + predicted) * 100
            } else {
                const biggerVal = _.max([existing, predicted])!;
                const smallerVal = _.min([existing, predicted])!;
                return Math.round(Math.abs(1 - biggerVal / smallerVal) * 100);
            }
        }

        const deviationAgeDays = 7;
        const deviations = _.takeRight(_.zipWith(dataExistingPlot, dataPredictedPlot, mismatchPercentage), deviationAgeDays);
        return Math.round(_.mean(deviations));
    }

    const buildData = () => {
        const labelsNormalized = _.concat(labels, buildNextDaysLabels(_.last(labels)!, days));
        const existingData = zipLabelsWithValues(labels, dataPerCountry.map(Number));
        const prediction = buildPrediction(labelsNormalized, existingData, days)
        let indexOfFirstPacient = _.findIndex(_.values(existingData), (x) => x > 0) - 1
        indexOfFirstPacient = indexOfFirstPacient < 0 ? 0 : indexOfFirstPacient
        let dataExistingPlot = _.values(existingData).slice(indexOfFirstPacient);
        let dataPredictedPlot = _.values(prediction).slice(indexOfFirstPacient);
        console.warn(calculateAccuracy(dataExistingPlot, dataPredictedPlot))
        let labelsPlot = labelsNormalized.slice(indexOfFirstPacient).map(date => moment(date).format('ll'));
        return {
            labels: labelsPlot,
            datasets: [
                {...pastLineStyle, label: country, data: dataExistingPlot},
                {...predictionLineStyle, label: country + ' (predicted)', data: dataPredictedPlot}
            ]
        }
    }

    return <Line data={buildData()} width={100} height={45} legend={null}/>;
}