import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import AOSWrapper from "@/aos/AOSWrapper";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const savedChartData = {
  labels: ["Anxiety", "Depression", "Behavior Disorders"],
  datasets: [
    {
      label: "Ages 3–5",
      data: [2.3, 0.1, 5],
      backgroundColor: "#5790AE"
    },
    {
      label: "Ages 6–11",
      data: [9.2, 1.9, 9.6],
      backgroundColor: "#508B76"
    },
    {
      label: "Ages 12–17",
      data: [16, 8.7, 6.8],
      backgroundColor: "#D6C67A"
    }
  ]
};

const Chart = ({ data }) => {
  const chartData = useMemo(() => data || savedChartData, [data]);

  return (
    <AOSWrapper>
      <div
        className="flex flex-wrap justify-center pb-12 sm:pb-12 md:pb-12 lg:pb-12"
        data-aos="fade-up"
      >
        <div className="w-full max-w-xl lg:ml-48 " data-aos="zoom-in" data-aos-delay="100">
          <h4 className="text-xl font-semibold text-center mb-4">
            Mental and Behavioral Health Conditions by Age
            <p className="text-xs">2022-2023</p>
          </h4>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
          <p className="text-sm font-semibold text-center my-4">
            Mental health conditions can begin in early childhood and the prevalence changes with age. Although there are some exceptions, most mental health conditions are more common with increased age.
          </p>
        </div>

        <div
          className="bg-stone-100 p-5 min-w-[150px]"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <ul className="space-y-3 lg:pt-6">
            {savedChartData.datasets.map((group) => (
              <li key={group.label} className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: group.backgroundColor }}
                />
                <span>{group.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AOSWrapper>
  );
};

export default Chart;
