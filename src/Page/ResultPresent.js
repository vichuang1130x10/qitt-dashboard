import React from "react";
import HeaderWithSearchBar from "../Component/HeaderWithSearchBar";
import { Container, Row, Badge } from "react-bootstrap";
import { outputDate } from "../Utils/HelperFunction";

export default function ResultPresent(props) {
  console.log("result page start");

  // const [originalBom, setBom] = useState([]);

  const ErrorAnalysis = props.location.state.ErrorAnalysis;
  const YieldRate = props.location.state.YieldRate;
  console.log(ErrorAnalysis);
  console.log(YieldRate);

  // const eParts = nud["Electronic parts"];
  // const mParts = nud["Mechanical parts"];

  // const eResults = bom.filter(({ smcPn: id1 }) =>
  //   eParts.some(({ "SMC PN": id2 }) => id2 === id1)
  // );

  // const mResults = bom.filter(({ smcPn: id1 }) =>
  //   mParts.some(({ "SMC PN": id2 }) => id2 === id1)
  // );
  // const results = [...eResults, ...mResults];
  // const types = bom
  //   .map((item) => item.type)
  //   .filter((item) => item.length === 3);
  // const typeSet = new Set(types);
  // const typeArray = Array.from(typeSet);

  // const badgeOnClick = (badge) => {
  //   const udpateBom = bom
  //     .filter((item) => item.type !== undefined && item.type !== null)
  //     .filter((item) => item.type === badge);
  //   setBom(udpateBom);
  // };

  return (
    <>
      <HeaderWithSearchBar
        date={`${outputDate(YieldRate.startDate)} ~ ${outputDate(
          YieldRate.endDate
        )}`}
      />
      <Container></Container>
    </>
  );
}
