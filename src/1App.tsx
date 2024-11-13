import React, { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillCopy } from "react-icons/ai";

const Allpp: React.FC = () => {
  const [price, setPrice] = useState<string>("$0.00");
  const [volume, setVolume] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<number>(0);
  const [priceColor, setPriceColor] = useState<string>("text ");
  const [holders, setHolders] = useState<number>(0);

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

  const toggleDarkMode = () => setDarkMode(!darkMode);

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

      if (priceChange === "neutral") setPriceColor("text-black");
      else if (priceChange === "rising") setPriceColor("text-green-500");
      else setPriceColor("text-red-500");

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
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <button
        onClick={toggleDarkMode}
        className="absolute top-5 right-5 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <img
        className="w-[100px] sm:w-[120px] md:w-[150px] mb-5"
        src="./logo.jpg"
        alt="logo"
      />
      <div className="flex items-center">
        {priceColor === "text-black" ? (
          <div
            id="price"
            className={`text-[1.6rem]  sm:text-[3rem] md:text-[4rem] dark:text-white font-bold ${priceColor}`}
          >
            {price} / $1
          </div>
        ) : priceColor === "text-green-500" ? (
          <div className="flex flex-row items-center justify-center">
            <img
              className="w-4 sm:w-8 md:w-12 mr-3 "
              src="https://i.postimg.cc/SR3fSFxh/up.png"
              alt="down"
            />
            <div
              id="price"
              className={`text-[1.6rem]  sm:text-[3rem] md:text-[4rem] font-bold ${priceColor}`}
            >
              {price} / $1
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <img
              className="w-4 sm:w-8 md:w-12 mr-3 "
              src="https://i.postimg.cc/02zVLZyv/down.png"
              alt="down"
            />
            <div
              id="price"
              className={`text-[1.6rem]  sm:text-[3rem] md:text-[4rem] font-bold ${priceColor}`}
            >
              {price} / $1
            </div>
          </div>
        )}
      </div>
      <h1 className="text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] text-center my-5">
        Decentralized stable memecoin. However, it is currently de-pegged. It's
        simple, we just need to re-peg it back to $1.
      </h1>
      <div className="flex space-x-6">
        <a
          href="https://t.me/onedollarportal"
          className="flex justify-center items-center hover:cursor-pointer"
        >
          <FaTelegramPlane className="w-6 h-6 sm:w-10 sm:h-10 dark:text-white" />
        </a>
        <a
          href="https://x.com/1stablememecoin"
          className="flex justify-center items-center hover:cursor-pointer"
        >
          <FaXTwitter className="w-6 h-6 sm:w-10 sm:h-10 dark:text-white" />
        </a>
        <a
          href="https://drive.google.com/file/d/1-lRFjFz8uyh7O1pJW4yYPLo8sL0z8W7I/view?usp=sharing"
          className="flex justify-center items-center ml-4 hover:cursor-pointer"
        >
          <IoIosPaper className="w-6 h-6 sm:w-10 sm:h-10 dark:text-white" />
        </a>
        <a
          href="https://dexscreener.com/solana/guhisjwhmjbd6azumkknb8yxqj9qytfon4skum2hnepu"
          className="flex justify-center items-center hover:cursor-pointer"
        >
          <img
            className="w-8 sm:w-10"
            src={darkMode ? "./dex2.png" : "./dex1.png"}
            alt="dexscreener"
          />
        </a>
        <a
          href="https://www.dextools.io/app/en/solana/pair-explorer/GUhiSjWhMjbd6aZuMkKnb8Yxqj9qytFoN4sKUM2hNePU?t=1729109118417"
          className="flex items-center"
        >
          <img className="w-6 sm:w-8" src="./download.png" alt="dextools" />
        </a>
        <a
          href="https://www.coingecko.com/en/coins/1-dollar-sol-coin"
          className="flex justify-center items-center hover:cursor-pointer"
        >
          <img className="w-7 sm:w-9" src="./gecko.png" alt="coingecko" />
        </a>
      </div>
      <div
        className="flex justify-start items-center space-x-2 hover:cursor-pointer mt-5"
        onClick={() => copyCA()}
      >
        <AiFillCopy className="w-3 sm:w-4 md:w-5" />

        <div className="text-[0.5rem] md:text-[1.2rem] font-bold">
          4UTEFQjNMvfQF5NT8mVfXdMAKoL7hS7i9U4mMVAzpump
        </div>
      </div>
      <div className="flex space-x-4 mt-5">
        <div className="bg-gray-300 dark:bg-gray-700 p-2 sm:p-4 w-[80px] sm:w-[95px] md:w-[110px] rounded-md text-center ">
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            Holders
          </div>
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            [{holders}]
          </div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 p-2 sm:p-4 w-[80px] sm:w-[95px] md:w-[110px] rounded-md text-center  ">
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            Volume
          </div>
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            [{volume}]
          </div>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 p-2 sm:p-4 w-[80px] sm:w-[95px] md:w-[110px] rounded-md text-center truncate">
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            re-Pegg %
          </div>
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            [{((marketCap / 1000000000) * 100).toFixed(2)}%]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allpp;
