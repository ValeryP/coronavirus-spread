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

// @ts-ignore
export default function Chart({labels, data, country}) {
    const dataPerCountry = data.map((row: { [x: string]: any; }) => row[country]) as string[]
    const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function dateFormat(d: string) {
        const t = new Date(d);
        return t.getDate() + ' ' + monthShortNames[t.getMonth()] + ', ' + t.getFullYear();
    }

    function normailizeLatestDaysNumber(latestDaysNumber: number) {
        let latestDaysCases = _.slice(dataPerCountry, dataPerCountry.length - latestDaysNumber - 1);
        const latestDaysCasesNonZero = latestDaysCases.filter(x => x !== "").length
        let finalNumber = latestDaysCasesNonZero < latestDaysNumber ? latestDaysCasesNonZero - 1 : latestDaysNumber;
        console.log(latestDaysCases, latestDaysCasesNonZero, finalNumber)
        return finalNumber;
    }

    const toNumber = (x: string) => {
        return x === "" ? 0 : Number(x);
    }

    const toString = (x: number) => {
        return String(x);
    }

    function buildPrediction() {
        const latestDaysNumber = normailizeLatestDaysNumber(10)
        const latestDaysCases = _.slice(dataPerCountry, dataPerCountry.length - latestDaysNumber - 1).map(toNumber);
        const latestDaysDelta = latestDaysCases.map((v, i) => i === 0 ? 0 : v - latestDaysCases[i - 1])
        const mults = latestDaysDelta.map(((v, i) => 1 + v / latestDaysCases[i]))
        const multsLatestDays = _.slice(mults, mults.length - latestDaysNumber);
        const avgMult = (multsLatestDays.reduce((a, b) => a + b, 0) / multsLatestDays.length) || 0;
        return _.reduce(_.range(1, latestDaysNumber + 1), (acc, v, i) => {
            acc[i] = Math.round(_.reduce(_.range(0, v), (acc) => acc * avgMult, 1) * (_.last(latestDaysCases) || 0));
            return acc
        }, [] as number[])
    }

    function buildNextDaysLabels(prediction: number[]) {
        return _.reduce(prediction, (acc, v, i) => {
            const latestDate = new Date(_.last(labels) || Date.now());
            latestDate.setDate(latestDate.getDate() + i + 1);
            acc[i] = latestDate.toISOString().slice(0, -14);
            return acc
        }, [] as string[]);
    }

    const buildData = () => {
        const prediction = buildPrediction()
        const predictionLabest = buildNextDaysLabels(prediction)
        const existingData = _.concat(dataPerCountry.map(toNumber), prediction.map(() => NaN));
        const predictedData = _.concat(dataPerCountry.map((v, i) => i !== dataPerCountry.length - 1 ? NaN : v), prediction);
        const labelsNormalized = _.concat(labels, predictionLabest).map(dateFormat);
        let indexOfFirstPacient = _.findIndex(existingData, (x) => x > 0) - 1
        indexOfFirstPacient = indexOfFirstPacient < 0 ? 0 : indexOfFirstPacient
        return {
            labels: labelsNormalized.slice(indexOfFirstPacient),
            datasets: [
                {
                    ...pastLineStyle,
                    label: country,
                    data: existingData.slice(indexOfFirstPacient)
                },
                {
                    ...predictionLineStyle,
                    label: country + ' (predicted)',
                    data: predictedData.slice(indexOfFirstPacient)
                }
            ]
        }
    }

    return (
        <div>
            <Line data={buildData()} width={100} height={45} legend={null}/>
        </div>
    );
}