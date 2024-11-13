import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [price, setPrice] = useState<string>("$0.00");
  const [holders, setHolders] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<number>(0);
  const [priceColor, setPriceColor] = useState<string>("black");

  const apiUrl = "http://localhost:5000"; // Your backend URL

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

  const getPrice = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/price`);
      const data = await response.json();
      return data; // Returns { price, k }
    } catch (error) {
      console.error("Error fetching price:", error);
      return { price: "0.00", k: 0 }; // Fallback value
    }
  };

  const updatePrice = async () => {
    const previousPrice = parseFloat(price.replace("$", ""));
    const { price: newPrice, k } = await getPrice(); // Get price and k from backend

    if (k === 1) {
      setPriceColor("text-green-500");
    } else if (k === 0 && parseFloat(newPrice) < previousPrice) {
      setPriceColor("text-red-500");
    } else {
      setPriceColor("text-black");
    }

    setPrice(`$${newPrice}`);
    await findHolders();
    await getVolumeAndMarketCap();
  };

  const findHolders = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/holders`);
      const data = await response.json();
      setHolders(data.holders);
    } catch (error) {
      console.error("Error fetching holders:", error);
    }
  };

  const getVolumeAndMarketCap = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/volume-marketcap`);
      const data = await response.json();
      setVolume(data.volume);
      setMarketCap(data.marketCap);
    } catch (error) {
      console.error("Error fetching volume and market cap:", error);
    }
  };

  useEffect(() => {
    updatePrice();
    const interval = setInterval(updatePrice, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <img
        className="w-[100px] sm:w-[120px] md:w-[150px] mb-5"
        src="https://dd.dexscreener.com/ds-data/tokens/solana/4UTEFQjNMvfQF5NT8mVfXdMAKoL7hS7i9U4mMVAzpump.png?size=lg&key=42fe20"
        alt="logo"
      />
      <div className="flex items-center">
        {priceColor === "text-black" ? (
          <></>
        ) : priceColor === "text-green-500" ? (
          <img
            className="w-4 sm:w-8 md:w-12 mr-3"
            src="https://i.postimg.cc/SR3fSFxh/up.png"
            alt="up"
          />
        ) : (
          <img
            className="w-4 sm:w-8 md:w-12 mr-3"
            src="https://i.postimg.cc/02zVLZyv/up.png"
            alt="down"
          />
        )}

        <div
          id="price"
          className={`text-[1.6rem]  sm:text-[3rem] md:text-[4rem] font-bold ${priceColor}`}
        >
          {price} / $1
        </div>
      </div>
      <h1 className="text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] text-center my-5">
        Decentralized stable memecoin. However, it is currently de-pegged. It's
        simple, we just need to repegg it back to $1.
      </h1>
      <div className="flex space-x-6">
        <a
          href="https://t.me/onedollarportal"
          className="flex justify-center items-center hover:cursor-pointer"
        >
          <img
            src="https://cdn.icon-icons.com/icons2/3186/PNG/512/telegram_icon_194153.png"
            alt="Telegram"
            className="w-6 sm:w-8"
          />
        </a>
        <a
          href="https://x.com/onedollarcto"
          className="flex justify-center items-center hover:cursor-pointer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg"
            alt="X"
            className="w-6 sm:w-8"
          />
        </a>
        <a
          href="https://drive.google.com/file/d/1-lRFjFz8uyh7O1pJW4yYPLo8sL0z8W7I/view?usp=sharing"
          className="flex justify-center items-center ml-4 hover:cursor-pointer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Simpleicons_Business_note-black-symbol-variant.svg"
            alt="whitepaper"
            className="w-6 sm:w-8"
          />
        </a>
        <a
          href="https://dexscreener.com/solana/guhisjwhmjbd6azumkknb8yxqj9qytfon4skum2hnepu"
          className="flex justify-center items-center hover:cursor-pointer"
        >
          <img
            className="w-8 sm:w-10"
            src="https://cdn.prod.website-files.com/6421d264d066fd2b24b91b20/661375b92a7e161501f4b5e5_dexscreener.322a5a2d.png"
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
        <img
          src="https://img.icons8.com/?size=100&id=QfmxGpnj0cA8&format=png&color=000000"
          alt="d"
          className="w-3 sm:w-4 md:w-5"
        />
        <div className="text-[0.5rem] md:text-[1.2rem] font-bold">
          4UTEFQjNMvfQF5NT8mVfXdMAKoL7hS7i9U4mMVAzpump
        </div>
      </div>
      <div className="flex space-x-4 mt-5">
        <div className="bg-gray-300 p-2 sm:p-4 w-[80px] sm:w-[95px] md:w-[110px] rounded-md text-center ">
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            Holders
          </div>
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            [{holders}]
          </div>
        </div>
        <div className="bg-gray-300 p-2 sm:p-4 w-[80px] sm:w-[95px] md:w-[110px] rounded-md text-center  ">
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            Volume
          </div>
          <div className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem]">
            [{volume}]
          </div>
        </div>
        <div className="bg-gray-300 p-2 sm:p-4 w-[80px] sm:w-[95px] md:w-[110px] rounded-md text-center truncate">
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

export default App;
