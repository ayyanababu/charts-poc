import React from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { LinePath } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Text } from "@visx/text";
import { curveNatural } from "@visx/curve"

const chartColors = [
  '#9bc5ef',
  '#50c1c2',
  '#fad176',
  '#407abc',
  '#93a3bc',
  '#f9804e',
  '#fed8cc',
];

const data = Array.from({ length: 12 }, (_, i) => {
    const val = Math.floor(Math.random() * 100) + 20
  return ({
  label: new Date(0, i).toLocaleString('default', { month: 'short' }),
  bar: val,
  line: val + 10,
})});

const width = 500;
const height = 500;
const margin = { top: 60, right: 70, bottom: 60, left: 60 }; // Increased top margin to accommodate legends

const xScale = scaleBand({
  domain: data.map((d) => d.label),
  range: [margin.left, width - margin.right],
  padding: 0.3,
});

const yScaleBar = scaleLinear({
  domain: [0, Math.max(...data.map((d) => d.bar))],
  range: [height - margin.bottom, margin.top],
});

const yScaleLine = scaleLinear({
  domain: [0, Math.max(...data.map((d) => d.line))],
  range: [height - margin.bottom, margin.top],
});

const VisxCombinedChart = () => {
  // Define the legends
  const legends = [
    { label: 'Revenue', color: chartColors[0], type: 'bar' },
    { label: 'Conversion Rate', color: chartColors[1], type: 'line' },
  ];

  return (
    <svg width={width} height={height} style={{ 
      border: "1px solid black",
      overflow: "auto",
     }}>
      <Group>
        {/* Chart title */}
        <Text
          x={width / 2}
          y={20}
          textAnchor="middle"
          fontSize={16}
          fontWeight="bold"
          fill="#111827"
        >
          Combined Bar and Line Chart
        </Text>

        {/* Legends at top of chart */}
        <Group>
          {legends.map((legend, i) => (
            <Group 
              key={`legend-${i}`} 
              top={30} 
              left={width / 2 - 100 + i * 150}
            >
              {legend.type === 'bar' ? (
                <rect 
                  width={12} 
                  height={12} 
                  fill={legend.color}
                  rx={2}
                />
              ) : (
                <circle 
                  r={6} 
                  fill={legend.color}
                  cx={6}
                  cy={6}
                />
              )}
              <Text
                x={20}
                y={10}
                fontSize={12}
                textAnchor="start"
                fill="#6b7280"
              >
                {legend.label}
              </Text>
            </Group>
          ))}
        </Group>

        {data.map((d) => {
          const barX = xScale(d.label);
          const barHeight = height - margin.bottom - yScaleBar(d.bar);
          return (
            <Bar
              key={`bar-${d.label}`}
              x={barX}
              y={yScaleBar(d.bar)}
              height={barHeight}
              width={xScale.bandwidth()}
              fill={chartColors[0]}
              rx={4}
            />
          );
        })}

        <LinePath
          data={data}
          x={(d) => xScale(d.label) + xScale.bandwidth() / 2}
          y={(d) => yScaleLine(d.line)}
          stroke={chartColors[1]}
          strokeWidth={3}
          curve={curveNatural}
        />

        {data.map((d) => (
          <circle
            key={`circle-${d.label}`}
            cx={xScale(d.label) + xScale.bandwidth() / 2}
            cy={yScaleLine(d.line)}
            r={5}
            fill={chartColors[1]}
            stroke="#ffffff"
            strokeWidth={2}
          />
        ))}

        <AxisBottom
          top={height - margin.bottom}
          scale={xScale}
          tickFormat={(value) => value}
          stroke="#d1d5db"
          tickStroke="#d1d5db"
          tickLabelProps={() => ({
            fill: "#6b7280",
            fontSize: 12,
            textAnchor: "middle",
          })}
        />

        <AxisLeft
          left={margin.left}
          scale={yScaleBar}
          stroke="#d1d5db"
          tickStroke="#d1d5db"
          tickLabelProps={() => ({
            fill: "#6b7280",
            fontSize: 12,
            textAnchor: "end",
            dy: "0.33em",
          })}
        />
      </Group>
    </svg>
  );
};

export default VisxCombinedChart;

