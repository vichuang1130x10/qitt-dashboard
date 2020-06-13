import React, { useState, useEffect } from "react";
import HeaderWithSearchBar from "../Component/HeaderWithSearchBar";
import { Container, Row } from "react-bootstrap";
import { outputDate } from "../Utils/HelperFunction";
import ModelCards from "../Component/ModelCard";

export default function ResultPresent(props) {
  console.log("result page start");

  const [yieldRate, setYieldRate] = useState([]);
  const [errorAnalysis, setErrorAnalysis] = useState({});

  const YieldRate = props.location.state.YieldRate;
  useEffect(() => {
    const ErrorAnalysis = props.location.state.ErrorAnalysis;
    // const YieldRate = props.location.state.YieldRate;
    setYieldRate(YieldRate.models);
    setErrorAnalysis(ErrorAnalysis);
  }, [
    YieldRate.models,
    props.location.state.ErrorAnalysis,
    props.location.state.YieldRate,
  ]);

  const keywordSearch = (value) => {
    const searchList = YieldRate.models.filter((model) =>
      model.model.toLowerCase().includes(value.toLowerCase())
    );
    setYieldRate(searchList);
  };

  // console.log(ErrorAnalysis);
  // console.log(YieldRate);

  return YieldRate.startDate ? (
    <>
      <HeaderWithSearchBar
        searchBarOnchanged={(v) => keywordSearch(v)}
        date={`${outputDate(YieldRate.startDate)} ~ ${outputDate(
          YieldRate.endDate
        )}`}
      />
      <Container>
        <Row>
          <div className="model-list-container">
            {yieldRate.map((model) => (
              <ModelCards
                key={model.model}
                model={model.model}
                FE={model.FE}
                BE={model.BE}
                FTY={model.FTY}
              />
            ))}
          </div>
        </Row>
      </Container>
    </>
  ) : null;
}
