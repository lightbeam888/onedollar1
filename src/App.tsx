"use-strict";

import { Triangle } from "lucide-react";
import Accordion from "./components/accordion";
import useOutsideDetector from "./hooks/useOutsideDetector";
import { NavLink } from "./components/NavLink";
import { PriceDisplay } from "./components/PriceDisplay";
import { StatsDisplay } from "./components/StartDisplay";
import { ThemeToggle } from "./hooks/ThemeToggle";
import { Dropdown } from "./components/dropdown";
import { useEffect, useRef, useState } from "react";
import { BsLightningFill, BsMedium } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { TbBrandTelegram } from "react-icons/tb";
import useOutside from "./useOutside";

const BACKEND_URL = "https://new-onedollar-be.onrender.com/api";
const CONTRACT_ADDRESS = "4UTEFQjNMvfQF5NT8mVfXdMAKoL7hS7i9U4mMVAzpump";

interface TokenData {
  currentPrice: string;
  priceChange: "neutral" | "rising" | "falling";
  volume: number;
  marketCap: number;
}

const App: React.FC = () => {
  const [price, setPrice] = useState<string>("$0.00");
  const [volume, setVolume] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<number>(0);
  const [priceColor, setPriceColor] = useState<string>(
    "text-black dark:text-gray-300"
  );
  const [holders, setHolders] = useState<number>(0);
  const [active, setActive] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );
  const [active1, setActive1] = useState<number>(0);

  const dropdownRefs = {
    articles: useRef(null),
    charts: useRef(null),
    cn: useRef(null),
  };
  const menuRef = useRef(null);
  const arrowRef = useRef(null);
  useOutsideDetector(
    [dropdownRefs.articles, dropdownRefs.charts, dropdownRefs.cn],
    () => setActive(0)
  );
  useOutside([menuRef, arrowRef], () => setActive1(0));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      alert("CA address copied!");
    } catch (err) {
      console.error("Failed to copy CA address: ", err);
    }
  };

  const fetchData = async () => {
    try {
      const [priceResponse, holdersResponse] = await Promise.all([
        fetch(`${BACKEND_URL}/token-price`),
        fetch(`${BACKEND_URL}/holders`),
      ]);

      const priceData: TokenData = await priceResponse.json();
      const holdersData = await holdersResponse.json();

      const newPrice = parseFloat(priceData.currentPrice);

      setPriceColor(
        priceData.priceChange === "neutral"
          ? "text-black"
          : priceData.priceChange === "rising"
          ? "text-green-300"
          : "text-red-500"
      );
      setPrice(`$${newPrice.toFixed(8)}`);
      setVolume(priceData.volume);
      setMarketCap(priceData.marketCap);
      setHolders(holdersData.holders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hidden sm:flex flex-col items-center gap-6 p-6 font-b612 bg-white dark:bg-black min-h-screen">
        <nav className="sticky top-0 w-full max-w-5xl bg-inherit p-4 z-30">
          <div className="flex space-x-3 items-center justify-center">
            <div className="container flex justify-center items-center rounded-full border-black dark:border-white border-2 px-2 py-2">
              <div className="text-black dark:text-gray-300 mr-3 text-lg truncate">
                $1 stable memecoin
              </div>

              <ul className="flex items-center space-x-7">
                <NavLink href="https://x.com/1stablememecoin" label="x" />
                <NavLink href="https://t.me/onedollarportal" label="telegram" />
                <NavLink href="https://x.com/1stablememecoin" label="blog" />
                <NavLink href="#" label="roadmap" />

                <Dropdown
                  ref={dropdownRefs.articles}
                  isActive={active === 1}
                  onToggle={() => setActive(active === 1 ? 0 : 1)}
                  label="articles"
                  items={[
                    {
                      href: "https://x.com/1stablememecoin/status/1855347853155332335",
                      label: "article 1",
                    },
                    {
                      href: "https://x.com/1stablememecoin/status/1855359544618291489",
                      label: "article 2",
                    },
                  ]}
                />

                <Dropdown
                  ref={dropdownRefs.charts}
                  isActive={active === 2}
                  onToggle={() => setActive(active === 2 ? 0 : 2)}
                  label="charts"
                  items={[
                    {
                      href: "https://dexscreener.com/solana/guhisjwhmjbd6azumkknb8yxqj9qytfon4skum2hnepu",
                      label: "dexscreener",
                    },
                    {
                      href: "https://www.dextools.io/app/en/solana/pair-explorer/GUhiSjWhMjbd6aZuMkKnb8Yxqj9qytFoN4sKUM2hNePU",
                      label: "dextools",
                    },
                    {
                      href: "https://www.coingecko.com/en/coins/1-dollar-sol-coin",
                      label: "Coingecko",
                    },
                  ]}
                />

                <Dropdown
                  ref={dropdownRefs.cn}
                  isActive={active === 3}
                  onToggle={() => setActive(active === 3 ? 0 : 3)}
                  label="CN"
                  items={[
                    { href: "https://x.com/1stablecoinCN", label: "文章 1" },
                    {
                      href: "https://t.me/chinese1stablecoin",
                      label: "文章 2",
                    },
                  ]}
                />
              </ul>
            </div>

            <ThemeToggle darkMode={darkMode} onToggle={setDarkMode} />
          </div>
        </nav>

        <main className="flex flex-col items-center justify-between gap-6 dark:text-gray-300 max-w-4xl">
          <div className="text-center space-y-2">
            <p>
              Decentralized stable memecoin. However, it is currently de-peged
            </p>
            <p>It's simple, we just need to re-peg it back to $1.00</p>
          </div>
          <div className="flex items-center text-lg bg-box dark:bg-[#262626] border border-gray-300 rounded-sm px-4 py-1">
            WhitePaper[
            <Triangle
              className="w-2 h-3 text-green-300 rotate-90"
              fill="currentColor"
            />
            ]
          </div>
          <PriceDisplay price={price} priceColor={priceColor} />

          <div className="mb-6 hover:cursor-pointer" onClick={() => copyCA()}>
            <div className="flex items-center bg-box dark:bg-[#262626] dark:border-0 p-[10px_20px] rounded-sm border border-gray-300">
              <span className="text-base mr-10">copy contract</span>
              <span className="font-bold text-xl">{CONTRACT_ADDRESS}</span>
            </div>
          </div>

          <StatsDisplay
            holders={holders}
            marketCap={marketCap}
            volume={volume}
            priceColor={priceColor}
          />
          <div className="flex justify-center text-xl text-black font-bold dark:text-white">
            faQs
          </div>
          <div className="w-full bg-box dark:bg-[#262626] dark:border-0 rounded-md py-6 px-10 border border-gray-300">
            <Accordion
              darkmode={darkMode}
              items={[
                {
                  title: "$1?",
                  content:
                    "stable coins right? this is at $0.00 so we all have to re-peg it back to trade like other stablecoins",
                },
                {
                  title: "mintable?",
                  content: "0 authorities this is not usdc or usdt",
                },
                {
                  title: "$1 or other stablecoins?",
                  content: "yes",
                },
                {
                  title: "wen re-peg?",
                  content: "hodl & believe",
                },
              ]}
            />
          </div>
        </main>
      </div>
      <div className="sm:hidden w-screen min-h-screen bg-black text-white font-b612">
        <div className="px-6 py-4 flex flex-col justify-center items-center">
          <div className="flex items-center justify-between bg-black py-2 px-6 border border-white rounded-full w-full z-[100]">
            <div className="text-[1.2rem]">$1</div>
            <div
              className="flex ml-[6px]"
              ref={arrowRef}
              onClick={() => setActive1(active1 === 1 ? 0 : 1)}
            >
              <Triangle
                className={`w-5 h-3 text-[#188d63] transition-all ${
                  active1 === 1 ? "" : "rotate-180"
                }`}
                fill="currentColor"
              />
            </div>
            <div
              className="text-[0.8rem]"
              ref={menuRef}
              onClick={() => setActive1(active1 === 2 ? 0 : 2)}
            >
              menu
            </div>
          </div>
          <div className="py-4">
            <div className="text-center relative">
              <BsLightningFill className="text-yellow-600 absolute top-2 -left-4" />
              <div>[un]stable memecoin</div>
              <div>trading below $1.00</div>
            </div>
          </div>
          <div className="text-[0.8rem] flex justify-center items-center text-cs text-center text-black font-bold leading-6 py-2 px-4 bg-cs rounded-full">
            whitepaper[
            <Triangle
              className="w-2 h-3 text-yellow-800 rotate-90"
              fill="currentColor"
            />
            ]
          </div>
          <div className=" text-center text-[1rem] my-4">
            <div>4UTEFQjNMvfQF5NT8mVfX</div>
            <div>dMAKoL7hS7i9U4mMVAzpump</div>
          </div>
          <div
            className="text-gray-500 text-[0.6rem] italic"
            onClick={() => copyCA()}
          >
            [tap to copy contract address]
          </div>
        </div>
        <div className="bg-gray-800 pt-4 pb-10 w-full flex flex-col justify-center items-center">
          <div
            className={`flex justify-center items-center bg-opacity-60 border rounded-sm text-white text-[1rem] p-3 ${
              priceColor !== "text-black" && priceColor === "text-green-300"
                ? "bg-[#06402b] border-green-950 "
                : "bg-red-800"
            }`}
          >
            <span
              className={` ${
                priceColor !== "text-white" && priceColor === "text-green-300"
                  ? "text-[#188d63]"
                  : "text-red-500"
              }`}
            >
              $1-price{" "}
            </span>{" "}
            [
            <Triangle
              className={`w-2 h-3 ${
                priceColor !== "text-black" && priceColor === "text-green-300"
                  ? "text-[#188d63]"
                  : "text-red-500"
              }`}
              fill="currentColor"
            />
            ]
          </div>
          <div
            className={` ${
              priceColor !== "text-white" && priceColor === "text-green-300"
                ? "text-[#188d63]"
                : "text-red-500"
            }`}
          >
            {price} / $1
          </div>
          <div
            className={`flex justify-center items-center bg-opacity-60 border rounded-sm text-white text-[1rem] p-3 ${
              priceColor !== "text-black" && priceColor === "text-green-300"
                ? "bg-[#06402b] border-green-950 "
                : "bg-red-800"
            }`}
          >
            <span
              className={` ${
                priceColor !== "text-white" && priceColor === "text-green-300"
                  ? "text-[#188d63]"
                  : "text-red-500"
              }`}
            >
              re-peg status{" "}
            </span>{" "}
            [
            <div
              className={` ${
                priceColor !== "text-white" && priceColor === "text-green-300"
                  ? "text-[#188d63]"
                  : "text-red-500"
              }`}
            >
              {((marketCap / 1000000000) * 100).toFixed(2)}
            </div>
            ]
            <Triangle
              className={`w-2 h-3 ${
                priceColor !== "text-black" && priceColor === "text-green-300"
                  ? "text-[#188d63]"
                  : "text-red-500"
              }`}
              fill="currentColor"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-5">
          <div className=" truncate py-1 px-2 border border-gray-300 font-mono bg-[#262626] dark:border-0 rounded-sm text-[1.3rem] font-normal">
            market-cap [{`${Math.ceil(marketCap / 1000)}k`}]
          </div>
          <div className=" truncate py-1 px-2 border border-gray-300 font-mono bg-[#262626] dark:border-0 rounded-sm text-[1.3rem] font-normal my-4">
            tdv [{`${(volume / 1000).toFixed(1)}k`}]
          </div>
          <div className=" truncate py-1 px-2 border border-gray-300 font-mono bg-[#262626] dark:border-0 rounded-sm text-[1.3rem] font-normal">
            holders [{`${(holders / 1000).toFixed(1)}k`}]
          </div>
        </div>
        <div className="w-full bg-box dark:bg-[#262626] dark:border-0 rounded-md py-6 px-10 border border-gray-300">
          <div className="flex justify-start items-center">
            <Triangle
              className="w-3 h-3 mr-2 text-blue-600 rotate-90"
              fill="currentColor"
            />
            <span>faQ</span>
          </div>

          <Accordion
            darkmode={darkMode}
            items={[
              {
                title: "$1?",
                content:
                  "stable coins right? this is at $0.00 so we all have to re-peg it back to trade like other stablecoins",
              },
              {
                title: "mintable?",
                content: "0 authorities this is not usdc or usdt",
              },
              {
                title: "$1 or other stablecoins?",
                content: "yes",
              },
              {
                title: "wen re-peg?",
                content: "hodl & believe",
              },
            ]}
          />
        </div>
        <div
          className={`w-screen h-screen bg-black z-10 fixed transition-all duration-500 ${
            active1 === 2 ? "top-20" : "-top-[100%]"
          }`}
        >
          <div className="flex flex-col h-screen">
            <a
              href="https://x.com/1stablememecoin"
              className="p-8 w-full flex justify-center"
            >
              <RiTwitterXFill className="text-[2rem]" />
            </a>
            <div className="flex-1 height-0 w-full bg-slate-700 bg-opacity-40 justify-between items-center">
              <a
                href="https://t.me/onedollarportal"
                className="p-2 w-full  flex justify-center"
              >
                <TbBrandTelegram className="text-[3rem]" />
              </a>
              <a
                href="https://www.coingecko.com/en/coins/1-dollar-sol-coin"
                className="p-1 w-full flex justify-center"
              >
                <div className="w-9 flex justify-center items-center gap-1 rounded-full">
                  <img
                    className="text-white w-auto rounded-full"
                    src="./gecko.png"
                    alt="gecko"
                  />
                  <span>Coingecko</span>
                </div>
              </a>
              <a
                href="https://dexscreener.com/solana/guhisjwhmjbd6azumkknb8yxqj9qytfon4skum2hnepu"
                className="p-1 w-full flex justify-center"
              >
                <img className="w-10 h-12" src="./dex.png" />
              </a>
              <a
                href="https://www.dextools.io/app/en/solana/pair-explorer/GUhiSjWhMjbd6aZuMkKnb8Yxqj9qytFoN4sKUM2hNePU?t=1729109118417"
                className="p-1 w-full flex justify-center"
              >
                <img className="w-10 h-12" src="./download.png" />
              </a>
              <a href="#" className="p-1 w-full flex justify-center">
                <BsMedium className="text-[3rem]" />
              </a>
              <a href="#" className="p-1 w-full flex justify-center">
                <div className="text-[1.4rem]">roadmap</div>
              </a>
              <a href="#" className="p-1 w-full text-white text-center">
                <div className="text-[2rem]">articles</div>
                <div className="text-[0.4rem]">
                  go to our X profile and check the article tab section
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          className={`w-screen h-screen bg-black z-10 fixed transition-all duration-500 ${
            active1 === 1 ? "top-20" : "-top-[100%]"
          }`}
        >
          <div className="flex flex-col h-screen">
            <div className="text-white text-[0.6rem] sm:[1.2rem] text-center px-3">
              please verify the contracty address is verified on jupiter before
              swpping.
            </div>
            <div className="flex-1 height-0 w-full py-4 bg-slate-700 bg-opacity-40">
              <div className="flex flex-col justify-center items-center">
                <a href="#" className="w-12 flex justify-center ">
                  <img src="./jupiter.png" />
                </a>
                <a href="#" className="w-1/3 flex justify-center mt-4">
                  <img src="./raydium.png" className="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
