import styled from "styled-components";
import React from "react";
import { separateString } from "../Utils/HelperFunction";

const ModelContainer = styled.div`
  width: 100%;
  height: 82px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 12px;
  margin: 3px;
  border: 1px solid rgba(0, 0, 0, 0.0975);
  border-radius: 5px;
`;

const ModelBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export default function ModelCard({ model, FE, BE, FTY }) {
  return (
    <ModelContainer>
      <ModelBlock FTY={100}>
        <div>{`${separateString(model)[0]}`}</div>
        <div>{`(${separateString(model)[1]}`}</div>
      </ModelBlock>
      <ModelBlock>{`${FE.Yield || "NA"} ${FE.Yield ? "%" : ""} (${FE.Pass}/ ${
        FE.Pass + FE.Fail
      }) `}</ModelBlock>
      <ModelBlock>{`${BE.Yield || "NA"} ${BE.Yield ? "%" : ""}  (${BE.Pass}/ ${
        BE.Pass + BE.Fail
      })`}</ModelBlock>
      <ModelBlock>{`${FTY || "NA"} ${FTY ? "%" : ""}`}</ModelBlock>
    </ModelContainer>
  );
}
