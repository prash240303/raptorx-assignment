/* eslint-disable no-unused-vars */

import PropTypes from "prop-types";
import React, { createContext, useEffect, useState } from "react";

export const MarketDataContext = createContext();

export const CoinsDataProvider = ({ children }) => {
  const [marketData, setMarketData] = useState({
    data: [],
    status: "idle",
    error: null,
  });
  const [coins, setCoins] = useState({
    data: [],
    status: "idle",
    error: null,
  });
  const [pinnedCoins, setPinnedCoins] = useState([]);
  useEffect(() => {
    const getDataFromLocalStorage = () => {
      console.log("context fetch from local storage");
      const PinnedCoins = JSON.parse(localStorage.getItem("pinnedCoins") || "[]");
      setPinnedCoins(PinnedCoins);
      localStorage.setItem("pinnedCoins", JSON.stringify(PinnedCoins));

    };
    getDataFromLocalStorage();
  }, []);



  const updatePinnedCoins = (coin) => {
    console.log("running updatePinnedCoins");
    let list = JSON.parse(localStorage.getItem("pinnedCoins")) || pinnedCoins;
    if (!list.some((pinned) => pinned.id === coin.id)) {
      list.unshift(coin);
      setPinnedCoins(list);
      localStorage.setItem("pinnedCoins", JSON.stringify(list));
    }
  };

  return (
    <MarketDataContext.Provider
      value={{
        pinnedCoins,
        updatePinnedCoins,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
};


CoinsDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}