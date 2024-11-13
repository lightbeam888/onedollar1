import { TbTriangleFilled } from "react-icons/tb";
import { RxTriangleDown } from "react-icons/rx";
import Accordion from "./components/accordion";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [price, setPrice] = useState<string>("$0.00");
  const [volume, setVolume] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<number>(0);
  const [priceColor, setPriceColor] = useState<string>("text ");
  const [holders, setHolders] = useState<number>(0);
  const [articleIsOpen, setArticleIsOpen] = useState<boolean>(false);
  const [chartIsOpen, setChartIsOpen] = useState<boolean>(false);
  const [cnIsOpen, setCnIsOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );

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
    <div className="flex flex-col items-center  gap-6 p-6 font-b612 bg-gray-300 dark:bg-slate-900 h-screen">
      <nav className="bg-inherit  p-4 z-30 flex flex-row gap-4 items-center">
        <div className="container  flex justify-between items-center rounded-full border-black border-2 px-6 py-2">
          <ul className="flex space-x-7">
            <div className=" text-black dark:text-gray-300 text-lg truncate">
              $1 stable memecoin
            </div>

            <li>
              <a
                className="text-black dark:text-gray-300 underline underline-offset-1 hover:text-gray-400"
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
              <button
                onClick={() => setArticleIsOpen(!articleIsOpen)}
                className="flex flex-row items-center  text-black dark:text-gray-300 hover:text-gray-400 focus:outline-none"
              >
                articles
                <RxTriangleDown />
              </button>
              {articleIsOpen && (
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
                onClick={() => setChartIsOpen(!chartIsOpen)}
                className="flex flex-row items-center  text-black dark:text-gray-300 hover:text-gray-400 focus:outline-none"
              >
                charts
                <RxTriangleDown />
              </button>
              {chartIsOpen && (
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
                onClick={() => setCnIsOpen(!cnIsOpen)}
                className="flex flex-row items-center  text-black dark:text-gray-300 hover:text-gray-400 focus:outline-none"
              >
                CN
                <RxTriangleDown />
              </button>
              {cnIsOpen && (
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
          </ul>
        </div>

        <div className="flex flex-row">
          <div
            className="w-[20px] h-[30px] bg-black hover:cursor-pointer "
            onClick={() => setDarkMode(true)}
          ></div>
          <div
            className="w-[20px] h-[30px] bg-gray-300 border-black border-2 hover:cursor-pointer "
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
          {priceColor === "text-black dark:text-gray-300" ? (
            <div
              id="price"
              className={`text-[1rem]  sm:text-[2rem] md:text-[3rem] dark:text-gray-300 font-bold ${priceColor}`}
            >
              {price} / $1
            </div>
          ) : priceColor === "text-green-500" ? (
            <div className="flex flex-row items-center justify-center">
              <TbTriangleFilled className="text-base text-green-500" />
              {/* <img
                className="w-4 sm:w-6 md:w-8 mr-3 "
                src="https://i.postimg.cc/SR3fSFxh/up.png"
                alt="down"
              /> */}
              <div
                id="price"
                className={`text-[1rem]  sm:text-[2rem] md:text-[3rem] font-bold ${priceColor}`}
              >
                {price} / $1
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center">
              <TbTriangleFilled className="text-base text-green-500" />
              <div
                id="price"
                className={`text-[1rem]  sm:text-[2rem] md:text-[3rem] font-bold ${priceColor}`}
              >
                {price} / $1
              </div>
            </div>
          )}
        </div>

        <div
          className="font-bold roboto-bold text-xl hover:cursor-pointer"
          onClick={() => copyCA()}
        >
          4UTEFQjNMvfQF5NT8mVfXdMAKoL7hS7i9U4mMVAzpump
        </div>

        <div className="flex space-x-8 mt-5">
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.1rem]">
            holders [{holders}]
          </div>

          {priceColor === "text-black dark:text-gray-300" ? (
            <div
              id="price"
              className={`text-[#000000] dark:text-gray-300 text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] font-bold ${priceColor}`}
            >
              re-peg status [
              <span className="text-green-500">
                {((marketCap / 1000000000) * 100).toFixed(2)}%
              </span>
              ]
            </div>
          ) : priceColor === "text-green-500" ? (
            <div className="flex-wrap flex flex-row items-center justify-center">
              <div
                id="price"
                className={`truncate text-[#000000] dark:text-gray-300 text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] `}
              >
                re-peg status&nbsp;
              </div>
              <div className="flex flex-row items-center justify-center">
                [
                <span className="text-green-500">
                  {((marketCap / 1000000000) * 100).toFixed(2)}%
                </span>
                ]
                <TbTriangleFilled className="text-xs text-green-500" />
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center">
              <div
                id="price"
                className={`text-neutral-950 text-bl text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] `}
              >
                re-peg status [
                <span className="text-green-500">
                  {((marketCap / 1000000000) * 100).toFixed(2)}%
                </span>
                ]
              </div>
              <TbTriangleFilled className="text-xs text-green-500" />
            </div>
          )}

          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            marketCap [{marketCap}]
          </div>

          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            Volume [{volume}]
          </div>
        </div>

        <div className="w-full mt-10">
          <Accordion
            title="$1?"
            content="Lorem ipsum dolcvve magna aliqua. Ut"
          />

          <Accordion
            title="mintable?"
            content="Lorem ipsum dolcvve magna aliqua. Ut"
          />

          <Accordion
            title="liquidity burned?"
            content="Lorem ipsum dolcvve magna aliqua. Ut"
          />

          <Accordion
            title="wen re-peg"
            content="Lorem ipsum dolcvve magna aliqua. Ut"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
