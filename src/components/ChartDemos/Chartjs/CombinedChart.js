import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const data = {
  labels: Array.from({ length: 12 }, (_, i) => `Month ${i+1}`),
  sales: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
  conversion: [2.5, 2.8, 3.0, 3.2, 2.7, 2.6, 2.4, 2.5, 2.9, 3.1, 3.3, 3.5]
};

const ChartjsCombinationChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    const config = {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            type: 'bar',
            label: 'Sales Volume',
            data: data.sales,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            yAxisID: 'y',
            order: 2
          },
          {
            type: 'line',
            label: 'Conversion Rate',
            data: data.conversion,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            yAxisID: 'y1',
            order: 1,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: 'Sales Volume' },
            grid: { color: 'rgba(0,0,0,0.1)' }
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: { display: true, text: 'Conversion Rate (%)' },
            grid: { drawOnChartArea: false }
          }
        },
        plugins: {
          legend: { position: 'top' },
          tooltip: { enabled: true }
        }
      }
    };

    const chart = new Chart(ctx, config);
    return () => chart.destroy();
  }, [data]);

  return <canvas ref={chartRef} style={{ height: '500px', maxWidth: '32%', border: "1px solid black" }} />;
};

export default ChartjsCombinationChart;