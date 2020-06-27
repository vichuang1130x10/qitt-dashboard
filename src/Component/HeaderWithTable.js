import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Table } from "react-bootstrap";

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const NavHeader = styled.div`
  max-width: 1200px;
  padding: 20px 20px 5px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const NavTitle = styled.div`
  margin: 20px 0 10px 0;
  padding: 0 64px;
  font-family: "Oswald", sans-serif;
`;

const NavSubTitle = styled.div`
  color: #606060;
  padding: 0 64px;
`;

const DataRange = styled.div`
  padding: 20px 64px;
`;

const ModelName = styled.div`
  padding: 0 64px;
`;

const FE = styled.div`
  color: #606060;
  padding: 0 64px;
`;

const BE = styled.div`
  color: #606060;
  padding: 0 64px;
`;

const FTY = styled.div`
  color: #606060;
  padding: 0 64px;
`;

const TableContainer = styled.div`
  padding: 12px 64px;
`;

export default function HeaderWithTable(props) {
  console.log(props);

  return (
    <Nav>
      <NavHeader>
        <NavTitle>
          <Link to="/" style={{ color: "#000" }}>
            <h3>SUPERMICRO ME</h3>
          </Link>
        </NavTitle>
        <NavSubTitle>
          <h2>Quality Improvement Tracking Tool For EMS</h2>
        </NavSubTitle>
        <DataRange>
          <h6>
            Date Range : {`${props.data.startDate} ~ ${props.data.endDate}`}
          </h6>
        </DataRange>
        <ModelName>
          <h4>Model: {props.data.modelName}</h4>
        </ModelName>
        <FE>
          <h6>
            {`FE: ${props.data.modelDetail.FE.Yield || "NA"} ${
              props.data.modelDetail.FE.Yield ? "%" : ""
            } `}
          </h6>
        </FE>
        <BE>
          <h6>{`BE: ${props.data.modelDetail.BE.Yield || "NA"} ${
            props.data.modelDetail.BE.Yield ? "%" : ""
          } `}</h6>
        </BE>
        <FTY>
          <h6>{`FTY: ${props.data.modelDetail.FTY || "NA"} ${
            props.data.modelDetail.FTY ? "%" : ""
          } `}</h6>
        </FTY>
        <TableContainer>
          <Table striped bordered hover size="sm" style={{ fontSize: "16px" }}>
            <thead>
              <tr>
                <th>Station</th>
                <th>SMT1</th>
                <th>SMT2</th>
                <th>ASM</th>
                <th>ICT</th>
                <th>CPLD</th>
                <th>VOL</th>
                <th>FCT</th>
                <th>DAOI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>YIELD</th>
                <td>
                  {props.data.modelDetail.SMT1.Pass !== 0 &&
                  props.data.modelDetail.SMT1.Total !== 0
                    ? (
                        (props.data.modelDetail.SMT1.Pass /
                          props.data.modelDetail.SMT1.Total) *
                        100
                      ).toFixed(1)
                    : 0}{" "}
                  %
                </td>
                <td>
                  {" "}
                  {props.data.modelDetail.SMT2.Pass !== 0 &&
                  props.data.modelDetail.SMT2.Total !== 0
                    ? (
                        (props.data.modelDetail.SMT2.Pass /
                          props.data.modelDetail.SMT2.Total) *
                        100
                      ).toFixed(1)
                    : 0}{" "}
                  %
                </td>
                <td>
                  {" "}
                  {props.data.modelDetail.ASM.Pass !== 0 &&
                  props.data.modelDetail.ASM.Total !== 0
                    ? (
                        (props.data.modelDetail.ASM.Pass /
                          props.data.modelDetail.ASM.Total) *
                        100
                      ).toFixed(1)
                    : 0}{" "}
                  %
                </td>
                <td>
                  {" "}
                  {props.data.modelDetail.ICT.Pass !== 0 &&
                  props.data.modelDetail.ICT.Total !== 0
                    ? (
                        (props.data.modelDetail.ICT.Pass /
                          props.data.modelDetail.ICT.Total) *
                        100
                      ).toFixed(1)
                    : "NA"}{" "}
                  %
                </td>
                <td>
                  {" "}
                  {props.data.modelDetail.CPLD.Pass !== 0 &&
                  props.data.modelDetail.CPLD.Total !== 0
                    ? (
                        (props.data.modelDetail.CPLD.Pass /
                          props.data.modelDetail.CPLD.Total) *
                        100
                      ).toFixed(1)
                    : 0}{" "}
                  %
                </td>
                <td>
                  {" "}
                  {props.data.modelDetail.VOL.Pass !== 0 &&
                  props.data.modelDetail.VOL.Total !== 0
                    ? (
                        (props.data.modelDetail.VOL.Pass /
                          props.data.modelDetail.VOL.Total) *
                        100
                      ).toFixed(1)
                    : 0}{" "}
                  %
                </td>
                <td>
                  {" "}
                  {props.data.modelDetail.FCT.Pass !== 0 &&
                  props.data.modelDetail.FCT.Total !== 0
                    ? (
                        (props.data.modelDetail.FCT.Pass /
                          props.data.modelDetail.FCT.Total) *
                        100
                      ).toFixed(1)
                    : 0}{" "}
                  %
                </td>
                <td>
                  {" "}
                  {props.data.modelDetail.DAOI.Pass !== 0 &&
                  props.data.modelDetail.DAOI.Total !== 0
                    ? (
                        (props.data.modelDetail.DAOI.Pass /
                          props.data.modelDetail.DAOI.Total) *
                        100
                      ).toFixed(1)
                    : 0}{" "}
                  %
                </td>
              </tr>
              <tr>
                <th>INPUT</th>
                <td>{props.data.modelDetail.SMT1.Total}</td>
                <td>{props.data.modelDetail.SMT2.Total}</td>
                <td>{props.data.modelDetail.ASM.Total}</td>
                <td>{props.data.modelDetail.ICT.Total}</td>
                <td>{props.data.modelDetail.CPLD.Total}</td>
                <td>{props.data.modelDetail.VOL.Total}</td>
                <td>{props.data.modelDetail.FCT.Total}</td>
                <td>{props.data.modelDetail.DAOI.Total}</td>
              </tr>
              <tr>
                <th>PASS</th>
                <td>{props.data.modelDetail.SMT1.Pass}</td>
                <td>{props.data.modelDetail.SMT2.Pass}</td>
                <td>{props.data.modelDetail.ASM.Pass}</td>
                <td>{props.data.modelDetail.ICT.Pass}</td>
                <td>{props.data.modelDetail.CPLD.Pass}</td>
                <td>{props.data.modelDetail.VOL.Pass}</td>
                <td>{props.data.modelDetail.FCT.Pass}</td>
                <td>{props.data.modelDetail.DAOI.Pass}</td>
              </tr>
              <tr>
                <th>FAIL</th>
                <td>{props.data.modelDetail.SMT1.Fail}</td>
                <td>{props.data.modelDetail.SMT2.Fail}</td>
                <td>{props.data.modelDetail.ASM.Fail}</td>
                <td>{props.data.modelDetail.ICT.Fail}</td>
                <td>{props.data.modelDetail.CPLD.Fail}</td>
                <td>{props.data.modelDetail.VOL.Fail}</td>
                <td>{props.data.modelDetail.FCT.Fail}</td>
                <td>{props.data.modelDetail.DAOI.Fail}</td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </NavHeader>
    </Nav>
  );
}
