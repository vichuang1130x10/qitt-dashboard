import React from "react";
import ReactLoading from "react-loading";

const Indicator = ({ type, color, className }) => (
  <ReactLoading
    type={type}
    color={color}
    className={className}
    height="32px"
    width="32px"
  />
);

export default Indicator;
