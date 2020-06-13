import React, { useState } from "react";
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
                <th>CPLD</th>
                <th>VCL</th>
                <th>FCT</th>
                <th>DAOI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>YIELD</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>INPUT</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>PASS</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>FAIL</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </NavHeader>
    </Nav>
  );
}
