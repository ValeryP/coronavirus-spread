import React from 'react';
import {Line} from 'react-chartjs-2';

export default function PredictionChart({labelsPlot, dataExistingPlot, dataPredictedPlot, country, color}: { labelsPlot: string[], dataExistingPlot: number[], dataPredictedPlot: number[], country: string, color: string }) {
    const pageWidth = document.body.getBoundingClientRect().width;
    const pageHeight = document.body.getBoundingClientRect().height;
    console.info(pageWidth, pageHeight)
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
    const css = `
        .chartWrapper {
          position: relative;
        }
        .chartWrapper > canvas {
          position: absolute;
          left: 0;
          top: 0;
          pointer-events: none;
        }
        .chartAreaWrapper {
          width: ${pageWidth - 120}px;
          overflow-x: scroll;
        }
        .chartAreaWrapper2 {
          width: ${pageWidth * 2}px!important;
        }
        `
    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-1',
                    gridLines: {
                        display: false
                    },
                    labels: {
                        show: true
                    }
                }
            ]
        }
    };
    // noinspection JSUnusedGlobalSymbols
    const plugins = [{
        afterDraw: () => {
            scrollDiv?.scrollTo(pageWidth * 2, 0)
        }
    }];
    let scrollDiv: HTMLDivElement | null;
    return <div>
        <style>
            {css}
        </style>
        <div className="chartWrapper">
            <div className="chartAreaWrapper" ref={(el) => {
                scrollDiv = el;
            }}>
                <div className="chartAreaWrapper2">
                    <Line data={{
                        labels: labelsPlot,
                        datasets: [
                            {...pastLineStyle, label: country, data: dataExistingPlot},
                            {
                                ...predictionLineStyle,
                                label: country + ' (predicted)',
                                data: dataPredictedPlot
                            }
                        ]
                    }} legend={null} height={pageWidth / 2.88} plugins={plugins} options={options}/>
                </div>
            </div>
        </div>
    </div>;
}