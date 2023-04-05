import React from "react";
import "../index.css";
import NavBar from "../components/NavBar";
import VerticalBarChart from "../components/verticalBarChart";

function DataGraphics() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <h1>Hello</h1>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Default
      </button>
      <VerticalBarChart />
    </div>
  );
}

export default DataGraphics;
