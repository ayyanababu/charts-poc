import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generateTradingData = (
  days = 30,
  minVolume = 1000,
  maxVolume = 2000,
  amplitude = 5,
  frequency = 0.2
) => {
  return Array.from({ length: days }, (_, i) => ({
    day: `Day ${i + 1}`,
    volume: Math.floor(Math.random() * (maxVolume - minVolume + 1)) + minVolume,
    pnl: parseFloat(
      (amplitude * Math.sin(frequency * i) + Math.random() * 0.5).toFixed(2)
    ),
  }));
};

const D3CombinationChart = () => {
  const [loadingTime, setLoadingTime] = useState(0);
  const chartRef = useRef();
  const data = generateTradingData(100);
  console.log('##', data);


  const exportToPDF = async () => {
    console.log('### eport to pdf triggered')
    try {
      const chartElement = chartRef.current;

      if (!chartElement) {
        console.error("Chart element not found!");
        return;
      }

      console.log("Capturing chart for PDF...");

      // Use html2canvas to capture the chart
      const canvas = await html2canvas(chartElement, {
        scale: 2, // High resolution
        useCORS: true, // For cross-origin images
        scrollX: 0,
        scrollY: 0,
      });

      const imageData = canvas.toDataURL("image/png");

      // Generate the PDF with jsPDF
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("D3_Combination_Chart.pdf");

      console.log("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  useEffect(() => {
    const startTime = window.performance.now();

    const barWidth = 5;
    const calculatedWidth = data.length * barWidth;
    const minWidth = 800;
    const width = Math.max(calculatedWidth, minWidth);
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const height = 500 - margin.top - margin.bottom;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.day))
      .range([0, width])
      .padding(0.1);

    const yScaleLeft = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.volume)])
      .range([height, 0]);

    const yScaleRight = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.pnl), d3.max(data, (d) => d.pnl)])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xScale).tickValues([]);
    const yAxisLeft = d3.axisLeft(yScaleLeft);
    const yAxisRight = d3.axisRight(yScaleRight);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(yAxisLeft);

    svg
      .append("g")
      .attr("transform", `translate(${width}, 0)`)
      .call(yAxisRight);

    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.day))
      .attr("y", (d) => yScaleLeft(d.volume))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScaleLeft(d.volume))
      .attr("fill", "#7cb5ec")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .style("background", "light-grey")
          .html(`<strong>${d.day}</strong><br>Volume: ${d.volume} units`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    const line = d3
      .line()
      .x((d) => xScale(d.day) + xScale.bandwidth() / 2)
      .y((d) => yScaleRight(d.pnl));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#434348")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .selectAll(".point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "point")
      .attr("cx", (d) => xScale(d.day) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScaleRight(d.pnl))
      .attr("r", 4)
      .attr("fill", "#434348")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .style("background", "lightblue")
          .html(`<strong>${d.day}</strong><br>P&L: ${d.pnl}%`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    const endTime = window.performance.now();
    const renderTime = (endTime - startTime).toFixed(2);

    console.log(`D3 Chart rendered in ${renderTime}ms`);
    toast.info(`D3 Chart loaded in ${renderTime}ms`, {
      autoClose: 3000,
      position: "top-right",
    });
  }, [data]);

  return (
    <>
      <div style={{ overflowX: "scroll", position: "relative" }}>
        <div ref={chartRef}></div>
        <button onClick={exportToPDF} style={{ margin: "20px" }}>
          Export to PDF
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default D3CombinationChart;

