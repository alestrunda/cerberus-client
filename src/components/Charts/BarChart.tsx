import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import ChartRecord from "../../interfaces/ChartRecord";

interface Props {
  color?: string;
  data: ChartRecord[];
  height?: number;
  width?: number;
}

const BarChart = ({ color = "#bbb", data, height = 400, width = 578 }: Props) => {
  const node: any = useRef();

  useEffect(() => {
    if (!data.length) return;

    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const widthInner = width - margin.left - margin.right,
      heightInner = height - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select(node.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3
      .scaleBand()
      .range([0, widthInner])
      .domain(data.map((record: ChartRecord) => record.label))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + heightInner + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, Math.max(...data.map((record: ChartRecord) => record.value)) * 1.05])
      .range([heightInner, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (record: ChartRecord) => x(record.label) || null)
      .attr("y", (record: ChartRecord) => y(record.value))
      .attr("width", x.bandwidth())
      .attr("height", (record: ChartRecord) => heightInner - y(record.value))
      .attr("fill", color)
      .style("opacity", 0.6);
  }, [color, data, height, width]);

  return (
    <div className="overflow-auto">
      <svg ref={node}></svg>
    </div>
  );
};

export default BarChart;
