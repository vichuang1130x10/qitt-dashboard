import React, { Component } from "react";
import HeaderWithTable from "../Component/HeaderWithTable";
import { Container, Row } from "react-bootstrap";
import Chart from "../Visualizations/Chart";
import DefectTable from "../Component/DefectTable";

class Detail extends Component {
  state = {
    tableData: {},
    startDate: "",
    endDate: "",
    modelName: "",
    modelDetail: {},
    station: "SMT1",
    trendData: [],
    errorAnalysis: [],
    sortFailure: [],
    topThree: [],
  };

  componentDidMount() {
    console.log(this.props.location.state);
    const {
      startDate,
      endDate,
      modelName,
      modelDetail,
      errorAnalysis,
    } = this.props.location.state;
    this.setState({
      tableData: this.props.location.state,
      startDate,
      endDate,
      modelName,
      modelDetail,
      trendData: modelDetail[this.state.station].data,
      errorAnalysis,
      sortFailure: this.parsingToQty(errorAnalysis, this.state.station),
    });
  }

  udpateStation = (str) => {
    this.setState({
      station: str,
      trendData: this.state.modelDetail[str].data,
      sortFailure: this.parsingToQty(this.state.errorAnalysis, str),
    });
  };

  parsingToQty = (e, str) => {
    console.log("parsing");
    console.log(e);
    if (e === undefined || e === null) {
      return [];
    }
    const allDefects = {};
    // const { station } = this.state;
    e[str].ErorrDescriptions.forEach((defect) => {
      if (
        allDefects[defect.description] === null ||
        allDefects[defect.description] === undefined
      ) {
        allDefects[defect.description] = 1;
      } else {
        allDefects[defect.description] += 1;
      }
    });

    let sortable = [];
    for (let defect in allDefects) {
      sortable.push([defect, allDefects[defect]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0);
    const result = [];
    let accumulate = 0;
    sortable.forEach((d) => {
      const indiv = parseInt((d[1] / totalDefects) * 100);
      accumulate += d[1];
      result.push({
        defectName: d[0],
        qty: d[1],
        indiv: indiv,
        accu: parseInt((accumulate / totalDefects) * 100),
      });
    });
    // const arr = this.state.errorAnalysis[this.state.station].ErorrDescriptions;
    // console.log(arr);

    return result;
  };

  parsingRootCause = (failureName, e, str) => {
    const result = [];
    const rootCause = {};
    const failures = e[str].ErorrDescriptions;

    const f = failures.filter((failure) => failure.description === failureName);
    f.forEach((reason) => {
      result.push(`${reason.reasons[0].reason}/${reason.reasons[0].item}`);
    });

    console.log(result);

    result.forEach((item) => {
      if (rootCause[item] === null || rootCause[item] === undefined) {
        rootCause[item] = 1;
      } else {
        rootCause[item] += 1;
      }
    });

    let sortable = [];
    for (let defect in rootCause) {
      sortable.push([defect, rootCause[defect]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0);
    const rootCauseResult = [];
    let accumulate = 0;
    sortable.forEach((d) => {
      const indiv = parseInt((d[1] / totalDefects) * 100);
      accumulate += d[1];
      rootCauseResult.push({
        defectName: d[0],
        qty: d[1],
        indiv: indiv,
        accu: parseInt((accumulate / totalDefects) * 100),
      });
    });
    return rootCauseResult;
  };

  render() {
    const {
      tableData,
      startDate,
      station,
      trendData,
      errorAnalysis,
      sortFailure,
    } = this.state;

    return startDate.length ? (
      <>
        <HeaderWithTable data={tableData} />
        <Container>
          <Row>
            <label htmlFor="station">
              Trend Chart:
              <select
                id="station"
                value={station}
                onChange={(e) => this.udpateStation(e.target.value)}
                onBlur={(e) => this.udpateStation(e.target.value)}
              >
                {[
                  "SMT1",
                  "SMT2",
                  "ASM",
                  "ICT",
                  "CPLD",
                  "VOL",
                  "FCT",
                  "DAOI",
                ].map((station) => (
                  <option value={station} key={station}>
                    {station}
                  </option>
                ))}
              </select>
            </label>
            <Chart data={trendData} />
          </Row>
          <br />
          <Row>
            <div>
              <h4>Defect Symptom Analysis:</h4>
              <br />
              <div style={{ width: "100%" }}>
                <DefectTable sortFailure={sortFailure} />
              </div>
            </div>
          </Row>
          <Row>
            <h4>TOP 3 Root Cause:</h4>
          </Row>
          <Row>
            {sortFailure.length ? (
              <div>
                <h6>{sortFailure[0].defectName}</h6>
                <DefectTable
                  sortFailure={this.parsingRootCause(
                    sortFailure[0].defectName,
                    errorAnalysis,
                    station
                  )}
                />
              </div>
            ) : null}
          </Row>
          <Row>
            {sortFailure[1] ? (
              <div>
                <h6>{sortFailure[1].defectName}</h6>
                <DefectTable
                  sortFailure={this.parsingRootCause(
                    sortFailure[1].defectName,
                    errorAnalysis,
                    station
                  )}
                />
              </div>
            ) : null}
          </Row>
          <Row>
            {sortFailure[2] ? (
              <div>
                <h6>{sortFailure[2].defectName}</h6>
                <DefectTable
                  sortFailure={this.parsingRootCause(
                    sortFailure[2].defectName,
                    errorAnalysis,
                    station
                  )}
                />
              </div>
            ) : null}
          </Row>

          <div style={{ marginBottom: "500px" }}></div>
        </Container>
      </>
    ) : null;
  }
}

export default Detail;

//    <Table
// striped
// bordered
// hover
// size="sm"
// style={{ fontSize: "16px" }}
// >
// <thead>
//   <tr>
//     <th>Defect Item </th>
//     <th>Q'ty(pcs)</th>
//     <th>Individual%</th>
//     <th>Comulated%</th>
//   </tr>
// </thead>
// <tbody>
//   {sortFailure.map((item) => (
//     <tr key={item.defectName}>
//       <td>{item.defectName}</td>
//       <td>{item.qty}</td>
//       <td>{item.indiv}</td>
//       <td>{item.accu}</td>
//     </tr>
//   ))}
// </tbody>
// </Table>
