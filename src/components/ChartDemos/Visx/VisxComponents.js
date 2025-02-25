import { BarGroup, LinePath } from '@visx/shape'
import { scaleLinear, scaleBand } from '@visx/scale'
import { Pie } from '@visx/shape'
import { MAX_POINTS } from '../ChartDemos'

// export const VisxCombinationChart = () => {
//   const data = [
//     { month: 'Jan', sales: 4000, conversion: 3.2 },
//     { month: 'Feb', sales: 3000, conversion: 4.1 },
//     { month: 'Mar', sales: 2000, conversion: 3.8 },
//     { month: 'Apr', sales: 1000, conversion: 3.2 },
//     { month: 'May', sales: 500, conversion: 3.5 },
//     { month: 'Jun', sales: 100, conversion: 3.3 },
//     { month: 'Jul', sales: 200, conversion: 3.6 },
//     { month: 'Aug', sales: 300, conversion: 3.8 },
//     { month: 'Sep', sales: 400, conversion: 4.1 },
//     { month: 'Oct', sales: 500, conversion: 4.5 },
//     { month: 'Nov', sales: 600, conversion: 4.8 },
//     { month: 'Dec', sales: 700, conversion: 5.2 }
//   ]
//   const width = 800;
//   const height = 400;
//   const margin = { top: 20, right: 30, bottom: 40, left: 40 };

//   // Fix 1: Proper scale configuration
//   const xScale = scaleBand({
//     domain: data.map(d => d.month),
//     range: [margin.left, width - margin.right],
//     padding: 0.2,
//   });

//   const y1Scale = scaleLinear({
//     domain: [0, Math.max(...data.map(d => d.sales)) + 1000],
//     range: [height - margin.bottom, margin.top],
//   });

//   const y2Scale = scaleLinear({
//     domain: [0, 5],
//     range: [height - margin.bottom, margin.top],
//   });

//   // Fix 2: Add missing accessor functions
//   return (
//     <svg width={width} height={height}>
//       <BarGroup
//         data={data}
//         keys={['sales']}
//         height={height - margin.top - margin.bottom}
//         x0={d => d.month}
//         x0Scale={xScale}
//         x1Scale={xScale}
//         yScale={y1Scale}
//         color={() => '#4a90e2'}
//       >
//         {barGroups => barGroups.map(barGroup => (
//           <g
//             key={`bar-group-${barGroup.index}`}
//             transform={`translate(${barGroup.x0},0)`}
//           >
//             {barGroup.bars.map(bar => (
//               <rect
//                 key={`bar-${barGroup.index}-${bar.index}`}
//                 x={bar.x}
//                 y={bar.y}
//                 width={bar.width}
//                 height={bar.height}
//                 fill={bar.color}
//               />
//             ))}
//           </g>
//         ))}
//       </BarGroup>
//     </svg>
//   );
// }

// Large Dataset Chart
// export const VisxLargeDataChart = () => {
//   const data = Array.from({ length: MAX_POINTS }, (_, i) => ({
//     x: i,
//     y: Math.random() * 100
//   }))

//   const width = 800
//   const height = 400
//   const margin = 40

//   const xScale = scaleLinear({
//     domain: [0, 50000],
//     range: [margin, width - margin]
//   })

//   const yScale = scaleLinear({
//     domain: [0, 100],
//     range: [height - margin, margin]
//   })

//   return (
//     <svg width={width} height={height}>
//       <LinePath
//         data={data}
//         x={d => xScale(d.x)}
//         y={d => yScale(d.y)}
//         stroke="#4a90e2"
//         strokeWidth={0.5}
//       />
//     </svg>
//   )
// }