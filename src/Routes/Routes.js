import React from "react";
import D3CombinationChart from "../components/D3/CombinationChart";
import HighchartCombinationChart from "../components/Highcharts/CombinationChart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/d3/basic" element={<D3CombinationChart />} />
        <Route path="/hc/basic" element={<HighchartCombinationChart />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
