import React, { Component } from "react";
import Mapping from "../Visualizations/Mapping";

class GenerateMapping extends Component {
  state = {
    fileUrl: "",
    textFile: {},
    errorAnalysis: {},
    boardLength: "",
    boardWidth: "",
    xOffset: "",
    yOffset: "",
  };
  componentDidMount() {
    const {
      fileUrl,
      textFile,
      errorAnalysis,
      boardLength,
      boardWidth,
      xOffset,
      yOffset,
    } = this.props.location.state;
    this.setState({
      fileUrl,
      textFile,
      errorAnalysis,
      boardLength,
      boardWidth,
      xOffset,
      yOffset,
    });
  }
  render() {
    return (
      <div>
        <Mapping {...this.state} />
      </div>
    );
  }
}

export default GenerateMapping;
