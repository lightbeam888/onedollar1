import { Triangle } from "lucide-react";

interface StatsDisplayProps {
  holders: number;
  marketCap: number;
  volume: number;
  priceColor: string;
}

const StatBox: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className=" truncate text-[0.8rem] py-1 px-2 border border-gray-300 font-mono bg-box dark:bg-[#262626] dark:border-0 rounded-sm sm:text-[1rem] md:text-[1.3rem] font-normal">
    {label} {value}
  </div>
);

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  holders,
  marketCap,
  volume,
  priceColor,
}) => {
  const repegPercentage = ((marketCap / 1000000000) * 100).toFixed(2);
  const isNeutral = priceColor === "text-black dark:text-gray-300";
  const isGreen = priceColor === "text-green-300";

  return (
    <div className="flex justify-center gap-4 mt-5">
      <StatBox label="holders" value={`[${(holders / 1000).toFixed(1)}k]`} />

      <div
        className={`
        py-1 px-2 border font-mono rounded-sm text-[0.8rem] sm:text-[1rem] md:text-[1.3rem] font-normal
        flex items-center gap-2
        ${
          isGreen
            ? "bg-[#00a85114] border-[#00a85133] dark:border-[#003300]"
            : "bg-box dark:bg-[#262626]"
        }
        border-gray-300 dark:border-0
      `}
      >
        <span className="text-black truncate dark:text-white">
          re-peg status
        </span>
        [
        <span className={`${isGreen ? "text-green-300" : "text-red-500"}`}>
          {repegPercentage}%
        </span>
        ]
        {!isNeutral && (
          <Triangle
            className={`h-4 w-4 ${
              isGreen ? "text-green-300" : "text-red-500 rotate-180"
            }`}
            fill="currentColor"
          />
        )}
      </div>

      <StatBox label="marketCap" value={`[${Math.ceil(marketCap / 1000)}k]`} />

      <StatBox label="Volume" value={`[${(volume / 1000).toFixed(1)}k]`} />
    </div>
  );
};
