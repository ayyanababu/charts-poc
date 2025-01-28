import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

const chartContainerStyle = {
  height: '500px',
  width: '100%',  
  marginBottom: '20px',
  border: "1px solid black"
};

export const NivoCombinationChart = () => {
  const data = [
    { month: 'Jan', sales: 4000, conversion: 3.2 },
    { month: 'Feb', sales: 3000, conversion: 4.1 },
    { month: 'Mar', sales: 2000, conversion: 3.8 },
    { month: 'Apr', sales: 1000, conversion: 3.2 },
    { month: 'May', sales: 500, conversion: 3.5 },
    { month: 'Jun', sales: 100, conversion: 3.3 },
    { month: 'Jul', sales: 200, conversion: 3.6 },
    { month: 'Aug', sales: 300, conversion: 3.8 },
    { month: 'Sep', sales: 400, conversion: 4.1 },
    { month: 'Oct', sales: 500, conversion: 4.5 },
    { month: 'Nov', sales: 600, conversion: 4.8 },
    { month: 'Dec', sales: 700, conversion: 5.2 },
  ];

  return (
    <div style={chartContainerStyle}>
      <ResponsiveBar
        data={data}
        keys={['sales']}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'set2' }}
        axisLeft={{
          legend: 'Sales (USD)',
          legendPosition: 'middle',
          legendOffset: -50,
        }}
        axisBottom={{
          legend: 'Months',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        tooltip={({ id, value }) => (
          <strong>
            {id}: {value}
          </strong>
        )}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'top-right',
            direction: 'column',
            translateX: 120,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            symbolSize: 20,
            effects: [{ on: 'hover', style: { itemOpacity: 1 } }],
          },
        ]}
      />
    </div>
  );
};

export const NivoDonutChart = () => {
  const data = [
    { id: 'A', value: 45 },
    { id: 'B', value: 30 },
    { id: 'C', value: 25 },
  ];

  return (
    <div style={chartContainerStyle}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.6}
        colors={{ scheme: 'nivo' }}
        radialLabelsSkipAngle={10}
        enableArcLinkLabels={false}
      />
    </div>
  );
};

export const NivoLargeDataChart = () => {
  const MAX_POINTS = 1000; // Replace MAX_POINTS with an actual value
  const data = Array.from({ length: MAX_POINTS }, (_, i) => ({
    x: i,
    y: Math.random() * 100,
  }));

  return (
    <div style={chartContainerStyle}>
      <ResponsiveLine
        data={[{ id: 'sensor', data }]}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: 'linear' }}
        yScale={{ type: 'linear', min: 0, max: 100 }}
        enablePoints={false}
        useMesh={true}
        axisLeft={{
          legend: 'Value',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        axisBottom={{
          legend: 'Data Points',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
      />
    </div>
  );
};
