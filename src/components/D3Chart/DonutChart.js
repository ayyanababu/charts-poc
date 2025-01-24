import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const DonutChart = ({ data, total }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear existing content

    const width = 800;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(["#31affa", "#544fc1", "#18e17a", "#fd6b3e"]);

    const arc = d3.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 50);

    const outerArc = d3.arc()
      .innerRadius(radius)
      .outerRadius(radius + 20);

    const pie = d3.pie()
      .value((d) => d.value)
      .sort(null); // Keep the order as defined in the data



    const chartGroup = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);


    // Draw pie segments
    chartGroup.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc.cornerRadius(10))
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "#fff")
      .style("stroke-width", "4px")
      .style("cursor", "pointer")
      .style("opacity", 1)
      .on("mouseover", function (event, d) {
        chartGroup.selectAll("path").style("opacity", (arc) =>
          arc === d ? 1 : 0.6
        );
        chartGroup.selectAll("text").style("opacity", (arc) => 
          arc?.data?.label === d?.data?.label ? 1 : 0.6
        );
        chartGroup.selectAll("polyline").style("opacity", (arc) =>
          arc?.data?.label === d?.data?.label ? 1 : 0.6
        );

      })
      .on("mouseout", function () {
        chartGroup.selectAll("path").style("opacity", 1);
        chartGroup.selectAll("text").style("opacity", 1);
        chartGroup.selectAll("polyline").style("opacity", 1);
      });
      
    // Add lines connecting arcs to labels
    chartGroup
      .selectAll("polyline")
      .data(pie(data))
      .enter()
      .append("polyline")
      .attr("stroke", (d) => color(d.data.label))
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .attr("points", (d) => {
        const posA = arc.centroid(d); // Arc centroid
        const posB = outerArc.centroid(d); // Just outside the arc
        const posC = [...outerArc.centroid(d)];
        posC[0] += (d.startAngle + d.endAngle) / 2 > Math.PI ? -15 : 15; // Adjust x for alignment
        return [posA, posB, posC];
      });

    // Add text labels
    chartGroup
      .selectAll("text.label")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", (d) => {
        const pos = [...outerArc.centroid(d)];
        pos[0] += (d.startAngle + d.endAngle) / 2 > Math.PI ? -20 : 20; // Adjust x for alignment
        pos[1] +=  5; // Adjust y for alignment
        return `translate(${pos})`;
      })
      .style("text-anchor", (d) =>
        (d.startAngle + d.endAngle) / 2 > Math.PI ? "end" : "start"
      )
      .style("font-size", "14px")
      .style("font-family", "Arial, sans-serif")
      .style("font-weight", "bold")
      .style("fill", "black")
      .text((d) => `${d.data.label}: ${d.data.value}%`);

    // Add text labels with white outline
    // chartGroup
    //   .selectAll("text")
    //   .data(pie(data))
    //   .enter()
    //   .append("text")
    //   .text((d) => `wajid ${d.data.value}%`)
    //   .attr("transform", (d) => `translate(${arc.centroid(d)}))`)
    //   .style("text-anchor", "middle")
    //   .style("font-size", "12px")
    //   .style(
    //     "font-family",
    //     "'Lato', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    //   )
    //   .style("fill", "#000")
    //   .style("stroke", "#fff")
    //   .style("stroke-width", "2px")
    //   .style("paint-order", "stroke")
    //   .style("font-weight", "bold");

    // Add total text in the center
    chartGroup
      .append("text")
      .text(`Total`)
      .attr("y", -10)
      .style("text-anchor", "middle")
      .style("font-size", "28px")
      .style("font-family", "Arial, sans-serif")
      .style("font-weight", "bold")
      .style("fill", "#333");

    chartGroup
      .append("text")
      .text(total)
      .attr("y", 25)
      .style("text-anchor", "middle")
      .style("font-size", "22px")
      .style("font-family", "Arial, sans-serif")
      .style("font-weight", "bold")
      .style("fill", "#000");
  }, [data, total]);

  return <svg ref={chartRef}></svg>;
};

export default DonutChart;
