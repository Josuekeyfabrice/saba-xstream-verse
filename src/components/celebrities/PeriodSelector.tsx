
interface PeriodSelectorProps {
  currentPeriod: string;
  onPeriodChange: (period: string) => void;
}

export const PeriodSelector = ({ currentPeriod, onPeriodChange }: PeriodSelectorProps) => {
  return (
    <div className="mb-8 flex items-center">
      <div className="flex space-x-2">
        {["today", "week", "month"].map((period) => (
          <button
            key={period}
            onClick={() => onPeriodChange(period)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPeriod === period
                ? "bg-stream-purple text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {period === "today" && "Aujourd'hui"}
            {period === "week" && "Cette semaine"}
            {period === "month" && "Ce mois"}
          </button>
        ))}
      </div>
    </div>
  );
};
