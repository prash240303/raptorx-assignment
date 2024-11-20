/* eslint-disable no-unused-vars */
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import api from "../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CoinsList = () => {
  const [coins, setCoins] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      const cacheKey = "coinsList";
      const cacheExpiry = 10 * 60 * 1000; // 10 minutes
      const cachedItem = localStorage.getItem(cacheKey);

      if (cachedItem) {
        const { data, timestamp } = JSON.parse(cachedItem);
        const currentTime = new Date().getTime();

        if (currentTime - timestamp < cacheExpiry) {
          setCoins(data);
          setStatus("done");
          return;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }
      try {
        setStatus("loading");
        const response = await api.get("/search/trending");
        const data = response.data.coins;
        const timestamp = new Date().getTime();

        localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp }));

        setCoins(data);
        setStatus("done");
      } catch (error) {
        setStatus("error");
        setError(error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="w-full border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out
        hover:shadow-xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white p-6  dark:bg-gray-700">
        Coins List
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-200 text-sm">
              <th className="py-3 px-6 text-left">Token</th>
              <th className="py-3 px-6 text-center">Symbol</th>
              <th className="py-3 px-6 text-center">Last Price</th>
              <th className="py-3 px-6 text-center">24H Change</th>
              <th className="py-3 px-6 text-center">Market Cap</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-gray-200">
            {status === "loading" && (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2">Loading...</span>
                  </div>
                </td>
              </tr>
            )}
            {status === "error" && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <p className="text-red-600">An error occurred while fetching data</p>
                </td>
              </tr>
            )}
            {status === "done" &&
              coins.map((coin) => (
                <tr
                  key={coin.item.coin_id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => navigate(`/Coin/${coin.item.id}`)}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify({
                        id: coin.item.id,
                        name: coin.item.name,
                        image: coin.item.large,
                        current_price: coin.item.data?.price,
                        price_change_percentage_24h:
                          coin.item.data?.price_change_percentage_24h.usd,
                        market_cap: coin.item.data?.market_cap,
                      })
                    )
                  }
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={coin.item.large} alt={coin.item.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{coin.item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div className="text-sm">{coin.item.symbol}</div>
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div className="text-sm">${coin.item.data?.price?.toFixed(2) || "N/A"}</div>
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div
                      className={`inline-flex items-center pl-2 pr-3 py-1 rounded-full text-sm font-medium ${coin.item.data?.price_change_percentage_24h?.usd >= 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {coin.item.data?.price_change_percentage_24h?.usd >= 0 ? (
                        <ArrowUp className="h-6 w-6 mr-1" />
                      ) : (
                        <ArrowDown className="h-6 w-6 mr-1" />
                      )}
                      {`${(coin.item.data?.price_change_percentage_24h?.usd || 0).toFixed(2)}%`}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div className="text-sm">{coin.item.data?.market_cap?.toLocaleString() || "N/A"}</div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinsList;
