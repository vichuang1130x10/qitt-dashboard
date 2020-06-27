import React, { Component } from "react";
import * as d3 from "d3";
const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class Chart extends Component {
  state = {
    bars: [],
  };

  xAxis = React.createRef();
  yAxis = React.createRef();

  // xAxis = d3.axisBottom().tickFormat(d3.timeFormat("%b %d"));
  // yAxis = d3.axisLeft().tickFormat((d) => `${d}%`);

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
    this.createAxis();
  }

  componentDidUpdate() {
    this.createAxis();
  }

  createAxis = () => {
    let xAxisD3 = d3.axisBottom().tickFormat(d3.timeFormat("%b %d"));
    let yAxisD3 = d3.axisLeft().tickFormat((d) => `${d}%`);
    xAxisD3.scale(this.state.xScale);
    d3.select(this.xAxis.current).call(xAxisD3);
    yAxisD3.scale(this.state.yScale);
    d3.select(this.yAxis.current).call(yAxisD3);
  };

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
        <g
          ref={this.xAxis}
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g ref={this.yAxis} transform={`translate(${margin.left}, 0)`} />
      </svg>
    );
  }
}

export default Chart;
