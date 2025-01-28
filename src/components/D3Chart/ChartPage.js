import React from "react";
import DonutChart from "./DonutChart";

const ChartPage = () => {
  const data = [
    { label: "EV", value: 24 },
    { label: "Hybrids", value: 13 },
    { label: "Diesel", value: 37 },
    { label: "Petrol", value: 26 },
  ];
  const total = "2 877 820";

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontFamily: "sans-serif" }}>2023 Norway Car Registrations</h1>
      <DonutChart data={data} total={total} />
    </div>
  );
};

export default ChartPage;
