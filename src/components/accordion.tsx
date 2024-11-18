import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  darkmode: boolean;
  items: AccordionItem[];
}

const AccordionItem: React.FC<{
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  darkmode: boolean;
}> = ({ title, content, isOpen, onToggle, darkmode }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
    <button
      className="w-full py-4 px-2 flex justify-between items-center hover:bg-gray-700 sm:hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      onClick={onToggle}
    >
      <span
        className={`text-xs sm:text-lg truncate ${
          darkmode ? "text-gray-300" : "text-white sm:text-gray-900"
        }`}
      >
        {title}
      </span>
      <ChevronDown
        className={`w-5 h-5 transform transition-transform ${
          isOpen ? "rotate-180" : ""
        } ${darkmode ? "text-gray-300" : "text-white sm:text-gray-900"}`}
      />
    </button>
    {isOpen && (
      <div
        className={`px-2 pb-4  ${
          darkmode ? "text-gray-300" : "text-white sm:text-gray-700"
        }`}
      >
        {content}
      </div>
    )}
  </div>
);

const Accordion: React.FC<AccordionProps> = ({ items, darkmode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y max-w-3xl mb-10  divide-gray-200 dark:divide-gray-700">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
          darkmode={darkmode}
        />
      ))}
    </div>
  );
};

export default Accordion;
