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
import Button from "../Component/Button";

import { Link } from "@reach/router";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import * as d3 from "d3";
import { navigate } from "@reach/router";
import { milToMiliMeter } from "../Utils/helperFunction";

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
    drawingData: [],
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
    const { errorAnalysis, xOffset, yOffset } = this.state;
    d3.csv(URL.createObjectURL(e.target.files[0])).then((d) => {
      console.log("start parsing");
      const data = {};

      const stations = Object.keys(errorAnalysis);
      stations.forEach((station) => {
        errorAnalysis[station].ErorrDescriptions.forEach((obj) => {
          obj.reasons.forEach((i) => {
            if (data[i.item] === null || data[i.item] === undefined) {
              data[i.item] = 1;
            } else {
              data[i.item] += 1;
            }
          });
        });
      });

      const refs = Object.keys(data);
      console.log(data);

      const components = [];
      refs.forEach((ref) => {
        const component = d.find((obj) => obj.REFDES === ref);
        if (component) {
          components.push(component);
        }
      });

      const updatedComponent = components
        .map((c) => ({
          x: milToMiliMeter(c.SYM_X) + milToMiliMeter(parseFloat(xOffset)),
          y: -(milToMiliMeter(c.SYM_Y) - milToMiliMeter(parseFloat(yOffset))),
          bottom: c.SYM_MIRROR,
          ref: c.REFDES,
          qty: data[c.REFDES],
        }))
        .filter((c) => c.bottom === "NO");

      console.log(updatedComponent);

      this.drawSvg(updatedComponent);
    });
  };

  drawSvg = (data) => {
    const { boardLength, boardWidth } = this.state;

    const xScale = d3
      .scaleLinear()
      .domain([0, milToMiliMeter(boardWidth)])
      .range([0, 900]);
    const yScale = d3
      .scaleLinear()
      .domain([0, milToMiliMeter(boardLength)])
      .range([0, 900]);

    const drawingData = data.map((d) => ({
      cx: xScale(d.x),
      cy: yScale(d.y),
      r: d.qty,
    }));

    this.setState({
      drawingData,
    });
  };

  render() {
    const {
      startDate,
      modelName,
      endDate,
      boardWidth,
      boardLength,
      xOffset,
      yOffset,
      fileUrl,
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
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div style={{ marginTop: "20px" }}>
              <div className="img-overlay-wrap">
                <img src={fileUrl} alt="loading" />
                <svg width="900" height="900">
                  {this.state.drawingData.map((d, i) => (
                    <circle key={i} cx={d.cx} cy={d.cy} r={d.r} />
                  ))}
                </svg>
              </div>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default DefectMapping;
