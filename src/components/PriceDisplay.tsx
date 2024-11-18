import { Triangle } from "lucide-react";

interface PriceDisplayProps {
  price: string;
  priceColor: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  priceColor,
}) => {
  const isNeutral = priceColor === "text-black";
  const isGreen = priceColor === "text-green-300";

  return (
    <div className="flex items-center">
      {!isNeutral && (
        <Triangle
          className={`mr-4 ${
            isGreen ? "text-green-300" : "text-red-500 rotate-180"
          } ${isNeutral ? "text-dark" : "text"}`}
          fill="currentColor"
        />
      )}

      <div
        className={`text-[1rem] sm:text-[2rem] md:text-[3rem] font-bold ${priceColor}`}
      >
        {price} / $1
      </div>
    </div>
  );
};
