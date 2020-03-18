import React from 'react';
import {Line} from 'react-chartjs-2';
import _ from "lodash";
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
        pointRadius: 5,
        backgroundColor: '#000AA',
        borderColor: '#2196f3',
        pointBorderColor: '#2196f3',
        pointHoverBackgroundColor: '#2196f3',
        pointHoverBorderColor: '#00033'
    };

    function normailizeLatestDaysNumber(latestDaysNumber: number) {
        let latestDaysCases = _.slice(dataPerCountry, dataPerCountry.length - latestDaysNumber - 1);
        const latestDaysCasesNonZero = latestDaysCases.filter(x => x !== "0").length
        return latestDaysCasesNonZero < latestDaysNumber ? latestDaysCasesNonZero - 1 : latestDaysNumber;
    }

    function buildNextDaysLabels(startingDay: Date | undefined, days: number): Date[] {
        return _.reduce(_.range(1, +days + +1), (acc, v, i) => {
            acc[i] = moment(startingDay || Date.now()).add(i + 1, "days").toDate();
            return acc
        }, [] as Date[]);
    }

    function buildPrediction(dataArray: number[], timeRange: number, predictionSample: number, logs: boolean) {
        const latestDaysNumber = normailizeLatestDaysNumber(predictionSample)
        const latestDaysCases = _.takeRight(dataArray, latestDaysNumber);
        const latestDaysDelta = latestDaysCases.map((v, i) => i === 0 ? 0 : v - latestDaysCases[i - 1])
        const mults = _.reduce(latestDaysCases, (acc, value, i) => {
            let previousValue = latestDaysCases[i - 1];
            if (i > 0 && previousValue > 0 && !isNaN(value) && !isNaN(previousValue)) {
                acc[i - 1] = value / previousValue
            }
            return acc
        }, [] as number[])
        let remove = _.filter(mults, x => !_.isNaN(x) && x !== 1);
        const avgMult = _.mean(remove) || 1
        if (logs) {
            // console.warn('xxx - latestDaysNumber:', latestDaysNumber)
            // console.warn('xxx - latestDaysCases:', latestDaysCases)
            // console.warn('xxx - latestDaysDelta:', latestDaysDelta)
            // console.warn('xxx - mults:', mults)
            // console.warn('xxx - remove:', remove)
            // console.warn('xxx - avgMult:', avgMult)
        }
        return _.reduce(_.range(1, +timeRange + +1), (acc, v, i) => {
            acc[i] = Math.round(_.reduce(_.range(0, v), (acc) => acc * avgMult, 1) * (_.last(latestDaysCases) || 0));
            return acc
        }, [] as number[]);
    }

    function predict(dataArray: number[], daysNumber: number): number[] {
        const predictionSampleSize = 3;
        const accum = _.take(dataArray, predictionSampleSize)
        console.warn('xxx: init - ', accum)
        for (let i: number = predictionSampleSize; i < dataArray.length; i++) {
            let logs = false;
            // let logs = i === 9;
            const dataArrayLastSample = _.slice(dataArray, i, +i + +predictionSampleSize + +1);
            const prediction = buildPrediction(dataArrayLastSample, 1, dataArrayLastSample.length, logs)
            let value = _.last(prediction)!!;
            accum[i] = value
            if (logs) {
                console.warn('xxx: day ', labels[i].toISOString())
                console.warn('xxx:', dataArrayLastSample)
                console.warn('xxx:', value)
            }
        }
        return accum
    }

    // console.warn('yyy')
    // const testSet = [0, 0, 0, 2]
    // const prediction = buildPrediction(testSet, 1, testSet.length, true)
    // console.warn('xxx:', testSet)
    // console.warn('xxx:', prediction)

    const buildData = () => {
        const existingData = _.zip(labels.map(x => moment(x).format('l')), dataPerCountry)
        const prediction = predict(existingData, days)
        console.warn('xxx - existingData:', existingData)
        console.warn('xxx - prediction:', prediction)
        const existingDataNormalized = _.concat(existingData, _.fill(Array(prediction.length - existingData.length), NaN));
        const predictedDataNormalized = _.concat(_.fill(Array(existingData.length), NaN), prediction);
        const labelsNormalized = _.concat(labels, buildNextDaysLabels(_.last(labels), prediction.length)).map(date => moment(date).format('ll'));
        let indexOfFirstPacient = _.findIndex(existingDataNormalized, (x) => x > 0) - 1
        indexOfFirstPacient = indexOfFirstPacient < 0 ? 0 : indexOfFirstPacient
        return {
            labels: labelsNormalized.slice(indexOfFirstPacient),
            datasets: [
                {
                    ...pastLineStyle,
                    label: country,
                    data: existingDataNormalized.slice(indexOfFirstPacient)
                },
                {
                    ...predictionLineStyle,
                    label: country + ' (predicted)',
                    data: predictedDataNormalized.slice(indexOfFirstPacient)
                }
            ]
        }
    }

    return <Line data={buildData()} width={100} height={45} legend={null}/>;
}