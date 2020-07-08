// import React, { Component } from "react";
// import * as d3 from "d3";
// const width = 900;
// const height = 900;

// const stations = ["SMT1", "SMT2", "ASM", "ICT", "CPLD", "VOL", "FCT", "DAOI"];

// class Mapping extends Component {
//   state = {};

//   static getDerivedStateFromProps(nextProps, prevState) {
//     const { data } = nextProps;

//     if (!data) return {};

//     const { fileUrl, errorAnalysis, textFile } = data;

//     if (errorAnalysis !== null && errorAnalysis !== undefined) {
//       stations.forEach((station) => {
//         console.log(errorAnalysis[station].ErorrDescriptions);
//       });
//     }
//     // stations.forEach((station) => {
//     //   console.log(errorAnalysis[station]["ErorrDescriptions"]);
//     // });

//     // const updateData = data
//     //   .filter((d) => d.Pass > 10 && d.Total > 10 && d.MO[0] !== "9")
//     //   .sort(sortMo)
//     //   .map((d) => ({
//     //     mo: d.MO,
//     //     total: d.Total,
//     //     yield: parseFloat(((d.Pass / d.Total) * 100).toFixed(1)),
//     //   }));

//     // const trimData =
//     //   updateData.length > 20
//     //     ? updateData.slice(updateData.length - 20, updateData.length)
//     //     : updateData;

//     // const x = trimData.map((d) => d.mo);

//     // const xScale = d3
//     //   .scaleBand()
//     //   .domain(x)
//     //   .range([margin.left, width - margin.left]);
//     // const [min, max] = d3.extent(trimData, (d) => d.yield);
//     // const yScale = d3
//     //   .scaleLinear()
//     //   .domain([Math.min(min, 90), 100])
//     //   .range([height - margin.bottom, margin.top]);

//     // const [yMin, yMax] = d3.extent(trimData, (d) => d.total);
//     // const yScaleRight = d3
//     //   .scaleLinear()
//     //   .domain([Math.min(10, yMin), yMax + 400])
//     //   .range([height - margin.bottom, margin.top]);

//     // const trend = d3
//     //   .line()
//     //   .x((d) => xScale(d.mo) + 20)
//     //   .y((d) => yScale(d.yield));

//     // const line = trend(trimData);

//     // const labels = trimData.map((d) => ({
//     //   x: xScale(d.mo) + 20,
//     //   y: yScale(d.yield),
//     //   fill: "#6eae3e",
//     //   text: `${d.yield}%`,
//     // }));

//     // const barWidth = trimData.length > 10 ? width / trimData.length - 25 : 50;
//     // const textLabels = trimData.map((d) => ({
//     //   x: xScale(d.mo) + barWidth / 2,
//     //   y: yScaleRight(d.total),
//     //   text: d.total,
//     // }));

//     // //trimData.length > 10 ? xScale(d.mo) + 7 : xScale(d.mo) + 50
//     // const bars = trimData.map((d) => {
//     //   return {
//     //     x: xScale(d.mo) + barWidth / 2,
//     //     y: yScaleRight(d.total),
//     //     height: height - yScaleRight(d.total) - margin.bottom,
//     //     width: barWidth,
//     //     fill: "#6FA4E3",
//     //     // text: `${d.yield}%`,
//     //   };
//     // });

//     // console.log(bars);
//     return {
//       fileUrl,
//       textFile,
//       errorAnalysis,
//       // boardLength,
//       // boardWith,
//       // xOffset,
//       // yOffset,
//     };
//   }

//   render() {
//     return (
//       <div className="img-overlay-wrap">
//         <img src={this.state.fileUrl} alt="loading" />
//         <svg width={width} height={height}>
//           {/* {this.state.bars.map((d, i) => (
//             <rect
//               key={i}
//               width={d.width}
//               height={d.height}
//               x={d.x}
//               y={d.y}
//               fill={d.fill}
//             />
//           ))}
//           {this.state.textLabels.map((d, i) => (
//             <text key={i} x={d.x + 4} y={d.y + 8} stroke="#fff">
//               {d.text}
//             </text>
//           ))}
//           <path
//             d={this.state.line}
//             fill={"none"}
//             stroke={"#e58582"}
//             strokeWidth={"3px"}
//           />
//           <g>
//             {this.state.labels.map((d, i) => (
//               <circle key={i} cx={d.x} cy={d.y} r={4} fill={"#e58582"} />
//             ))}
//             {this.state.labels.map((d, i) => (
//               <text key={i} x={d.x + 2} y={d.y - 5}>
//                 {d.text}
//               </text>
//             ))}
//           </g> */}
//         </svg>
//       </div>
//     );
//   }
// }

// export default Mapping;
