import React, { Component } from "react";
import {
  Nav,
  NavHeader,
  NavTitle,
  NavSubTitle,
  DataRange,
  ModelName,
  Input,
} from "../Component/HeaderComponent";

import { Link } from "@reach/router";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import * as d3 from "d3";

const InputField = styled.div`
  margin: 20px;
`;

class DefectMapping extends Component {
  state = {
    startDate: "",
    endDate: "",
    modelName: "",
    errorAnalysis: {},
    boardWidth: "",
    boardLength: "",
    xOffset: "",
    yOffset: "",
    textFile: {},
    fileUrl: "",
  };
  componentDidMount() {
    const {
      startDate,
      endDate,
      modelName,
      errorAnalysis,
    } = this.props.location.state;
    this.setState({
      startDate,
      endDate,
      modelName,
      errorAnalysis,
    });
  }

  updateBoardWidth = (e) => {
    if (e.target.validity.valid) this.setState({ boardWidth: e.target.value });
  };

  updateBoardLength = (e) => {
    if (e.target.validity.valid) this.setState({ boardLength: e.target.value });
  };

  updateXOffset = (e) => {
    if (e.target.validity.valid) this.setState({ xOffset: e.target.value });
  };

  updateYOffset = (e) => {
    if (e.target.validity.valid) this.setState({ yOffset: e.target.value });
  };

  handleImageChange = (e) => {
    this.setState({
      fileUrl: URL.createObjectURL(e.target.files[0]),
    });
  };

  handleCSV = (e) => {
    d3.csv(URL.createObjectURL(e.target.files[0])).then((data) =>
      this.setState({
        textFile: data,
      })
    );
  };

  render() {
    const {
      startDate,
      modelName,
      endDate,
      errorAnalysis,
      boardWidth,
      boardLength,
      xOffset,
      yOffset,
      fileUrl,
      textFile,
    } = this.state;
    return (
      <>
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
              <h6>Date Range : {`${startDate} ~ ${endDate}`}</h6>
            </DataRange>
            <ModelName>{modelName}</ModelName>
          </NavHeader>
        </Nav>
        <Container>
          <h4 className="center-text">Defect Mapping</h4>
          <Row>
            <div>
              <div style={{ display: "flex" }}>
                <InputField>
                  <h6>Board Width:{boardWidth}</h6>
                  <Input
                    value={boardWidth}
                    onChange={(e) => this.updateBoardWidth(e)}
                    pattern="^-?[0-9]\d*\.?\d*$"
                  />
                </InputField>
                <InputField>
                  <h6>Board Length:{boardLength}</h6>
                  <Input
                    value={boardLength}
                    onChange={(e) => this.updateBoardLength(e)}
                    pattern="^-?[0-9]\d*\.?\d*$"
                  />
                </InputField>
                <InputField>
                  <h6>X Axis Offset:{xOffset}</h6>
                  <Input
                    value={xOffset}
                    onChange={(e) => this.updateXOffset(e)}
                    pattern="^-?[0-9]\d*\.?\d*$"
                  />
                </InputField>
                <InputField>
                  <h6>Y Axis Offset:{yOffset}</h6>
                  <Input
                    value={yOffset}
                    onChange={(e) => this.updateYOffset(e)}
                    pattern="^-?[0-9]\d*\.?\d*$"
                  />
                </InputField>
              </div>
              <div style={{ display: "flex" }}>
                <div>
                  <input type="file" onChange={this.handleImageChange} />
                </div>
                <div>
                  <input type="file" onChange={this.handleCSV} />
                  <pre>
                    <code>{JSON.stringify(textFile, null, 4)}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default DefectMapping;
