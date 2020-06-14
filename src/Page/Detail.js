import React, { Component } from "react";
import HeaderWithTable from "../Component/HeaderWithTable";
import { Container, Row } from "react-bootstrap";
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
  };

  componentDidMount() {
    console.log(this.props.location.state);
    const {
      startDate,
      endDate,
      modelName,
      modelDetail,
    } = this.props.location.state;
    this.setState({
      tableData: this.props.location.state,
      startDate,
      endDate,
      modelName,
      modelDetail,
      trendData: modelDetail[this.state.station].data,
    });
  }

  udpateStation = (str) => {
    this.setState({
      station: str,
      trendData: this.state.modelDetail[str].data,
    });
  };

  render() {
    const { tableData, startDate, station, trendData } = this.state;

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
              <div style={{ width: "80%" }}>
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
                  <tbody></tbody>
                </Table>
              </div>
            </div>
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
