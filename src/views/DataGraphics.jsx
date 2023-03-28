import React from "react";
import "../index.css";
import SideBar from "../components/sidebar";
import Chart from "../components/charts";

function DataGraphics() {
  return (
    <div className="App">
      <SideBar />
      <Chart />
    </div>
  );
}

export default DataGraphics;
