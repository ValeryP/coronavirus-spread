import React from 'react';
import {Line} from 'react-chartjs-2';

export default function Chart({labelsPlot, dataExistingPlot, dataPredictedPlot, country, color}: { labelsPlot: string[], dataExistingPlot: number[], dataPredictedPlot: number[], country: string, color: string }) {
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

    return <Line data={{
        labels: labelsPlot,
        datasets: [
            {...pastLineStyle, label: country, data: dataExistingPlot},
            {...predictionLineStyle, label: country + ' (predicted)', data: dataPredictedPlot}
        ]
    }} width={100} height={45} legend={null}/>;
}