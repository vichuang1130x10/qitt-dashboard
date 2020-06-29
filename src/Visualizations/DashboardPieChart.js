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
    const total = updateData.reduce((acc, ele) => acc + ele, 0);
    const labelData = [];
    updateData.forEach((data, i) => {
      let title = "";
      switch (i) {
        case 0:
          title = "BPN";
          break;
        case 1:
          title = "MB";
          break;
        default:
          title = "OTHER";
      }
      const percentage = parseFloat(((data / total) * 100).toFixed(1)) || 0;
      labelData.push(`${title} ${data} (${percentage}%)`);
    });
    console.log(labelData);

    const colors = d3.scaleOrdinal(["#7fa396", "#4a8ddc", "#ebbd9f"]);

    const arcGenerator = d3.arc();
    const pieGenerator = d3.pie();

    const label = d3
      .arc()
      .outerRadius(height / 3)
      .innerRadius(height / 3 - 80);

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
