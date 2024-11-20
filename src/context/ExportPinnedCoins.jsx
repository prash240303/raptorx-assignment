import { useContext } from "react";
import { MarketDataContext } from "./CoinDataContext"; 

const ExportPinnedCoins = () => {
  const { pinnedCoins } = useContext(MarketDataContext);

  const handleExport = () => {
    const data = JSON.stringify(pinnedCoins, null, 2); // Convert to JSON format with indentation
    const blob = new Blob([data], { type: "application/json" }); // Create a Blob from the JSON string
    const url = URL.createObjectURL(blob); 
    const a = document.createElement("a");
    a.href = url;
    a.download = "pinnedCoins.json";
    a.click(); 
    URL.revokeObjectURL(url); 
  };

  return (
    <button
      onClick={handleExport}
      className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
    >
      Export Pinned Coins to JSON
    </button>

  );
};

export default ExportPinnedCoins;
