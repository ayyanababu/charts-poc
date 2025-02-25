import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  { name: 'Category A', value: 45 },
  { name: 'Category B', value: 30 },
  { name: 'Category C', value: 25 }
];

const RechartsDonutChart = () => {
  const COLORS = [
    '#9bc5ef',
    '#50c1c2',
    '#fad176',
    '#407abc',
    '#93a3bc',
    '#f9804e',
    '#fed8cc',];

  return (
    <ResponsiveContainer width="100%" height={400} style={{ border: "1px solid black" }}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RechartsDonutChart