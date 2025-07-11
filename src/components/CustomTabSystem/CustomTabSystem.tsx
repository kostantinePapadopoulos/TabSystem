import React, { useState, useEffect, useRef, type ReactNode } from "react";

interface TabItem {
  tabTitle: string;
  tabContent: ReactNode;
  disabled?: boolean;
}

interface TabSystemProps {
  tabItems: TabItem[];
  defaultActiveIndex?: number;
  className?: string;
}

const CustomTabSystem: React.FC<TabSystemProps> = ({
  tabItems,
  defaultActiveIndex = 0,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animate height when active tab changes
  useEffect(() => {
    const activeContent = contentRefs.current[activeIndex];
    if (activeContent) {
      setContentHeight(activeContent.scrollHeight);
    }
  }, [activeIndex]);

  // Set initial height after first render
  useEffect(() => {
    const activeContent = contentRefs.current[activeIndex];
    if (activeContent && contentHeight === null) {
      setContentHeight(activeContent.scrollHeight);
    }
  }, [activeIndex, contentHeight]);

  const handleTabClick = (index: number) => {
    if (!tabItems[index]?.disabled) {
      setActiveIndex(index);
    }
  };

  return (
    <div className={`w-full drop-shadow ${className}`}>
      {/* Tab Headers */}
      <div className="overflow-x-auto overflow-y-hidden border-b border-gray-200">
        <div className="flex min-w-max gap-1">
          {tabItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              disabled={item.disabled}
              className={`
                px-6 py-3 text-sm font-medium transition-all rounded-t duration-200
                whitespace-nowrap flex-shrink-0  border-1 border-gray-50
                ${
                  activeIndex === index
                    ? "z-1 text-white bg-primary"
                    : "text-gray-500 hover:text-primary"
                }
                ${
                  item.disabled
                    ? "cursor-not-allowed opacity-50 text-gray-400 hover:text-gray-400"
                    : "cursor-pointer"
                }
              `}
            >
              {item.tabTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div
        className="relative bg-gray-50 rounded-b overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: contentHeight ? `${contentHeight}px` : "auto" }}
      >
        {tabItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            className={`
              p-6 transition-all duration-300 ease-in-out
              ${
                activeIndex === index
                  ? "opacity-100 translate-y-0 relative"
                  : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
              }
            `}
          >
            {item.tabContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTabSystem;
