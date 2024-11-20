"use client";
import { MarketDataContext } from "../context/CoinDataContext";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PinnedCoinsList = () => {
  const { pinnedCoins, updatePinnedCoins } = useContext(MarketDataContext);

  useEffect(() => { }, [pinnedCoins]);

  const navigate = useNavigate();

  return (
    <div
      className="w-full border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-lg rounded-lg overflow-hidden"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const incomingCoin = JSON.parse(e.dataTransfer.getData("text/plain"));
        updatePinnedCoins(incomingCoin);
      }}
    >
      {pinnedCoins && pinnedCoins.length > 0 ? (
        <>
          <h1 className="text-base font-bold text-center md:text-left text-gray-800 dark:text-gray-200">
            Pinned Coins
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full mt-3">
              <thead>
                <tr className="text-gray-500 dark:text-gray-300 uppercase leading-normal border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left text-xs font-medium pb-1">Token</th>
                  <th className="text-center text-xs font-medium pb-1">
                    Last Price
                  </th>
                  <th className="text-center text-xs font-medium pb-1">
                    24H Change
                  </th>
                  <th className="text-center text-xs font-medium pb-1">
                    Market Cap
                  </th>
                </tr>
              </thead>
              <tbody>
                {pinnedCoins.map((coin) => (
                  <tr
                    key={coin.coin_id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-200"
                    onClick={() => navigate(`/Coin/${coin.id}`)}
                  >
                    <td className="py-2 pl-1">
                      <div className="flex flex-row items-center min-w-28">
                        <img
                          className="h-5 w-5 rounded-full object-fill"
                          src={coin.image}
                          alt={coin.name}
                        />
                        <p className="ml-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                          {coin.name}
                        </p>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
                        {coin.current_price.toFixed(2)}
                      </p>
                    </td>
                    <td className="py-2 px-3">
                      <p
                        className={`text-sm font-medium text-center flex justify-center items-center gap-1 ${coin.price_change_percentage_24h >= 0
                            ? "text-green-500 dark:text-green-400"
                            : "text-red-500 dark:text-red-400"
                          }`}
                      >
                        <span>
                          {coin.price_change_percentage_24h >= 0 ? (
                            <ArrowUp />
                          ) : (
                            <ArrowDown />
                          )}
                        </span>
                        <span>{`${(
                          coin.price_change_percentage_24h || 0
                        ).toFixed(2)}%`}</span>
                      </p>
                    </td>
                    <td className="py-2 px-3">
                      <p className="text-sm font-medium text-center text-gray-800 dark:text-gray-100">
                        {coin.market_cap || "N/A"}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-gray-800 dark:text-gray-200 min-h-[200px] flex text-center items-center justify-center">
          Drag and drop coins here to pin them to your list
          </div>
      )}
    </div>
  );
};

export default PinnedCoinsList;
