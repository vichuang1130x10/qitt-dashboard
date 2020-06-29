import React from "react";
import styled from "styled-components";

import { Link } from "@reach/router";

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

const PageTitle = styled.div`
  color: #3455cc;
  font-weight: bold;
  padding: 0 64px;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #dbdbdb;
  color: #262626;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  padding: 5px 9px;
  text-transform: capitalize;
  font-size: 14px;
  margin-left: 20px;
`;

export default function HeaderWithSearchBar(props) {
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
          <h6>Date Range : {props.date}</h6>
        </DataRange>
        <div style={{ display: "flex" }}>
          <PageTitle>
            <h5>SUMMARY PAGE</h5>
          </PageTitle>
          <PageTitle>
            <Button onClick={props.handleToDetail}>GO TO LIST PAGE</Button>
          </PageTitle>
        </div>
      </NavHeader>
    </Nav>
  );
}
