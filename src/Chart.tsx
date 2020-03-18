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

    function buildPrediction(dataArray: number[], logs: boolean = false) {
        const mults = _.reduce(dataArray, (acc, value, i) => {
            let previousValue = dataArray[i - 1];
            if (i > 0 && previousValue > 0 && !isNaN(value) && !isNaN(previousValue)) {
                acc[i - 1] = value / previousValue
            }
            return acc
        }, [] as number[])
        let remove = _.filter(mults, x => !_.isNaN(x));
        const avgMult = _.mean(remove) || 1
        if (logs) {
            console.warn('xxx - mults:', mults)
            console.warn('xxx - remove:', remove)
            console.warn('xxx - avgMult:', avgMult)
        }
        return _.reduce(_.range(1, 2), (acc, v, i) => {
            acc[i] = Math.round(_.reduce(_.range(0, v), (acc) => acc * avgMult, 1) * (_.last(dataArray) || 0));
            return acc
        }, [] as number[])[0];
    }


    function nextDayPrediction(allDays: Dictionary<number>, currentDate: string, logs: boolean = false) {
        const index = _.indexOf(_.keys(allDays), currentDate)
        const lastPart = _.slice(_.values(allDays), index - 3, index + 1);
        const prediction = buildPrediction(lastPart, logs)
        if (logs) {
            console.warn('xxx allDays:', allDays);
            console.warn('xxx currentDate:', currentDate)
            console.warn('xxx index:', index)
            console.warn('xxx last:', lastPart)
            console.warn('xxx last:', prediction)
        }
        return prediction
    }

    const buildData = () => {
        const existingData = _.zipObject(labels.map(x => moment(x).format('l')), dataPerCountry.map(Number))
        const prediction = _.concat([0], _.map(_.keys(existingData), (date: string) => nextDayPrediction(existingData, date)))
        // console.warn(nextDayPrediction(existingData, '1/02/2020', true))
        const labelsNormalized = _.concat(labels, buildNextDaysLabels(_.last(labels)!, prediction.length - _.values(existingData).length)).map(date => moment(date).format('ll'));
        let indexOfFirstPacient = _.findIndex(_.values(existingData), (x) => x > 0) - 1
        indexOfFirstPacient = indexOfFirstPacient < 0 ? 0 : indexOfFirstPacient
        return {
            labels: labelsNormalized.slice(indexOfFirstPacient),
            datasets: [
                {
                    ...predictionLineStyle,
                    label: country + ' (predicted)',
                    data: _.values(prediction).slice(indexOfFirstPacient)
                },
                {
                    ...pastLineStyle,
                    label: country,
                    data: _.values(existingData).slice(indexOfFirstPacient)
                }
            ]
        }
    }

    return <Line data={buildData()} width={100} height={45} legend={null}/>;
}