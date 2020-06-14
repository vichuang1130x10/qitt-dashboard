import React, { Component } from "react";
import * as d3 from "d3";
const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class Chart extends Component {
  state = {
    bars: [],
  };

  xAxis = d3.axisBottom().tickFormat(d3.timeFormat("%b %d"));
  yAxis = d3.axisLeft().tickFormat((d) => `${d}%`);

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};
    // 1. map date to x-position
    // get min and max of date
    const updateData = data
      .filter((d) => d.Pass > 5 && d.Total > 5)
      .map((d) => ({
        date: d.Date,
        yield: parseFloat(((d.Pass / d.Total) * 100).toFixed(1)),
      }))
      .sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else {
          return -1;
        }
      });

    console.log("chart start");
    console.log(updateData);
    const extent = d3.extent(updateData, (d) => d.date);
    const xScale = d3
      .scaleTime()
      .domain(extent)
      .range([margin.left, width - margin.right]);

    // 2. map high temp to y-position
    // get min/max of high temp
    const [min, max] = d3.extent(updateData, (d) => d.yield);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(min, 80), max])
      .range([height - margin.bottom, margin.top]);

    // 3. map avg temp to color
    // get min/max of avg
    // const colorExtent = d3.extent(data, (d) => d.avg).reverse();
    // const colorScale = d3
    //   .scaleSequential()
    //   .domain(colorExtent)
    //   .interpolator(d3.interpolateRdYlBu);

    // array of objects: x, y, height

    const trend = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.yield));

    const line = trend(updateData);

    const bars = updateData.map((d) => {
      return {
        x: xScale(d.date),
        y: yScale(d.yield),
        height: yScale(d.yield),
        fill: "black",
        text: `${d.yield}%`,
      };
    });

    return { bars, xScale, yScale, line };
  }

  componentDidMount() {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.refs.xAxis).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }

  componentDidUpdate() {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.refs.xAxis).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.refs.yAxis).call(this.yAxis);
  }

  render() {
    return (
      <svg width={width} height={height}>
        <g>
          {" "}
          {this.state.bars.map((d, i) => (
            <text key={i} x={d.x + 2} y={d.y - 5}>
              {d.text}
            </text>
          ))}
          {this.state.bars.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={4} fill={"#bada55"} />
          ))}
        </g>

        <path
          d={this.state.line}
          fill={"none"}
          stroke={"#bada55"}
          strokeWidth={"3px"}
        />
        <g ref="xAxis" transform={`translate(0, ${height - margin.bottom})`} />
        <g ref="yAxis" transform={`translate(${margin.left}, 0)`} />
      </svg>
    );
  }
}

export default Chart;

// componentDidMount() {
//   d3.select(this.refs.wavePath)
//     .datum(this.props.waveData)
//     .attr("d",this.props.line)
// }
// componentDidUpdate() {
//   d3.select(this.refs.wavePath)
//     .datum(this.props.waveData)
//     .attr("d",this.props.line)
// }
// render () {
//   return (
//     <svg width="760" height="200" id="waveform">
//       <g id="waveShape" ref="waveGroup">
//         <path
//           className="wave"
//           transform="translate(0,10)"
//           ref="wavePath"
//         />
//       </g>
//     </svg>
//   )
// }
// }
