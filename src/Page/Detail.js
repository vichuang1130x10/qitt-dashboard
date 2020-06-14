import React, { Component } from "react";
import HeaderWithTable from "../Component/HeaderWithTable";
import { Container, Row, Col } from "react-bootstrap";
import Chart from "../Visualizations/Chart";
import { Table } from "react-bootstrap";

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
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                  style={{ fontSize: "16px" }}
                >
                  <thead>
                    <tr>
                      <th>Defect Item </th>
                      <th>Q'ty(pcs)</th>
                      <th>Individual%</th>
                      <th>Comulated%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortFailure.map((item) => (
                      <tr key={item.defectName}>
                        <td>{item.defectName}</td>
                        <td>{item.qty}</td>
                        <td>{item.indiv}</td>
                        <td>{item.accu}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <div style={{ marginBottom: "500px" }}></div>
        </Container>
      </>
    ) : null;
  }
}

export default Detail;

// //<option value="SMT1">SMT1</option>
// <option value="SMT2">SMT2</option>
// <option value="ASM">ASM</option>
// <option value="ICT">ICT</option>
// <option value="SMT2">SMT2</option>
// export default function Detail(props) {
//     console.log("detail page start");
//     const [modelData, setModelData] = useState({});
//     const [selection, setSelection] = useState("SMT1");
//     const [trendData, setTrendData] = useState([]);

//     useEffect(() => {
//       setModelData(props.location.state);

//       // const data = modelData.modelDetail[selection].data.filter(
//       //   (d) => d.Pass !== 0 && d.Total !== 0
//       // );
//       // setTrendData(data);
//     }, [props.location.state, modelData]);

//     const udpateStation = (str) => {
//       console.log("updateStation call");
//       setSelection(str);
//       const data = modelData.modelDetail[selection].data.filter(
//         (d) => d.Pass !== 0 && d.Total !== 0
//       );
//       setTrendData(data);
//     };
