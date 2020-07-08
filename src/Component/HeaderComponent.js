import styled from "styled-components";
import { Link } from "@reach/router";

export const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

export const NavHeader = styled.div`
  max-width: 1200px;
  padding: 20px 20px 5px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const NavTitle = styled.div`
  margin: 20px 0 10px 0;
  padding: 0 64px;
  font-family: "Oswald", sans-serif;
`;

export const NavSubTitle = styled.div`
  color: #606060;
  padding: 0 64px;
`;

export const DataRange = styled.div`
  padding: 20px 64px;
`;

export const PageTitle = styled.div`
  color: #3455cc;
  font-weight: bold;
  padding: 0 64px;
`;

export const ModelName = styled.div`
  padding: 0 64px;
`;

export const Input = styled.input`
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  padding: 7px 33px;
  border-radius: 3px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;

  &:active,
  &:focus {
    text-align: left;
  }
`;
