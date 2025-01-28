import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientPinkBlue } from "@visx/gradient";
import { Tooltip, useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";

const VisxDonutChart = () => {
  const width = 500;
  const height = 500;
  const data = [
    { label: "Category A", value: 40 },
    { label: "Category B", value: 25 },
    { label: "Category C", value: 20 },
    { label: "Category D", value: 15 },
  ];

  const radius = Math.min(width, height) / 2 - 20;
  const innerRadius = radius - 70;
  const colors = ["#FFB3C6", "#FFDAC1", "#B5EAD7", "#C7CEEA"];

  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

  const handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipData: datum,
      tooltipOpen: true,
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
    });
  };

  return (
    <div style={{ border: "1px solid black", position: "relative" }}>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill="url(#gradient)" rx={14} />
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={data}
            pieValue={(d) => d.value}
            outerRadius={radius}
            innerRadius={innerRadius}
            padAngle={0.02}
          >
            {(pie) =>
              pie.arcs.map((arc, index) => {
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const { startAngle, endAngle } = arc;
                const midAngle = (startAngle + endAngle) / 2;
                const labelOffset = 40;
                const labelX = Math.cos(midAngle) * (radius + labelOffset);
                const labelY = Math.sin(midAngle) * (radius + labelOffset);

                return (
                  <g key={`arc-${index}`}>
                    <path
                      d={pie.path(arc) || undefined}
                      fill={colors[index % colors.length]}
                      stroke="#ffffff"
                      strokeWidth={2}
                      onMouseOver={(e) => handleMouseOver(e, arc.data)}
                      onMouseOut={hideTooltip}
                    />
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor={midAngle > Math.PI ? "end" : "start"}
                      dominantBaseline="middle"
                      fontSize={12}
                      fontWeight="bold"
                      fill="#4A4A4A"
                    >
                      {arc.data.label}
                    </text>
                  </g>
                );
              })
            }
          </Pie>
        </Group>
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            position: "absolute",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            fontSize: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <div>
            <strong>{tooltipData.label}</strong>
          </div>
          <div>Value: {tooltipData.value}</div>
        </TooltipWithBounds>
      )}
    </div>
  );
};

export default VisxDonutChart;
