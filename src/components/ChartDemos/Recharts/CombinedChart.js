import React from 'react';
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = Array.from({ length: 12 }, (_, i) => ({
  month: `Month ${i + 1}`,
  sales: Math.floor(Math.random() * 10000),
  conversion: Math.random() * 10
}));

const RechartsCombinationChart = () => (
  <ResponsiveContainer width="100%" height={400} style={{ border: "1px solid black" }}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis yAxisId="left" orientation="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="sales" fill="#8884d8" name="Sales (USD)" />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="conversion"
        stroke="#82ca9d"
        name="Conversion Rate (%)"
        strokeWidth={2}
      />
    </BarChart>
  </ResponsiveContainer>
);

export default RechartsCombinationChart