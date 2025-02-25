import React, { useMemo } from "react";
import { LinePath } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { TooltipWithBounds, useTooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { bisector } from "d3-array";
import { MAX_POINTS } from "../ChartDemos";

const chartColors = [
  '#9bc5ef',
  '#50c1c2',
  '#fad176',
  '#407abc',
  '#93a3bc',
  '#f9804e',
  '#fed8cc',
];

const generateData = (length) => {
  const data = [];
  for (let i = 0; i < length; i++) {
    data.push({
      date: new Date(2025, 0, 1 + i),
      value: Math.floor(Math.random() * 100) + 1,
    });
  }
  return data;
};

// Accessors
const getDate = (d) => d.date;
const getValue = (d) => d.value;
const bisectDate = bisector((d) => d.date).left;

const VisxLargeDataChart = ({ width = 500, height = 500 }) => {
  const data = useMemo(()=>generateData(MAX_POINTS), []);
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const xScale = scaleTime({
    domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
    range: [0, innerWidth],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(getValue))],
    range: [innerHeight, 0],
  });

  // Tooltip state
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
  } = useTooltip();

  const handleMouseMove = (event) => {
    const { x } = localPoint(event) || { x: 0 };
    const x0 = xScale.invert(x - margin.left);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    const d = d1 && x0 - getDate(d0) > getDate(d1) - x0 ? d1 : d0;

    showTooltip({
      tooltipData: d,
      tooltipLeft: x - margin.left,
      tooltipTop: yScale(getValue(d)),
      tooltipOpen: true,
    });
  };

  const handleMouseLeave = () => {
    hideTooltip();
  };

  return (
    <div style={{ border: "1px solid black", position: "relative" }}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Axes */}
          <AxisBottom
            scale={xScale}
            top={innerHeight}
            numTicks={5}
            tickFormat={(date) =>
              date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
            }
          />
          <AxisLeft scale={yScale} />

          {/* Line Path */}
          <LinePath
            data={data}
            x={(d) => xScale(getDate(d))}
            y={(d) => yScale(getValue(d))}
            stroke={chartColors[0]} // Updated: use the first provided color
            strokeWidth={2}
            curve={null}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </g>
      </svg>

      {/* Tooltip */}
      {tooltipOpen && tooltipData && (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft}>
          <div>
            <strong>Date:</strong>{" "}
            {getDate(tooltipData).toLocaleDateString("en-US")}
          </div>
          <div>
            <strong>Value:</strong> {getValue(tooltipData)}
          </div>
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default VisxLargeDataChart;

