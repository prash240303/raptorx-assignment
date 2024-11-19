import MarketChart from "./components/ChartMarket";


export default function App() {
  return (
    <main>
      <MarketChart
        coins={["bitcoin", "ethereum", "solana"]}
        isMultiple={true}
      />
      <div className="flex mt-4 justify-center items-center border-2 border-gray-200 bg-gray-50 dark:border-slate-100 dark:bg-gray-900 rounded-md p-4">
        <div className="dark:bg-red-500 bg-yellow-400 p-5 border border-white">hi </div>
      </div>
    </main>
  );
}
