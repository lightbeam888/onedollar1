import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

interface DropdownItem {
  href: string;
  label: string;
}

interface DropdownProps {
  isActive: boolean;
  onToggle: () => void;
  label: string;
  items: DropdownItem[];
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ isActive, onToggle, label, items }, ref) => (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className="flex items-center space-x-1 text-black dark:text-gray-300 hover:text-gray-400 focus:outline-none transition-colors"
      >
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isActive && (
        <ul className="absolute -right-[50%] bg-gray-300 dark:bg-black dark:border dark:border-gray-400 z-10 mt-2 rounded-md shadow-lg min-w-[120px]">
          {items.map((item, index) => (
            <li key={index}>
              <a
                className="block p-2 text-black dark:text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
);
