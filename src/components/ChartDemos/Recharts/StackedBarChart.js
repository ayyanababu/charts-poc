import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RechartsStackedBarChart = () => {
  // Sample data for the stacked bar chart
  const data = [
    { name: 'Jan', product1: 400, product2: 300, product3: 200, product4: 150, product5: 120, product6: 90, product7: 70 },
    { name: 'Feb', product1: 350, product2: 320, product3: 240, product4: 170, product5: 140, product6: 110, product7: 80 },
    { name: 'Mar', product1: 420, product2: 280, product3: 220, product4: 180, product5: 130, product6: 100, product7: 90 },
    { name: 'Apr', product1: 380, product2: 340, product3: 260, product4: 160, product5: 150, product6: 120, product7: 85 },
    { name: 'May', product1: 450, product2: 310, product3: 230, product4: 190, product5: 160, product6: 105, product7: 75 },
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

  const containerStyle = {
    width: '100%', 
    height: '370px',
    border: '1px solid black',
    padding: '16px'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Product Sales by Month</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="product1" stackId="a" fill={colors[0]} name="Product A" />
          <Bar dataKey="product2" stackId="a" fill={colors[1]} name="Product B" />
          <Bar dataKey="product3" stackId="a" fill={colors[2]} name="Product C" />
          <Bar dataKey="product4" stackId="a" fill={colors[3]} name="Product D" />
          <Bar dataKey="product5" stackId="a" fill={colors[4]} name="Product E" />
          <Bar dataKey="product6" stackId="a" fill={colors[5]} name="Product F" />
          <Bar dataKey="product7" stackId="a" fill={colors[6]} name="Product G" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsStackedBarChart;