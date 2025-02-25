import React from 'react';
import { BarStack } from '@visx/shape';
import { Group } from '@visx/group';
import { Grid } from '@visx/grid';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

const data = [
  { month: 'Jan', productA: 400, productB: 300, productC: 200, productD: 150, productE: 120, productF: 90, productG: 70 },
  { month: 'Feb', productA: 350, productB: 320, productC: 240, productD: 170, productE: 140, productF: 110, productG: 80 },
  { month: 'Mar', productA: 420, productB: 280, productC: 220, productD: 180, productE: 130, productF: 100, productG: 90 },
  { month: 'Apr', productA: 380, productB: 340, productC: 260, productD: 160, productE: 150, productF: 120, productG: 85 },
  { month: 'May', productA: 450, productB: 310, productC: 230, productD: 190, productE: 160, productF: 105, productG: 75 },
];

const keys = ['productA', 'productB', 'productC', 'productD', 'productE', 'productF', 'productG'];
const colors = ['#9bc5ef', '#50c1c2', '#fad176', '#407abc', '#93a3bc', '#f9804e', '#fed8cc'];
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'white',
};

const VisxStackedBarChart = () => {
  const containerStyle = {
    width: '30%',
    height: '470px',
    border: '1px solid black',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };
  
  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center'
  };
  
  const legendContainerStyle = {
    marginTop: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };
  
  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '0 8px 8px 0'
  };
  
  const legendColorStyle = {
    width: '16px',
    height: '16px',
    marginRight: '4px',
    borderRadius: '2px'
  };
  
  const legendTextStyle = {
    fontSize: '14px'
  };

  // Chart dimensions
  const width = 600;
  const height = 400;
  const margin = { top: 40, right: 30, bottom: 50, left: 50 };
  const [hoveredBar, setHoveredBar] = React.useState(null);

  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip();

  // Bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Calculate the maximum y value for proper scaling
  const getMaxValue = () => {
    let max = 0;
    data.forEach(d => {
      let sum = 0;
      keys.forEach(key => {
        sum += d[key];
      });
      max = Math.max(max, sum);
    });
    return max;
  };

  // Scales
  const xScale = scaleBand({
    domain: data.map(d => d.month),
    padding: 0.2,
    range: [0, xMax],
  });

  const yScale = scaleLinear({
    domain: [0, getMaxValue()],
    range: [yMax, 0],
    nice: true,
  });

  const colorScale = scaleOrdinal({
    domain: keys,
    range: colors,
  });

  const handleMouseOver = (event, datum, key) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    const newData = {
      key,
      value: datum[key],
      month: datum.month,
      color: colorScale(key),
    };
    showTooltip({
      tooltipData: newData,
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
    });
    setHoveredBar({ key, month: datum.month });
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Product Sales by Month</h2>
      <svg width="100%" height="80%" viewBox={`0 0 ${width} ${height}`}>
        <Group left={margin.left} top={margin.top}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            stroke="rgba(0,0,0,0.1)"
            strokeDasharray="4,4"
          />
          <BarStack
            data={data}
            keys={keys}
            x={d => d.month}
            xScale={xScale}
            yScale={yScale}
            color={colorScale}
          >
            {barStacks =>
              barStacks.map(barStack =>
                barStack.bars.map(bar => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    onMouseLeave={() => {
                      hideTooltip();
                      setHoveredBar(null);
                    }}
                    onMouseOver={e => handleMouseOver(e, bar.data, barStack.key)}
                    style={{
                      stroke: hoveredBar?.key === barStack.key && hoveredBar?.month === bar.data.month ? 'black' : undefined,
                      strokeWidth: 1,
                      cursor: 'pointer',
                    }}
                  />
                ))
              )
            }
          </BarStack>
          <AxisLeft 
            scale={yScale} 
            tickFormat={d => `$${d}`}
            stroke="#333"
            tickStroke="#333"
            label="Sales ($)"
            labelOffset={30}
          />
          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="#333"
            tickStroke="#333"
            label="Month"
            labelOffset={20}
          />
        </Group>
      </svg>
      
      <div style={legendContainerStyle}>
        {keys.map((key, i) => (
          <div key={key} style={legendItemStyle}>
            <div
              style={{...legendColorStyle, backgroundColor: colors[i]}}
            />
            <span style={legendTextStyle}>{key.replace('product', 'Product ')}</span>
          </div>
        ))}
      </div>
      
      {tooltipData && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div style={{padding: '4px'}}>
            <strong>{tooltipData.month}</strong>
            <div>
              {tooltipData.key.replace('product', 'Product ')}: ${tooltipData.value}
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default VisxStackedBarChart;