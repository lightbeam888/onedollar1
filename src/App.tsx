import { TbTriangleFilled } from "react-icons/tb";
import { RxTriangleDown } from "react-icons/rx";
import Accordion from "./components/accordion";
import { useEffect, useRef, useState } from "react";
import useOutsideDetector from "./dropdown";

const App: React.FC = () => {
  const [price, setPrice] = useState<string>("$0.00");
  const [volume, setVolume] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<number>(0);
  const [priceColor, setPriceColor] = useState<string>("text ");
  const [holders, setHolders] = useState<number>(0);
  const [active, setActive] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );

  const odRef = useRef(null);
  const odRef_1 = useRef(null);
  const odRef_2 = useRef(null);
  // const odRef_3 = useRef(null);
  const handle = () => {
    setActive(0);
  };

  useOutsideDetector([odRef, odRef_1, odRef_2], handle);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const copyCA = () => {
    const ca = "4UTEFQjNMvfQF5NT8mVfXdMAKoL7hS7i9U4mMVAzpump";
    navigator.clipboard.writeText(ca).then(
      () => {
        alert("CA address copied!");
      },
      (err) => {
        console.error("Failed to copy CA address: ", err);
      }
    );
  };

  const updatePriceAndMarketCap = async () => {
    try {
      const response = await fetch(
        "https://new-onedollar-be.onrender.com/api/token-price"
      );
      const data = await response.json();
      const newPrice = parseFloat(data.currentPrice);
      const priceChange = data.priceChange;

      if (priceChange === "neutral")
        setPriceColor("text-black dark:text-gray-300");
      else if (priceChange === "rising") setPriceColor("text-green-500");
      else setPriceColor("text-green-500");

      setPrice(`$${newPrice.toFixed(8)}`);
      setVolume(data.volume);
      setMarketCap(data.marketCap);
    } catch (error) {
      console.error("Error fetching price and market cap:", error);
    }
  };

  // Function to fetch holders from the backend
  const findHolders = async () => {
    try {
      const response = await fetch(
        "https://new-onedollar-be.onrender.com/api/holders"
      );
      const data = await response.json();
      setHolders(data.holders);
    } catch (error) {
      console.error("Error fetching holders count:", error);
    }
  };

  useEffect(() => {
    const updateData = async () => {
      await updatePriceAndMarketCap();
      await findHolders(); // Fetch holders count from the backend
    };

    updateData();
    const interval = setInterval(updateData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center  gap-6 p-6 font-b612 bg-white dark:bg-black h-screen">
      <nav className="bg-inherit  p-4 z-30 flex flex-row gap-4 items-center">
        <div className="container  flex justify-between items-center rounded-full border-black dark:border-white border-2 px-6 py-2">
          <ul className="flex space-x-7">
            <div className=" text-black dark:text-gray-300 text-lg truncate">
              $1 stable memecoin
            </div>

            <li>
              <a
                className="text-black dark:text-gray-300 underline dark:underline underline-offset-1 hover:text-gray-400"
                href="https://x.com/1stablememecoin"
              >
                x
              </a>
            </li>
            <li>
              <a
                className="text-black dark:text-gray-300 underline underline-offset-1 hover:text-gray-400"
                href="https://t.me/onedollarportal"
              >
                telegram
              </a>
            </li>
            <li>
              <a
                className="text-black dark:text-gray-300 underline underline-offset-1 hover:text-gray-400"
                href="https://x.com/1stablememecoin"
              >
                blog
              </a>
            </li>

            <li>
              <a
                className="text-black dark:text-gray-300 underline underline-offset-1 hover:text-gray-400"
                href="#"
              >
                roadmap
              </a>
            </li>

            <div className="relative">
              <div
                className="flex flex-row items-center  text-black dark:text-gray-300 hover:text-gray-400 focus:outline-none hover:cursor-pointer"
                ref={odRef}
                onClick={() => setActive(active === 1 ? 0 : 1)}
              >
                articles
                <RxTriangleDown />
              </div>
              {active === 1 && (
                <ul className="absolute -right-[50%] bg-gray-300 bg-10 mt-2 rounded-md shadow-lg">
                  <li>
                    <a
                      className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600"
                      href="#"
                    >
                      Option 1
                    </a>
                  </li>
                  <li>
                    <a
                      className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600"
                      href="#"
                    >
                      Option 2
                    </a>
                  </li>
                  <li>
                    <a
                      className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600"
                      href="#"
                    >
                      Option 3
                    </a>
                  </li>
                </ul>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setActive(active === 2 ? 0 : 2)}
                ref={odRef_1}
                className="flex flex-row items-center  text-black dark:text-gray-300 hover:text-gray-400 focus:outline-none"
              >
                charts
                <RxTriangleDown />
              </button>
              {active == 2 && (
                <ul className="absolute -right-[50%] bg-gray-300 z-10 mt-2 rounded-md shadow-lg">
                  <li>
                    <a
                      className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600"
                      href="#"
                    >
                      Option 1
                    </a>
                  </li>
                  <li>
                    <a
                      className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600"
                      href="#"
                    >
                      Option 2
                    </a>
                  </li>
                  <li>
                    <a
                      className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600"
                      href="#"
                    >
                      Option 3
                    </a>
                  </li>
                </ul>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setActive(active === 3 ? 0 : 3)}
                ref={odRef_2}
                className="flex flex-row items-center  text-black dark:text-gray-300 hover:text-gray-400 focus:outline-none"
              >
                CN
                <RxTriangleDown />
              </button>
              {active === 3 && (
                <ul className="absolute -right-[50%] bg-gray-300 z-10 mt-2 rounded-md shadow-lg w-30">
                  <li>
                    <a
                      className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600 truncate"
                      href="#"
                    >
                      Option 1
                    </a>
                  </li>
                  <li>
                    <a
                      className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600"
                      href="#"
                    >
                      Option 2
                    </a>
                  </li>
                  <li>
                    <a
                      className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600"
                      href="#"
                    >
                      Option 3
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </ul>
        </div>

        <div className="flex flex-row border border-black dark:border-white hover:cursor-pointer">
          <div
            className="w-[10px] h-[18px] bg-black "
            onClick={() => setDarkMode(true)}
          ></div>
          <div
            className="w-[10px] h-[18px] bg-gray-300 "
            onClick={() => setDarkMode(false)}
          ></div>
        </div>
      </nav>
      <div className=" flex flex-col items-center justify-between gap-6 dark:text-gray-300">
        <div className="flex flex-col items-center justify-center">
          <div className="flex-wrap items-center justify-center">
            Decentralized stable memecoin. However, it is currently de - peged
          </div>
          <div>It's simple, we just need to re-peg it back to $1.00</div>
        </div>
        <div className="flex items-center">
          {priceColor === "text-black" ? (
            <div
              id="price"
              className={`text-[1rem]  sm:text-[2rem] md:text-[3rem] dark:text-gray-300 font-bold ${priceColor}`}
            >
              {price} / $1
            </div>
          ) : priceColor === "text-green-500" ? (
            <div className="flex flex-row items-center justify-center">
              <TbTriangleFilled className="text-base text-green-500" />
              <div
                id="price"
                className={`text-[1rem]  sm:text-[2rem] md:text-[3rem] font-bold text-green-500`}
              >
                {price} / $1
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center">
              <TbTriangleFilled className="text-base text-red-500 rotate-180 " />
              <div
                id="price"
                className={`text-[1rem]  sm:text-[2rem] md:text-[3rem] font-bold text-red-500`}
              >
                {price} / $1
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="font-bold roboto-bold text-xl bg-box dark:bg-[#262626] dark:border-0 p-[10px_20px] rounded-sm border border-gray-300">
            4UTEFQjNMvfQF5NT8mVfXdMAKoL7hS7i9U4mMVAzpump
          </div>

          <div
            className="text-center mt-2 text-gray-400 hover:cursor-pointer italic"
            onClick={() => copyCA()}
          >
            [Click to copy the contract address]
          </div>
        </div>

        <div className="flex space-x-8 mt-5">
          <div className="text-[0.8rem] py-2 px-3 border border-gray-300  font-mono bg-box dark:bg-[#262626] dark:border-0 rounded-sm sm:text-[1rem] md:text-[1.3rem] font-normal">
            holders [{(holders / 1000).toFixed(1)}k]
          </div>

          {priceColor === "text-black" ? (
            <div
              id="price"
              className={`text-[#000000] py-2 px-3 border border-gray-300 font-mono bg-box dark:bg-[#262626] dark:border-0 rounded-sm dark:text-gray-300 text-[0.8rem] sm:text-[1rem] md:text-[1.3rem] font-normal  ${priceColor}`}
            >
              <div className="text-black dark:text-white">re-peg status </div>[
              {((marketCap / 1000000000) * 100).toFixed(2)}%]
            </div>
          ) : priceColor === "text-green-500" ? (
            <div className="flex flex-row items-center justify-center py-2 px-3 border border-gray-300  font-mono rounded-sm truncate text-green-500 bg-green-200 dark:bg-[#003300ba] dark:border-0  text-[0.8rem] sm:text-[1rem]  font-normal md:text-[1.3rem]">
              <div className="text-black dark:text-white">
                re-peg status&nbsp;
              </div>
              <span className="text-black dark:text-white">[</span>
              {((marketCap / 1000000000) * 100).toFixed(2)}%
              <span className="text-black dark:text-white">]</span>
              <TbTriangleFilled className="text-xs text-green-500" />
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center">
              <div
                id="price"
                className={`py-2 px-3 border flex items-center space-x-1 border-gray-300  font-mono rounded-sm text-bl text-[0.8rem] text-red sm:text-[1rem] md:text-[1.3rem] font-normal bg-red-300`}
              >
                <span className="text-black dark:text-white">
                  re-peg status{" "}
                </span>
                [{((marketCap / 1000000000) * 100).toFixed(2)}
                ]%
                <TbTriangleFilled className="text-xs text-red-500 rotate-180" />
              </div>
            </div>
          )}

          <div className="text-[0.8rem] py-2 px-3 border border-gray-300  font-mono bg-box dark:bg-[#262626] dark:border-0 rounded-sm sm:text-[1rem] md:text-[1.3rem] font-normal ">
            marketCap [{Math.ceil(marketCap / 1000)}k]
          </div>

          <div className="text-[0.8rem] py-2 px-3 border border-gray-300  font-mono bg-box dark:bg-[#262626] dark:border-0 rounded-sm sm:text-[1rem] md:text-[1.3rem] font-normal ">
            Volume [{(volume / 1000).toFixed(1)}k]
          </div>
        </div>

        <div className="w-fzull my-10 bg-box dark:bg-[#262626] dark:border-0 rounded-md py-6 px-10 border border-gray-300">
          <Accordion
            clr={darkMode}
            title="$1?"
            content="stable coins right? this is at $0.00 so we all have to re-peg it back to trade like other stablecoins
"
          />

          <Accordion
            clr={darkMode}
            title="mintable?"
            content="0 authorities this is not usdc or usdt "
          />

          <Accordion
            clr={darkMode}
            title="$1 or other stablecoins?"
            content="yes"
          />

          <Accordion
            clr={darkMode}
            title="wen re-peg?"
            content="hodl & believe"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
