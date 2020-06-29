import React, { useState, useEffect } from "react";
import HeaderForDash from "../Component/HeaderForDash";
import { Container, Row, Col } from "react-bootstrap";
import { outputDate } from "../Utils/helperFunction";
import DashBlock from "../Component/DashBlock";
import DashboardPieChart from "../Visualizations/DashboardPieChart";
import blue from "../images/blue.png";
import green from "../images/green.png";
import orange from "../images/orange.png";
import { navigate } from "@reach/router";

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

  const handleToDetail = () => {
    navigate(`/result`, {
      state: {
        YieldRate: props.location.state.YieldRate,
        ErrorAnalysis: props.location.state.ErrorAnalysis,
      },
    });
  };

  return YieldRate.startDate ? (
    <>
      <HeaderForDash
        date={`${outputDate(YieldRate.startDate)} ~ ${outputDate(
          YieldRate.endDate
        )}`}
        handleToDetail={() => handleToDetail()}
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
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <DashBlock data={bpnData} title="BPN" />
          </Col>
          <Col>
            <h4 style={{ textAlign: "center" }}>Category %</h4>
            <div style={{ marginBottom: "4px" }}>
              Category
              <span style={{ marginLeft: "4px" }}>
                <img
                  src={blue}
                  alt="blue"
                  width="10px"
                  style={{
                    display: "inline-block",
                    marginRight: "2px",
                    paddingBottom: "2px",
                  }}
                />
              </span>
              MB
              <span style={{ marginLeft: "4px" }}>
                <img
                  src={orange}
                  alt="orange"
                  width="10px"
                  style={{
                    display: "inline-block",
                    marginRight: "2px",
                    paddingBottom: "2px",
                  }}
                />
              </span>
              Other
              <span style={{ marginLeft: "4px" }}>
                <img
                  src={green}
                  alt="green"
                  width="10px"
                  style={{
                    display: "inline-block",
                    marginRight: "2px",
                    paddingBottom: "2px",
                  }}
                />
              </span>
              BPN
            </div>
            <DashboardPieChart data={piesData.fct2PieData} />
          </Col>
        </Row>
      </Container>
    </>
  ) : null;
}
