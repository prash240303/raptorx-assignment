import MarketChart from "./components/ChartMarket";
import CoinsList from "./components/CoinsList";
import "./App.css";

export default function App() {
  return (
    <main>
      <MarketChart coins={["bitcoin", "ethereum", "solana"]} isMultiple={true} />
      <div className="mt-4">
        <CoinsList />
      </div>
    </main>
  );
}
