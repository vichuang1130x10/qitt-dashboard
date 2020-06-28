import React, { useState, useEffect } from "react";
import HeaderForDash from "../Component/HeaderForDash";
import { Container, Row, Col } from "react-bootstrap";
import { outputDate } from "../Utils/helperFunction";

export default function Dashboard(props) {
  console.log("Dashboard start");

  const [bpnData, setbpnData] = useState([]);

  const YieldRate = props.location.state.YieldRate;
  console.log(YieldRate);
  useEffect(() => {
    setbpnData(YieldRate.BPNData);
  }, [YieldRate.BPNData, props.location.state.YieldRate]);

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
            {" "}
            <pre>
              <code>{JSON.stringify(bpnData, null, 4)}</code>
            </pre>
          </Col>
          <Col>
            {" "}
            <pre>
              <code>{JSON.stringify(bpnData, null, 4)}</code>
            </pre>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <pre>
              <code>{JSON.stringify(bpnData, null, 4)}</code>
            </pre>
          </Col>
          <Col>
            {" "}
            <pre>
              <code>{JSON.stringify(bpnData, null, 4)}</code>
            </pre>
          </Col>
        </Row>
      </Container>
    </>
  ) : null;
}
