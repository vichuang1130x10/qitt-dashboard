import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { navigate } from "@reach/router";
import DragCard from "../Component/DragCard";
import { FaSearch } from "react-icons/fa";
import { mappingErrorListAndRepairList } from "../Utils/utilities";

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
    console.log(udpatedErrorList);
  };

  return (
    <div>
      <Container>
        <h1 className="text-center font-weight-bold m-auot mb-5">
          Pick The Files For Comparing
        </h1>
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
              <FaSearch color="white" />
            </span>{" "}
            Let's Compare
          </Button>
        </Row>
      </Container>
    </div>
  );
}
