import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const SalesChart = () => {
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 5, 5, 5, 5, 5, 5],
        backgroundColor: [
          "#EF4444",
          "#3B82F6",
          "#F59E0B",
          "#10B981",
          "#A78BFA",
          "#F97316",
          "#8B5CF6",
          "#34D399",
          "#F472B6",
          "#22D3EE",
          "#FBBF24",
          "#8B5CF6",
          "#34D399",
          "#F472B6",
          "#22D3EE",
          "#FBBF24",
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} className="flex-1" />;
};

export default SalesChart;
