import React from "react";
import { Pie } from "react-chartjs-2";

const SalesPerCategoryChart = () => {
  const chartData = {
    labels: [
      "Category1",
      "Category2",
      "Category3",
      "Category4",
      "Category5",
      "Other",
    ],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 6],
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
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="flex flex-1 w-full justify-center items-center ">
      <Pie
        data={chartData}
        options={chartOptions}
        className=" max-h-72 max-w-72"
      />
    </div>
  );
};

export default SalesPerCategoryChart;
