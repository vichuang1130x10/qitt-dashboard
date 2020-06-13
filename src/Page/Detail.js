import React, { useState, useEffect } from "react";
import HeaderWithTable from "../Component/HeaderWithTable";
import { Container, Row } from "react-bootstrap";

export default function Detail(props) {
  console.log("detail page start");
  const [modelData, setModelData] = useState({});
  useEffect(() => {
    const modelDataDetail = props.location.state;
    console.log(modelData);
    setModelData(modelDataDetail);
  }, [props.location.state, modelData]);

  return modelData.modelDetail ? (
    <>
      <HeaderWithTable data={modelData} />
      <Container>
        <Row></Row>
      </Container>
    </>
  ) : null;
}
