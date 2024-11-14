"use-strict";

import { Triangle } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Accordion from "./components/accordion";
import useOutsideDetector from "./hooks/useOutsideDetector";
import { NavLink } from "./components/NavLink";
import { PriceDisplay } from "./components/PriceDisplay";
import { StatsDisplay } from "./components/StartDisplay";
import { ThemeToggle } from "./hooks/ThemeToggle";
import { Dropdown } from "./components/dropdown";
import { useEffect, useRef, useState } from "react";

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

  const dropdownRefs = {
    articles: useRef(null),
    charts: useRef(null),
    cn: useRef(null),
  };

  useOutsideDetector(
    [dropdownRefs.articles, dropdownRefs.charts, dropdownRefs.cn],
    () => setActive(0)
  );

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
          ? "text-black dark:text-gray-300"
          : priceData.priceChange === "rising"
          ? "text-green-500"
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
    <div className="flex flex-col items-center gap-6 p-6 font-b612 bg-white dark:bg-black min-h-screen">
      <nav className="sticky top-0 w-full max-w-6xl bg-inherit p-4 z-30">
        <div className="flex space-x-3 items-center justify-center">
          <div className="container flex justify-center items-center rounded-full border-black dark:border-white border-2 px-6 py-2">
            <div className="text-black dark:text-gray-300 text-lg truncate">
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
                  { href: "https://t.me/chinese1stablecoin", label: "文章 2" },
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

        <PriceDisplay price={price} priceColor={priceColor} />

        <div className="space-y-2">
          <div className="font-bold text-xl bg-box dark:bg-[#262626] dark:border-0 p-[10px_20px] rounded-sm border border-gray-300">
            {CONTRACT_ADDRESS}
          </div>
          <button
            onClick={copyCA}
            className="w-full text-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 italic transition-colors"
          >
            [Click to copy the contract address]
          </button>
        </div>

        <StatsDisplay
          holders={holders}
          marketCap={marketCap}
          volume={volume}
          priceColor={priceColor}
        />

        <div className="w-full my-10 bg-box dark:bg-[#262626] dark:border-0 rounded-md py-6 px-10 border border-gray-300">
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
  );
};

export default App;
