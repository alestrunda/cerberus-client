import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import Record from "./Record";

interface Props {
  color?: string;
  data: Record[];
  labelSize?: number;
  maxLabelLength?: number;
  size?: number;
}

const excerpt = (label: string, length: number) => {
  const sliced = label.slice(0, length);
  return label.length === sliced.length ? label : `${sliced}...`;
};

const PieChart = ({
  color = "#bbb",
  data,
  labelSize = 10,
  maxLabelLength = 7,
  size = 578
}: Props) => {
  const node: any = useRef();

  useEffect(() => {
    const recordsCnt = data.length;
    if (!recordsCnt) return;

    // set the dimensions and margins of the graph
    const width = size,
      height = size,
      margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the body of the page
    const svg = d3
      .select(node.current)
      .attr("width", width)
      .attr("height", height)
      .append("g");
    svg.append("g").attr("class", "slices");
    svg.append("g").attr("class", "labels");
    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const arc: any = d3 //some ts bug in d3 types requires using any
      .arc()
      .innerRadius(0)
      .outerRadius(radius * 0.85);

    const labelsArc: any = d3 //some ts bug in d3 types requires using any
      .arc()
      .innerRadius(radius * 0.95)
      .outerRadius(radius * 0.95);

    const pie = d3.pie().sort(null);

    //slices
    svg
      .select(".slices")
      .selectAll("path")
      .data(pie(data.map(item => item.value)))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i: number) => d3.interpolateRainbow(i / (recordsCnt - 1)))
      .attr("stroke", "white")
      .style("stroke-width", "1px")
      .style("opacity", 0.6);

    //labels
    svg
      .select(".labels")
      .selectAll("text")
      .data(pie(data.map((record: Record) => record.value)))
      .enter()
      .append("text")
      .attr("transform", d => `translate(${labelsArc.centroid(d)})`)
      .call(text =>
        text
          .append("tspan")
          .attr("font-size", `${labelSize}px`)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.6)
          .text((_, i: number) => excerpt(data[i].label, maxLabelLength))
      )
      .style("text-anchor", d => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  }, [color, data, labelSize, maxLabelLength, size]);

  return (
    <div className="overflow-auto">
      <svg ref={node}></svg>
    </div>
  );
};

export default PieChart;
