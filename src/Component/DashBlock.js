import React, { useState, useEffect } from "react";
import DashboardTrendChart from "../Visualizations/DashboardTrendChart";
import styled from "styled-components";

const ChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

export default function DashBlock({ data, title }) {
  const [station, setStation] = useState("SMT2");
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    setChartData(data[station]);
  }, [data, station]);

  const updateStation = (str) => {
    setStation(str);
    setChartData(data[str]);
  };

  return (
    <div>
      <label htmlFor="station">
        <ChartContainer>
          <h4>{title} last 10 weeks trend</h4>
          <select
            id="station"
            value={station}
            onChange={(e) => updateStation(e.target.value)}
            onBlur={(e) => updateStation(e.target.value)}
            style={{ marginBottom: "0px" }}
          >
            {["SMT2", "FCT"].map((station) => (
              <option value={station} key={station}>
                {station}
              </option>
            ))}
          </select>
        </ChartContainer>
      </label>
      <DashboardTrendChart data={chartData} />
    </div>
  );
}
