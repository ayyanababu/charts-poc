import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const NivoStackedBarChart = () => {
  // Sample data for the stacked bar chart
  const data = [
    {
      month: 'Jan',
      'Product A': 400,
      'Product B': 300,
      'Product C': 200,
      'Product D': 150,
      'Product E': 120,
      'Product F': 90,
      'Product G': 70,
    },
    {
      month: 'Feb',
      'Product A': 350,
      'Product B': 320,
      'Product C': 240,
      'Product D': 170,
      'Product E': 140,
      'Product F': 110,
      'Product G': 80,
    },
    {
      month: 'Mar',
      'Product A': 420,
      'Product B': 280,
      'Product C': 220,
      'Product D': 180,
      'Product E': 130,
      'Product F': 100,
      'Product G': 90,
    },
    {
      month: 'Apr',
      'Product A': 380,
      'Product B': 340,
      'Product C': 260,
      'Product D': 160,
      'Product E': 150,
      'Product F': 120,
      'Product G': 85,
    },
    {
      month: 'May',
      'Product A': 450,
      'Product B': 310,
      'Product C': 230,
      'Product D': 190,
      'Product E': 160,
      'Product F': 105,
      'Product G': 75,
    },
  ];

  // Colors specified by the user
  const colors = [
    '#9bc5ef',
    '#50c1c2',
    '#fad176',
    '#407abc',
    '#93a3bc',
    '#f9804e',
    '#fed8cc'
  ];

  const keys = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G'];

  const containerStyle = {
    width: '100%',
    height: '470px',
    border: '1px solid black',
    padding: '16px'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center'
  };

  const chartContainerStyle = {
    height: '90%',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Product Sales by Month</h2>
      <div style={chartContainerStyle}>
        <ResponsiveBar
          data={data}
          keys={keys}
          indexBy="month"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={colors}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Sales ($)',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          tooltip={({ id, value, color }) => (
            <div style={{ 
              padding: 12, 
              background: 'white', 
              boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
              borderRadius: 4 
            }}>
              <div style={{ 
                width: 12, 
                height: 12, 
                background: color,
                display: 'inline-block',
                marginRight: 8
              }} />
              <strong>{id}: ${value}</strong>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default NivoStackedBarChart;