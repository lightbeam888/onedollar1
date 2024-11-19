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
import { FiMenu } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";

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
          ? "text-[#00A851]"
          : "text-[#FF1625]"
      );
      setPrice(`$${newPrice.toFixed(8)}`);
      setVolume(priceData.volume);
      setMarketCap(priceData.marketCap);
      setHolders(holdersData.holders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calc = (_price: any) => {
    let cnt = 0,
      f = 0;
    let str = _price.toString(),
      rlt = "$0.0[";
    for (let i = 3; i < str.length; i++) {
      if (str[i] !== "0" && !f) {
        rlt += cnt + "]";
        f = 1;
      }
      if (f) rlt += str[i];
      cnt++;
      console.log(rlt);
    }
    return rlt;
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
          <a
            href="https://drive.google.com/file/d/1-lRFjFz8uyh7O1pJW4yYPLo8sL0z8W7I/view?usp=sharing"
            className="flex items-center text-lg bg-box dark:bg-[#262626] border border-gray-300 rounded-sm px-4 py-1"
          >
            WhitePaper[
            <Triangle
              className="w-2 h-3 text-[#00A851] rotate-90"
              fill="currentColor"
            />
            ]
          </a>
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
                className={`w-5 h-3 text-orange-700 transition-all ${
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
              <FiMenu className="text-[1.2rem]" />
            </div>
          </div>
          <div className="py-4">
            <div className="text-center relative">
              <BsLightningFill className="text-yellow-600 absolute top-2 -left-4" />
              <div>[un]stable memecoin</div>
              <div>trading below $1.00</div>
            </div>
          </div>
          <a
            href="https://drive.google.com/file/d/1-lRFjFz8uyh7O1pJW4yYPLo8sL0z8W7I/view?usp=sharing"
            className="text-[0.8rem] flex justify-center items-center text-cs text-center text-black font-bold leading-6 py-2 px-4 bg-cs rounded-full"
          >
            whitepaper
            <Triangle
              className="w-2 h-3 ml-1 text-black rotate-90"
              fill="currentColor"
            />
          </a>
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
        <div className="bg-black py-4 w-full flex flex-col justify-center items-center">
          <div
            className={`flex justify-center items-center bg-opacity-50  rounded-sm text-white text-[1rem] p-1.5 ${
              priceColor !== "text-black" && priceColor === "text-[#00A851]"
                ? "bg-[#06402b] border border-[#00A851] "
                : "bg-[#FF162514] border border-[#FF162533]"
            }`}
          >
            <span className="text-white">$1-price </span> [
            <Triangle
              className={`w-2 h-3 ${
                priceColor !== "text-black" && priceColor === "text-[#00A851]"
                  ? "text-[#188d63]"
                  : "text-[#FF1625] rotate-180"
              }`}
              fill="currentColor"
            />
            ]
          </div>
          <div
            className={` py-4 text-[1.4rem] ${
              priceColor !== "text-white" && priceColor === "text-[#00A851]"
                ? "text-[#188d63]"
                : "text-[#FF1625]"
            }`}
          >
            {calc(price)} / $1
          </div>
          <div
            className={`flex justify-center items-center bg-opacity-50 rounded-sm text-white text-[1rem] p-1.5 ${
              priceColor !== "text-black" && priceColor === "text-[#00A851]"
                ? "bg-[#06402b] border border-green-950 "
                : "bg-[#FF162514] border border-[#FF162533]"
            }`}
          >
            <span className="text-white">re-peg status </span> [
            <div
              className={` ${
                priceColor !== "text-white" && priceColor === "text-[#00A851]"
                  ? "text-[#188d63]"
                  : "text-[#FF1625]"
              }`}
            >
              {((marketCap / 1000000000) * 100).toFixed(2)}%
            </div>
            ]
            <Triangle
              className={`w-2 h-3 ${
                priceColor !== "text-black" && priceColor === "text-[#00A851]"
                  ? "text-[#188d63]"
                  : "text-[#FF1625] rotate-180"
              }`}
              fill="currentColor"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center bg-black py-5">
          <div className=" truncate py-1 px-2 font-mono bg-[#FAD8CA] bg-opacity-10 dark:border-0 rounded-sm text-[1rem] font-light border-[0.5px] border-gray-400">
            market-cap [{`${Math.ceil(marketCap / 1000)}k`}]
          </div>
          <div className=" truncate py-1 px-2 font-mono bg-[#FAD8CA] bg-opacity-10 dark:border-0 rounded-sm text-[1rem] font-light my-4 border-[0.5px] border-gray-400">
            tdv [{`${(volume / 1000).toFixed(1)}k`}]
          </div>
          <div className=" truncate py-1 px-2 font-mono bg-[#FAD8CA] bg-opacity-10 dark:border-0 rounded-sm text-[1rem] font-light border-[0.5px] border-gray-400">
            holders [{`${(holders / 1000).toFixed(1)}k`}]
          </div>
        </div>
        <div
          className={`w-screen h-screen bg-black z-10 fixed transition-all duration-500 ${
            active1 === 2 ? "top-0 pt-20" : "-top-[100%]"
          }`}
          style={{ height: "calc(100vh - 150px)" }}
        >
          <div className="flex flex-col px-12">
            <a
              href="https://x.com/1stablememecoin"
              className="w-full flex justify-between gap- items-end border-b-2 border-white"
            >
              <RiTwitterXFill className="text-[1.5rem]" />

              <GoArrowUpRight className="text-[1.5rem]" />
            </a>
            <div className="flex-1 w-full justify-between items-center">
              <a
                href="https://t.me/onedollarportal"
                className=" w-full py-2 border-b-2 border-white flex justify-between items-end"
              >
                <div className="flex justify-start gap-2">
                  <TbBrandTelegram className="text-[1.5rem]" />
                  <span>telegram</span>
                </div>
                <GoArrowUpRight className="text-[1.5rem]" />
              </a>
              <a
                href="https://www.coingecko.com/en/coins/1-dollar-sol-coin"
                className="w-full py-2 border-b-2 border-white flex justify-between items-end"
              >
                <div className=" flex justify-center items-center rounded-full">
                  <img
                    className="text-white w-6 rounded-full"
                    src="./gecko.png"
                    alt="gecko"
                  />
                  <span className="text-[0.8rem] ml-2 leading-5">
                    Coingecko
                  </span>
                </div>
                <GoArrowUpRight className="text-[1.5rem]" />
              </a>
              <a
                href="https://dexscreener.com/solana/guhisjwhmjbd6azumkknb8yxqj9qytfon4skum2hnepu"
                className="w-full py-2 border-b-2 border-white flex justify-between items-end"
              >
                <div className="flex justify-start items-center gap-2">
                  <img className="w-6 h-8" src="./dex.svg" />
                  <span>dexscreener</span>
                </div>
                <GoArrowUpRight className="text-[1.5rem]" />
              </a>
              <a
                href="https://www.dextools.io/app/en/solana/pair-explorer/GUhiSjWhMjbd6aZuMkKnb8Yxqj9qytFoN4sKUM2hNePU?t=1729109118417"
                className="w-full py-2 border-b-2 border-white flex justify-between items-end"
              >
                <div className="flex justify-start items-center gap-2">
                  <img className="w-6" src="./dextools-social-preview.png" />
                  <span>dextools</span>
                </div>
                <GoArrowUpRight className="text-[1.5rem]" />
              </a>
              <a
                href="#"
                className="w-full py-2 border-b-2 border-white flex justify-between items-end"
              >
                <div className="flex justify-start items-center gap-2">
                  <BsMedium className="text-[1.5rem]" />
                  <span>blog [medium]</span>
                </div>
                <GoArrowUpRight className="text-[1.5rem]" />
              </a>
              <a
                href="#"
                className="w-full py-2 border-b-2 border-white flex justify-between items-end"
              >
                <div className="text-[1rem]">roadmap</div>
                <GoArrowUpRight className="text-[1.5rem]" />
              </a>
              <a
                href="#"
                className="w-full py-2 border-b-2 border-white text-white flex justify-between items-end"
              >
                <div className="text-[1rem]">articles</div>
                <GoArrowUpRight className="text-[1.5rem]" />
              </a>
            </div>
          </div>
        </div>
        <div
          className={`w-screen h-screen bg-black pb-[300px]  fixed transition-all duration-500 ${
            active1 === 1 ? "top-20" : "-top-[100%]"
          }`}
          style={{ height: "calc(100vh - 250px)" }}
        >
          <div className="flex flex-col">
            <div className="text-white text-[0.6rem] sm:[1.2rem] text-center px-6">
              please verify the contract address is verified on jupiter before
              swapping.
            </div>
            <div className="flex-1 height-0 w-full py-4">
              <div className="flex flex-col justify-center items-center px-12">
                <a
                  href="#"
                  className="flex justify-between items-center w-full border-b-2 border-white pt-2"
                >
                  <div className="flex justify-start items-center">
                    <img className="w-10" src="./jupiter.png" alt="jupiter" />
                    <span className="tracking-[0.3rem]">Jupiter</span>
                  </div>
                  <GoArrowUpRight className="text-[1.5rem]" />
                </a>
                <a
                  href="#"
                  className=" flex justify-between items-center w-full py-2"
                >
                  <img src="./ray.png" className="w-36 pl-1" />
                  <GoArrowUpRight className="text-[1.5rem]" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#222222] dark:border-0 rounded-md py-6 px-10 border-0 sm:border border-gray-300">
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
                  "the [un]stable memecoin that needs to be re-pegged back.",
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
      </div>
    </>
  );
};

export default App;
