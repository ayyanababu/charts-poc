import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  values: [60, 30, 10],
  total: 100
}

const ChartjsDonutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    const config = {
      type: 'doughnut',
      plugins: [ChartDataLabels],
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: [
            '#4dc9f6', '#f67019', '#f53794',
            '#537bc4', '#acc236', '#166a8f'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          datalabels: {
            color: '#fff',
            font: { weight: 'bold', size: 14 },
            formatter: (value) => `${(value/data.total*100).toFixed(1)}%`
          },
          legend: {
            position: 'right',
            labels: { padding: 20 }
          }
        }
      }
    };

    const chart = new Chart(ctx, config);
    return () => chart.destroy();
  }, [data]);

  return <canvas ref={chartRef} style={{ height: '500px', maxWidth: '32%', border: "1px solid black" }} />;
};

export default ChartjsDonutChart