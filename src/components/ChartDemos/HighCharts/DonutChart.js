import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const DonutChart = () => {
  const options = {
    chart: {
      type: 'pie',
      backgroundColor: '#f5f5f5'
    },
    title: {
      text: 'Market Share - 2023'
    },
    plotOptions: {
      pie: {
        innerSize: '60%', // This makes it a donut chart
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          distance: -30, // Bring labels inside the chart
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Market Share',
      data: [
        { name: 'North America', y: 42.5, color: '#4a90e2' },
        { name: 'Europe', y: 31.2, color: '#50e3c2' },
        { name: 'Asia-Pacific', y: 18.7, color: '#e84a5f' },
        { name: 'Latin America', y: 5.4, color: '#f8e71c' },
        { name: 'Middle East & Africa', y: 2.2, color: '#bd10e0' }
      ]
    }],
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          }
        }
      }]
    }
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { width: '100%', height: '500px', border: "1px solid black" } }}
    />
  );
};

export default DonutChart;