import PropTypes from "prop-types"
import Header from "./components/Header"
import WatchList from "./components/PinnedCoinsList"
import ExportPinnedCoins from "./context/ExportPinnedCoins"

const MyLayout = ({ children }) => {
  return (
    <div className="min-h-screen geist-regular flex flex-col">
      <div className="sticky geist-regular top-0 z-10">
        <Header />
      </div>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 lg:px-1 pb-4 pt-4">
        <div className="lg:col-span-2 lg:px-2">{children}</div>
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 flex flex-col gap-2 lg:pr-4">
            <WatchList />
            <div className="mt-4 text-center">
              <ExportPinnedCoins />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

MyLayout.propTypes = {
  children: PropTypes.node,
}

export default MyLayout