import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App: React.FC = () => {
  const [price, setPrice] = useState<string>("$0.00");
  const [priceColor, setPriceColor] = useState<string>("black");

  const socket = io("http://localhost:5000", {
    transports: ["websocket"], // Use WebSocket for connection
  });

  //   socket.on("connect", () => {
  //     console.log("Connected to WebSocket server");
  //   }); // Connect to the backend WebSocket

  useEffect(() => {
    // Listen for price updates from the server
    socket.on("priceUpdate", (data: { price: number }) => {
      const previousPrice = parseFloat(price.replace("$", ""));
      const newPrice = data.price;
      console.log(newPrice);
      // Update price color based on the change
      if (newPrice > previousPrice) {
        setPriceColor("text-green-500");
      } else if (newPrice < previousPrice) {
        setPriceColor("text-red-500");
      }

      // Update the price state
      setPrice(`$${newPrice.toFixed(2)}`);
    });

    return () => {
      socket.disconnect(); // Cleanup the WebSocket connection when the component unmounts
    };
  }, [price, socket]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <div className="flex items-center">
        <div
          id="price"
          className={`text-[1.6rem] sm:text-[3rem] md:text-[4rem] font-bold ${priceColor}`}
        >
          {price} / $1
        </div>
      </div>
    </div>
  );
};

export default App;
