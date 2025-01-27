import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MAX_POINTS } from '../ChartDemos';
// import Boost from 'highcharts/modules/boost';
// import Exporting from 'highcharts/modules/exporting';
// import Accessibility from 'highcharts/modules/accessibility';

// // Initialize modules
// Boost(Highcharts);
// Exporting(Highcharts);
// Accessibility(Highcharts);

const LargeDataChart = () => {
  // Generate sample large dataset (MAX_POINTS points)
  const generateData = () => {
    const data = [];
    let value = 0;
    for (let i = 0; i < MAX_POINTS; i++) {
      value += Math.random() - 0.5;
      data.push([i, value]);
    }
    return data;
  };

  const options = useMemo(() => ({
    chart: {
      zoomType: 'x',
      panning: true,
      panKey: 'shift',
      backgroundColor: '#f5f5f5'
    },
    boost: {
      enabled: true,
      useGPUTranslations: true,
      usePreallocated: true
    },
    title: {
      text: 'Large Dataset Performance Demo'
    },
    xAxis: {
      type: 'linear',
      minRange: 100
    },
    yAxis: {
      title: {
        text: 'Value'
      }
    },
    plotOptions: {
      series: {
        animation: false,
        turboThreshold: 0,
        lineWidth: 1,
        marker: {
          enabled: false
        }
      }
    },
    series: [{
      name: 'Random Walk',
      data: generateData(),
      type: 'line'
    }],
    tooltip: {
      valueDecimals: 2,
      followPointer: true,
      shared: true
    },
    exporting: {
      enabled: true
    }
  }), []);

  return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ 
          style: { 
            width: '100%', 
            height: '500px',
            minWidth: '300px',
            border: "1px solid black"
          } 
        }}
      />
  );
};

export default LargeDataChart;