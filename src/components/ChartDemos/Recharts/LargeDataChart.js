import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MAX_POINTS } from '../ChartDemos';

const RechartLargeDatasetChart = () => {  
  const data = Array.from({ length: MAX_POINTS }, (_, i) => ({
    timestamp: i,
    value: Math.random() * 100
  }));

  // Memoize sampled data for better performance
  const sampledData = useMemo(() => {
    const sampleInterval = Math.ceil(data.length / 1000); // Reduce to 1000 points
    return data.filter((_, index) => index % sampleInterval === 0);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400} style={{ border: "1px solid black" }}>
      <LineChart data={sampledData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          dot={false}
          strokeWidth={1}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RechartLargeDatasetChart