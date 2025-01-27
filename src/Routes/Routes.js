import React from "react";
import D3CombinationChart from "../components/D3/CombinationChart";
import HighchartCombinationChart from "../components/Highcharts/CombinationChart";
import Dashboard from "../components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChartPage from "../components/D3Chart/ChartPage";
import ChartDemos from "../components/ChartDemos/ChartDemos";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/d3/chartConversion" element={<ChartPage />} />
        <Route path="/d3/basic" element={<D3CombinationChart />} />
        <Route path="/hc/basic" element={<HighchartCombinationChart />} />
        <Route path="/demo" element={<ChartDemos />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
