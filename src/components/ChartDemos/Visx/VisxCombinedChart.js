import React from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { LinePath } from "@visx/shape";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Text } from "@visx/text";
import { curveNatural } from "@visx/curve"

const data = Array.from({ length: 12 }, (_, i) => {
    const val = Math.floor(Math.random() * 100) + 20
  return ({
  label: new Date(0, i).toLocaleString('default', { month: 'short' }),
  bar: val,
  line: val + 10,
})});

const width = 500;
const height = 500;
const margin = { top: 40, right: 70, bottom: 60, left: 60 };

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
  return (
    <svg width={width} height={height} style={{ 
      border: "1px solid black",
      overflow: "auto",
     }}>
      <Group>
        {data.map((d) => {
          const barX = xScale(d.label);
          const barHeight = height - margin.bottom - yScaleBar(d.bar);
          return (
            <Bar
              key={`bar-${d.label}`}
              x={barX}XX
              y={yScaleBar(d.bar)}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#4db6fc"
              rx={4}
            />
          );
        })}

        <LinePath
          data={data}
          x={(d) => xScale(d.label) + xScale.bandwidth() / 2}
          y={(d) => yScaleLine(d.line)}
          stroke="#fd869f"
          strokeWidth={3}
          curve={curveNatural}
        />

        {data.map((d) => (
          <circle
            key={`circle-${d.label}`}
            cx={xScale(d.label) + xScale.bandwidth() / 2}
            cy={yScaleLine(d.line)}
            r={5}
            fill="#fd869f"
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

        <Text
          x={width / 2}
          y={margin.top / 2}
          textAnchor="middle"
          fontSize={16}
          fontWeight="bold"
          fill="#111827"
        >
          Combined Bar and Line Chart
        </Text>
      </Group>
    </svg>
  );
};

export default VisxCombinedChart;

