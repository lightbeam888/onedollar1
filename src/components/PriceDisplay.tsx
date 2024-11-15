import { Triangle } from "lucide-react";

interface PriceDisplayProps {
  price: string;
  priceColor: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  priceColor,
}) => {
  const isNeutral = priceColor === "text-black dark:text-gray-300";
  const isGreen = priceColor === "text-green-500";

  return (
    <div className="flex items-center">
      {!isNeutral && (
        <Triangle
          className={`mr-4 ${
            isGreen ? "text-green-500" : "text-red-500 rotate-180"
          }`}
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
