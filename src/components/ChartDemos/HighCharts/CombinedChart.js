import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CombinationChart = () => {
  const options = {
    chart: {
      type: 'column',
      backgroundColor: '#f5f5f5'
    },
    title: {
      text: 'Monthly Sales Report - 2023'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: [{
      title: {
        text: 'Sales Amount (USD)',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      labels: {
        format: '${value}',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      }
    }, {
      title: {
        text: 'Conversion Rate (%)',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      labels: {
        format: '{value}%',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      opposite: true
    }],
    series: [{
      name: 'Sales Amount',
      type: 'column',
      yAxis: 0,
      data: [15000, 22000, 18000, 24000, 21000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
      color: '#4a90e2',
      tooltip: {
        valuePrefix: '$'
      }
    }, {
      name: 'Conversion Rate',
      type: 'spline',
      yAxis: 1,
      data: [3.5, 4.2, 3.8, 4.5, 4.1, 5.0, 4.8, 5.5, 5.3, 6.0, 5.8, 6.5],
      color: '#e84a5f',
      marker: {
        enabled: true,
        radius: 4
      },
      tooltip: {
        valueSuffix: '%'
      }
    }],
    tooltip: {
      shared: true,
      crosshairs: true
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };

  return (    
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { width: '100%', height: '500px', border: "1px solid black" }  }}
    />
  );
};

export default CombinationChart;