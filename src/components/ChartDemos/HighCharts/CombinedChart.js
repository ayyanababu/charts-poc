import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

const CombinationChart = () => {
  const chartRef = useRef(null);
  
  // Define the color palette
  const colors = [
    '#9bc5ef',
    '#50c1c2',
    '#fad176',
    '#407abc',
    '#93a3bc',
    '#f9804e',
    '#fed8cc',
  ];
  
  useEffect(() => {
    // Create the chart when component mounts
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          zoomType: 'xy',
          backgroundColor: '#f8f9fa',
          borderRadius: 8
        },
        title: {
          text: 'Sales Performance & Conversion Rate',
          style: { fontWeight: 'bold', color: '#333' }
        },
        subtitle: {
          text: 'Monthly comparison of revenue vs. conversion',
          style: { color: '#666' }
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          crosshair: true
        },
        yAxis: [{ 
          // Primary y-axis
          labels: {
            format: '${value}k',
            style: { color: colors[0] }
          },
          title: {
            text: 'Revenue',
            style: { color: colors[0] }
          }
        }, { 
          // Secondary y-axis
          title: {
            text: 'Conversion Rate',
            style: { color: colors[3] }
          },
          labels: {
            format: '{value}%',
            style: { color: colors[3] }
          },
          opposite: true
        }],
        tooltip: {
          shared: true
        },
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          backgroundColor: '#FFFFFF',
          shadow: true
        },
        series: [{
          name: 'Revenue',
          type: 'column',
          yAxis: 0,
          data: [15, 22, 18, 24, 21, 30, 28, 35, 32, 40, 38, 45],
          color: colors[0],
          tooltip: {
            valuePrefix: '$',
            valueSuffix: 'k'
          }
        }, {
          name: 'Conversion Rate',
          type: 'spline',
          yAxis: 1,
          data: [3.5, 4.2, 3.8, 4.5, 4.1, 5.0, 4.8, 5.5, 5.3, 6.0, 5.8, 6.5],
          color: colors[3],
          tooltip: {
            valueSuffix: '%'
          },
          marker: {
            lineWidth: 2,
            lineColor: colors[3],
            fillColor: 'white'
          }
        }],
        credits: {
          enabled: false
        }
      });
    }
    
    // Cleanup function
    return () => {
      if (chartRef.current) {
        // Check if chart instance exists and destroy it to prevent memory leaks
        const chart = Highcharts.charts.find(chart => chart && chart.renderTo === chartRef.current);
        if (chart) {
          chart.destroy();
        }
      }
    };
  }, []);

  return (
    <div 
      ref={chartRef} 
      style={{ 
        width: '100%', 
        height: '500px', 
        border: "1px solid #ddd", 
        borderRadius: "10px", 
        overflow: "hidden" 
      }} 
    />
  );
};

export default CombinationChart;