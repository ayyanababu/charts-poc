import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { generateMockData } from './BasicDataGenerator';
import { ToastContainer, toast } from 'react-toastify';
import './Chart.css'
import 'react-toastify/dist/ReactToastify.css';



const CustomHighchart = ({ title, xAxisCategories, yAxisConfig, seriesData }) => {
    const [loadingTime, setLoadingTime] = useState(0);


    const defaultColors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9'];

    const chartOptions = {
        chart: {
            zoomType: 'xy',
            animation: {
                duration: 1000,
            },
            events: {
                load: function () {
                   const renderTime = window.performance.now();
                   setLoadingTime(renderTime.toFixed(2));
                   console.log(`High Chart "${title}" loaded in ${renderTime.toFixed(2)}ms`);

                   toast.info(`High Chart "${title}" loaded in ${renderTime.toFixed(2)}ms`, {
                       autoClose: 3000,
                       position: 'top-right',
                   });
                },
            },
        },
        title: {
            text: title || 'Custom Chart',
        },
        xAxis: {
            categories: xAxisCategories || [],
            title: {
                text: 'X-Axis',
            },
        },
        yAxis: yAxisConfig || [
            {
                title: {
                    text: 'Y-Axis',
                },
            },
        ],
        tooltip: {
            shared: true,
            formatter: function () {
                return `
                    <strong>${this.x}</strong><br/>
                    ${this.points
                        .map(
                            (point) =>
                                `<span style="color:${point.color}">\u25CF</span> ${
                                    point.series.name
                                }: ${point.y.toFixed(2)}${point.series.tooltipSuffix || ''}<br/>`
                        )
                        .join('')}
                `;
            },
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
            },
            labelFormatter: function () {
                return `<span style="color:${this.color}">${this.name}</span>`;
            },
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 1500,
                },
                events: {
                    legendItemClick: function () {
                        if (this.visible) {
                            this.hide();
                        } else {
                            this.show();
                        }
                        return false; // Prevent default toggle
                    },
                },
            },
        },
        series: seriesData.map((series, index) => ({
            ...series,
            color: defaultColors[index % defaultColors.length],
        })),
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            <ToastContainer />
            {loadingTime > 0 && (
                <p className="performance-metrics">
                    Chart loaded in {loadingTime}ms
                </p>
            )}
        </div>
    );
};

const HighchartCombinationChart = () => {
    const { categories, seriesData } = generateMockData(1000000);
    return (
        <div className="chart-container">
            <CustomHighchart
                    title="Trading P&L Chart"
                    xAxisCategories={categories}
                    yAxisConfig={[
                        {
                            title: {
                                text: 'Trading Volume',
                            },
                            opposite: true,
                        },
                        {
                            title: {
                                text: 'Profit/Loss (%)',
                            },
                            labels: {
                                format: '{value}%',
                            },
                        },
                    ]}
                    seriesData={seriesData}
                />
        </div>
    );
};

export default HighchartCombinationChart;
