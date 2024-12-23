import  { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import api from "../utils/api";
import processFilteredData from "../utils/filterData";
import { useTheme } from "next-themes";
import PropTypes from "prop-types";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const MarketChart = ({ coins, isMultiple }) => {
  const chartRef = useRef(null);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [selectedOption, setSelectedOption] = useState("7d");
  const [marketData, setMarketData] = useState({
    data: [],
    status: "idle",
    error: null,
  });
  const colors = [
    "rgb(54, 162, 235)",
    "rgb(255, 99, 132)",
    "rgb(255, 205, 86)",
  ];

  const fetchMarketData = async () => {
    const cacheKey = isMultiple
      ? `marketData_${coins.join("_")}`
      : `marketData_${coins}`;
    const cacheExpiry = 5 * 60 * 1000; // 5 minutes
    const cachedItem = localStorage.getItem(cacheKey);

    if (cachedItem) {
      const { data, timestamp } = JSON.parse(cachedItem);
      const currentTime = new Date().getTime();

      if (currentTime - timestamp < cacheExpiry) {
        setMarketData({ data, status: "done", error: null });
        return;
      } else {
        localStorage.removeItem(cacheKey);
      }
    }
    setMarketData((prev) => ({ ...prev, status: "loading" }));
    try {
      const coinsToFetch = isMultiple ? coins : [coins];
      const promises = coinsToFetch.map((coin) =>
        api.get(`/coins/${coin}/market_chart?vs_currency=usd&days=90`)
      );
      const responses = await Promise.all(promises);
      const data = responses.map((res, index) => ({
        name: coinsToFetch[index],
        data: res.data.prices,
      }));
      const timestamp = new Date().getTime();

      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp }));

      setMarketData({ data, status: "done", error: null });
    } catch (error) {
      setMarketData({ data: [], status: "error", error });
    }
  };

  useEffect(() => {
    if (marketData.status === "idle") {
      fetchMarketData();
    }
  }, []);

  useEffect(() => {
    if (marketData.status === "done" && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;

      const fildata = processFilteredData(true, marketData.data, selectedOption);

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy(); // Destroy the previous chart instance
      }

      chartRef.current.chart = new Chart(ctx, {
        type: "line",
        data: {
          datasets: fildata.map((coin, ind) => ({
            label: coin.name,
            data: coin.data.map((item) => ({
              x: item[0],
              y: item[1],
            })),
            fill: false,
            borderColor: colors[ind],
            backgroundColor: colors[ind],
            borderWidth: 2,
            pointRadius: 0,
          })),
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "time",
              time: {
                unit: selectedOption === "24h" ? "hour" : "day",
              },
              ticks: {
                color: currentTheme === "dark" ? "white" : "black",
              },
              title: {
                display: isMultiple ? true : false,
                text: selectedOption === "24h" ? "Date (hrs)" : "Date (day)",
                color: currentTheme === "dark" ? "white" : "black",
              },
              beginAtZero: false,
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: isMultiple ? true : false,
                text: "Price in USD",
                color: currentTheme === "dark" ? "white" : "black",
              },
              ticks: {
                color: currentTheme === "dark" ? "white" : "black",
              },
              beginAtZero: false,
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            title: {
              display: isMultiple ? true : false,
              text: "Global Market Cap",
              color: currentTheme === "dark" ? "white" : "black",
            },
            legend: {
              display: isMultiple ? true : false,
              labels: {
                color: currentTheme === "dark" ? "white" : "black",
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
        },
      });
    }
  }, [marketData, selectedOption, currentTheme]);

  return (
    <div
      className={`
        w-full overflow-hidden rounded-lg shadow-lg
        ${isMultiple
          ? " dark:from-gray-800 dark:to-gray-900"
          : "bg-white dark:bg-gray-800"}
        border border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        hover:shadow-xl
      `}
    >
      <div className="w-full p-3">
        {marketData.status === "loading" && (
          <div className="flex flex-col justify-center items-center py-4">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full"
              role="status"
            ></div>
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {marketData.status === "error" && (
          <p className="text-red-600">
            {"An error occurred while fetching data for the chart."}
          </p>
        )}
        {marketData.status === "done" && (
          <>
            <canvas ref={chartRef} />
            {
              <div className="flex justify-center items-center gap-2 mt-2">
                {["24h", "7 days", "30 days", "3 months"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedOption === option
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200  hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            }
          </>
        )}
      </div>
    </div>
  );
};

MarketChart.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMultiple: PropTypes.bool,
};


export default MarketChart;
