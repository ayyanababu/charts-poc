import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { MAX_POINTS } from '../ChartDemos';

const LineChart = () => {
  const chartRef = useRef(null);

  // Generate sample data for MAX_POINTS points
  const generateData = () => {
    return Array.from({ length: MAX_POINTS }, (_, i) => ({
      label: `Point ${i + 1}`,
      value: Math.random() * 100
    }));
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    const chartData = generateData();

    const config = {
      type: 'line',
      data: {
        labels: chartData.map(d => d.label),
        datasets: [{
          label: 'Sample Data',
          data: chartData.map(d => d.value),
          borderColor: '#4a90e2',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#4a90e2'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        normalized: true,
        plugins: {
          decimation: {
            enabled: true,
            algorithm: 'min-max',
            samples: 50
          },
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Data Points'
            },
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: 'Values'
            },
            beginAtZero: true
          }
        }
      }
    };

    const myChart = new Chart(ctx, config);

    return () => myChart.destroy();
  }, []);

  return (
    <div style={{ width: '32%', height: '500px', margin: '20px auto', border: '1px solid black' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;

