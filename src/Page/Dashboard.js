import React, { useState, useEffect } from "react";
import HeaderForDash from "../Component/HeaderForDash";
import { Container, Row, Col } from "react-bootstrap";
import { outputDate } from "../Utils/helperFunction";
import DashBlock from "../Component/DashBlock";
import DashboardPieChart from "../Visualizations/DashboardPieChart";

export default function Dashboard(props) {
  console.log("Dashboard start");

  const [bpnData, setbpnData] = useState([]);
  const [mbData, setMbData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [piesData, setPiesData] = useState([]);

  const YieldRate = props.location.state.YieldRate;
  console.log(YieldRate);
  useEffect(() => {
    setbpnData(YieldRate.BPNData);
    setMbData(YieldRate.MBData);
    setOtherData(YieldRate.OtherData);
    setPiesData(YieldRate.piesData);
  }, [
    YieldRate.BPNData,
    YieldRate.MBData,
    YieldRate.OtherData,
    YieldRate.piesData,
    props.location.state.YieldRate,
  ]);

  return YieldRate.startDate ? (
    <>
      <HeaderForDash
        date={`${outputDate(YieldRate.startDate)} ~ ${outputDate(
          YieldRate.endDate
        )}`}
      />
      <Container>
        <Row>
          <Col>
            <DashBlock data={mbData} title="MB" />
          </Col>
          <Col>
            <DashBlock data={otherData} title="OTHER" />
          </Col>
        </Row>
        <Row>
          <Col>
            <DashBlock data={bpnData} title="BPN" />
          </Col>
          <Col>
            <h4>Category %</h4>
            <div>Category MB Other BPN</div>
            <DashboardPieChart data={piesData.fct2PieData} />
          </Col>
        </Row>
      </Container>
    </>
  ) : null;
}
