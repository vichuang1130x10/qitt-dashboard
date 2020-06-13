import React, { useState } from "react";
import Button from "../Component/Button";
import { Container, Row, Col } from "react-bootstrap";
import { navigate } from "@reach/router";
import DragCard from "../Component/DragCard";
import { FaHourglass } from "react-icons/fa";
import {
  mappingErrorListAndRepairList,
  parsingErrorList,
} from "../Utils/UtilitiesForFileHandle";
import Header from "../Component/Header";

export default function FileHandling() {
  const [yieldRate, setYieldRate] = useState({});
  const [errorList, setErrorList] = useState({});
  const [repairList, setRepairList] = useState({});
  const [yieldRateFlag, setYieldRateFlag] = useState(false);
  const [errorListFlag, setErrorListFlag] = useState(false);
  const [repairListFlag, setRepairListFlag] = useState(false);

  const receivedYieldRate = (obj) => {
    setYieldRate(obj);
    //setNudFlag(true);
  };

  const receivedErrorList = (obj) => {
    setErrorList(obj);
    //setBomFlag(true);
  };

  const receivedRepairList = (obj) => setRepairList(obj);

  const transferData = (e) => {
    //
    //  navigate(`/result`, { state: { YieldRate: yieldRate, ErrorAnalysis: n } });

    mappingErrorListAndRepairList(errorList, repairList);
    const udpatedErrorList = errorList.ErrorList.map((ele) => {
      if (ele["Reason"] === null || ele["Reason"] === undefined) {
        ele["Reason"] = "Under investigation";
      }
      return ele;
    });
    const parsedErrorList = parsingErrorList(udpatedErrorList);
    navigate(`/result`, {
      state: { YieldRate: yieldRate, ErrorAnalysis: parsedErrorList },
    });
  };

  return (
    <div>
      <Header />
      <Container>
        <h6 className="text-left m-auot mt-5">
          Pick The Files For Generating The Quality Data
        </h6>
        <Row>
          <Col>
            <DragCard
              title="Yield Rate"
              fileType="YieldRate"
              callback={(obj) => receivedYieldRate(obj)}
              setFlag={(bool) => setYieldRateFlag(bool)}
            />
          </Col>
          <Col>
            <DragCard
              title="Error List"
              fileType="ErrorList"
              callback={(obj) => receivedErrorList(obj)}
              setFlag={(bool) => setErrorListFlag(bool)}
            />
          </Col>
          <Col>
            <DragCard
              title="Repair List"
              fileType="RepairList"
              callback={(obj) => receivedRepairList(obj)}
              setFlag={(bool) => setRepairListFlag(bool)}
            />
          </Col>
        </Row>
        <div style={{ height: "50px" }} />
        <Row className="d-flex justify-content-center">
          <Button
            disabled={!yieldRateFlag || !errorListFlag || !repairListFlag}
            style={{ width: "50%" }}
            onClick={transferData}
          >
            <span className="m-1">
              <FaHourglass color="white" />
            </span>{" "}
            Generate Report
          </Button>
        </Row>
      </Container>
    </div>
  );
}
