import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientPinkBlue } from "@visx/gradient";
import { Tooltip, useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { Text } from "@visx/text";

const VisxDonutChart = () => {
  const width = 500;
  const height = 500;
  const margin = { top: 60, right: 20, bottom: 20, left: 20 };
  const data = [
    { label: "Category A", value: 40 },
    { label: "Category B", value: 25 },
    { label: "Category C", value: 20 },
    { label: "Category D", value: 15 },
  ];

  // Decrease the radius to make the donut smaller
  const radius = Math.min(width, height) / 2.5;
  const innerRadius = radius - 50;
  const colors = [
    '#9bc5ef',
    '#50c1c2',
    '#fad176',
    '#407abc',
    '#93a3bc',
    '#f9804e',
    '#fed8cc',];

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
        
        {/* Chart title */}
        <Text
          x={width / 2}
          y={20}
          textAnchor="middle"
          fontSize={16}
          fontWeight="bold"
          fill="#111827"
        >
          Distribution by Category
        </Text>
        
        {/* Legends at top of chart */}
        <Group>
          {data.map((item, i) => (
            <Group 
              key={`legend-${i}`} 
              top={40} 
              left={(width / (data.length + 1)) * (i + 1) - 40}
            >
              <rect 
                width={12} 
                height={12} 
                fill={colors[i % colors.length]}
                rx={2}
              />
              <Text
                x={20}
                y={10}
                fontSize={12}
                textAnchor="start"
                fill="#6b7280"
              >
                {item.label}
              </Text>
            </Group>
          ))}
        </Group>
        
        {/* Move the Group positioning to create more space at the top */}
        <Group top={height / 2 + 20} left={width / 2}>
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
