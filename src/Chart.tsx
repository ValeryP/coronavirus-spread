import React from 'react';
import {Line} from 'react-chartjs-2';
import _ from "lodash";

const commonLineStyle = {
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 3,
    pointHitRadius: 10
};
const pastLineStyle = {...commonLineStyle, borderDash: []};
const predictionLineStyle = {...commonLineStyle, borderDash: [5, 5]};

export default function Chart({labels, data, country}: { labels: string[], data: number[], country: string }) {
    function buildPrediction() {
        const latestDaysNumber = 3
        const latestDaysCases = _.slice(data, data.length - latestDaysNumber - 1);
        const latestDaysDelta = latestDaysCases.map((v, i) => i === 0 ? 0 : v - latestDaysCases[i - 1])
        const mults = latestDaysDelta.map(((v, i) => 1 + v / latestDaysCases[i]))
        const multsLatestDays = _.slice(mults, mults.length - latestDaysNumber);
        const avgMult = (multsLatestDays.reduce((a, b) => a + b, 0) / multsLatestDays.length) || 0;
        // console.warn(latestDaysCases, latestDaysDelta, mults, avgMult);
        // const weights = _.reverse(_.reduce(_.range(1, latestDaysNumber), (acc, v, i) => {
        //     acc[i + 1] = acc[i] / 2
        //     return acc
        // }, [100 / 2] as number[]));
        // console.warn(weights);
        let prediction = _.reduce(_.range(1, latestDaysNumber + 1), (acc, v, i) => {
            acc[i] = _.reduce(_.range(0, v), (acc) => acc * avgMult, 1) * (_.last(latestDaysCases) || 0);
            return acc
        }, [] as number[]);
        // console.warn(prediction);
        return prediction
    }

    function buildNextDaysLabels(prediction: number[]) {
        return _.reduce(prediction, (acc, v, i) => {
            const latestDate = new Date(_.last(labels) || Date.now());
            latestDate.setDate(latestDate.getDate() + i + 1);
            acc[i] = latestDate.toISOString().slice(0, -14);
            // console.warn(acc[i]);
            return acc
        }, [] as string[]);
    }

    const buildData = () => {
        const prediction = buildPrediction()
        const predictionLabest = buildNextDaysLabels(prediction)
        return {
            labels: _.concat(labels, predictionLabest),
            datasets: [
                {
                    ...pastLineStyle,
                    label: country,
                    data: _.concat(data, prediction.map(() => NaN))
                },
                {
                    ...predictionLineStyle,
                    label: country + ' [predicted]',
                    data: _.concat(data.map((v, i) => i !== data.length - 1 ? NaN : v), prediction)
                }
            ]
        }
    }

    return (
        <div>
            <Line data={buildData()}/>
        </div>
    );
}