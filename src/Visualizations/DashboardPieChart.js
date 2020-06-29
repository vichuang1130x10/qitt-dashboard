import React, { Component } from "react";
import * as d3 from "d3";

const width = 500;
const height = 300;

class DashboardPieChart extends Component {
  state = {
    slices: [], // array of svg path commands, each representing a day
    tempAnnotations: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};

    const updateData = Object.values(data);
    console.log(updateData);
    // const radiusScale = d3
    //   .scaleLinear()
    //   .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
    //   .range([0, width / 2]);

    // const colorScale = d3
    //   .scaleSequential()
    //   .domain(d3.extent(data, (d) => d.avg))
    //   .interpolator(d3.interpolateRdYlBu);

    const colors = d3.scaleOrdinal(["#7fa396", "#ebbd9f", "#4a8ddc"]);

    // get the angle for each slice
    // 2PI / 365
    // const perSliceAngle = (2 * Math.PI) / data.length;

    const arcGenerator = d3.arc();
    const pieGenerator = d3.pie();
    const pie = pieGenerator(updateData);
    const slices = pie.map((d, i) => {
      const path = arcGenerator({
        startAngle: d.startAngle,
        endAngle: d.endAngle,
        innerRadius: 50,
        outerRadius: height / 3,
      });
      return { path, fill: colors(i) };
    });

    // const tempAnnotations = [5, 20, 40, 60, 80].map((temp) => {
    //   return {
    //     r: radiusScale(temp),
    //     temp,
    //   };
    // });

    console.log(slices);

    return { slices };
  }

  render() {
    return (
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {this.state.slices.map((d, i) => (
            <path key={i} d={d.path} fill={d.fill} />
          ))}

          {/* {this.state.tempAnnotations.map((d, i) => (
            <g key={i}>
              <circle r={d.r} fill="none" stroke="#999" />
              <text y={-d.r - 2} textAnchor="middle">
                {d.temp}℉
              </text>
            </g>
          ))} */}
        </g>
      </svg>
    );
  }
}

export default DashboardPieChart;
