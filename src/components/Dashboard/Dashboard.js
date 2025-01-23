import React, { useState, useRef, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import "./Dashboard.css"; // Optional styles for the grid
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Import the required Highcharts modules
// import HighchartsMore from 'highcharts/highcharts-more';
// import HighchartsGrid from 'highcharts/modules/grid';

// Initialize the modules
// HighchartsMore(Highcharts);
// HighchartsGrid(Highcharts);

// const Dashboard = () => {
//   // Initial grid items with unique IDs
//   const [items, setItems] = useState(
//     Array.from({ length: 9 }, (_, i) => ({
//       id: i + 1,
//       name: (i + 1).toString(),
//     }))
//   );

//   return (
//     <div className="sortable-grid-container">
//       <ReactSortable
//         list={items}
//         setList={setItems}
//         className="sortable-grid"
//         animation={150} // Smooth animation
//         ghostClass="ghost" // Style for the dragged item
//       >
//         {items.map((item) => (
//           <div key={item.id} className="sortable-item">
//             {item.name}
//           </div>
//         ))}
//       </ReactSortable>
//     </div>
//   );
// };

// export default Dashboard;

const Dashboard = () => {
    const containerRefs = useRef([]); // Reference to each card container

  const [items, setItems] = useState([
    { id: 1, name: "Line Chart", type: "line" },
    { id: 2, name: "Column Chart", type: "column" },
    { id: 3, name: "Pie Chart", type: "pie" },
    { id: 4, name: "Bar Chart", type: "bar" },
    { id: 5, name: "Area Chart", type: "area" },
    { id: 6, name: "Scatter Chart", type: "scatter" },
    { id: 7, name: "Donut Chart", type: "donut" },
    { id: 8, name: "Combination Chart", type: "combination" },
    { id: 9, name: "Stacked Bar Chart", type: "stackedBar" },
  ]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        containerRefs.current.forEach((ref) => {
          if (ref && ref.chart) {
            ref.chart.reflow(); // Trigger Highcharts to recalculate sizes
          }
        });
      }, 500);
    };

    window.addEventListener("resize", handleResize); // Listen for window resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

//   useEffect(() => {
//     // Trigger reflow for all charts whenever items change
//     containerRefs.current = containerRefs.current.slice(0, items.length);

//     setTimeout(() => {
//         containerRefs.current.forEach((ref, index) => {
//           const parent = ref?.container?.current;

//           if (parent) {
//             console.log(
//               `Parent ${index}: Width=${parent.clientWidth}, Height=${parent.clientHeight}`
//             );
//           }

//           if (ref && ref?.chart && ref?.container && ref?.container?.current) {
//             console.log(
//               `Chart ${index}: Width=${ref?.container?.current}, Height=${ref?.container?.current}`
//             );
//             ref.chart.reflow();
//           }
//         });
//       }, 100);

//     // containerRefs.current.forEach((ref, index) => {
//     //   if (ref && ref.chart) {
//     //     console.log(
//     //         `Chart ${index}: Width=${ref.container.clientWidth}, Height=${ref.container.clientHeight}`
//     //       );
//     //     ref.chart.reflow();
//     //   }
//     // });
//   }, [items]);

//   useEffect(() => {
//     containerRefs.current.forEach((ref, index) => {
//         console.log(`onmount empty: ${ref} -> ${ref?.chart}`);
//       if (ref && ref.chart) {
//         ref.chart.reflow();
//       }
//     });
//   }, []);

useEffect(() => {
    // Trigger reflow for all charts after the component mounts
    setTimeout(() => {
      containerRefs.current.forEach((ref, index) => {
        if (ref && ref.chart) {
          console.log(`Initial reflow for chart ${index}`);
          ref.chart.reflow();
        }
      });
    }, 500); // Small delay to ensure DOM is fully rendered
  }, []);

  const getChartOptions = (type, title) => {
    switch (type) {
      case "donut":
        return {
          chart: { type: "pie",  reflow: true },
          title: { text: title, style: { fontSize: '10px'} },
          plotOptions: {
            pie: {
              innerSize: "50%", // Makes it a donut chart
            },
          },
          series: [
            {
              data: [
                { name: "A", y: 30 },
                { name: "B", y: 40 },
                { name: "C", y: 20 },
              ],
            },
          ],
        };
      case "combination":
        return {
          chart: { zoomType: "xy",  reflow: true },
          title: { text: title, style: { fontSize: '10px'} },
          xAxis: { categories: ["Jan", "Feb", "Mar", "Apr"] },
          yAxis: [{ title: { text: "Values" } }],
          series: [
            {
              type: "column",
              name: "Column Data",
              data: [5, 3, 4, 7],
            },
            {
              type: "line",
              name: "Line Data",
              data: [2, 2, 3, 2],
            },
          ],
        };
      case "stackedBar":
        return {
          chart: { type: "bar",  reflow: true },
          title: { text: title, style: { fontSize: '10px'} },
          xAxis: {
            categories: ["Apples", "Oranges", "Pears", "Bananas"],
          },
          yAxis: {
            min: 0,
            title: { text: "Total Fruit Consumption" },
          },
          plotOptions: {
            series: {
              stacking: "normal", // Makes it a stacked bar chart
            },
          },
          series: [
            {
              name: "John",
              data: [5, 3, 4, 7],
            },
            {
              name: "Jane",
              data: [2, 2, 3, 2],
            },
            {
              name: "Joe",
              data: [3, 4, 4, 2],
            },
          ],
        };
      default:
        return {
          chart: { type,  reflow: true },
          title: { text: title, style: { fontSize: '10px'} },
          series: [
            {
              data: [1, 3, 2, 4],
            },
          ],
        };
    }
  };

  const handleEnd = () => {
    // containerRefs.current.forEach((ref) => {
    //   if (ref && ref.chart) {
    //     ref.chart.reflow(); // Trigger Highcharts to recalculate sizes
    //   }
    // });

    setTimeout(() => {
        containerRefs.current.forEach((ref, index) => {
          if (ref && ref.chart) {
            console.log(`Reflow after drag for chart ${index}`);
            ref.chart.reflow();
          }
        });
      }, 500);
  };

  return (
    <div className="sortable-grid-container">
      <ReactSortable
        list={items}
        setList={setItems}
        className="sortable-grid"
        animation={150}
        ghostClass="ghost"
        handle=".drag-handle"
        onEnd={handleEnd}
      >
        {items.map((item, index) => (
          <div key={item.id} className="sortable-item">
            <div className="drag-handle">Drag</div>
            <div style={{
              height: "80%",
              width: "80%"
            }}>
              <HighchartsReact
                key={item.id}
                highcharts={Highcharts}
                options={getChartOptions(item.type, item.name)}
                containerProps={{
                  style: {
                    height: "100%",
                    width: "100%",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  },
                }}
                ref={(el) => (containerRefs.current[index] = el)}
                allowChartUpdate={true}
              />
            </div>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default Dashboard;