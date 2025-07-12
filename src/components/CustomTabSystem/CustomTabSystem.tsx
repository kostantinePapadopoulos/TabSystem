import React, { useState, useEffect, useRef, type ReactNode } from "react";
import ArrowLeft from "./src/ArrowLeft";
import ArrowRight from "./src/ArrowRight";

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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerContainerRef = useRef<HTMLDivElement | null>(null);
  const tabsWrapperRef = useRef<HTMLDivElement | null>(null);

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

  // Check if scroll arrows should be shown
  const checkScrollArrows = () => {
    const container = headerContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  // Initialize scroll arrow visibility
  useEffect(() => {
    checkScrollArrows();
    const container = headerContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollArrows);
      return () => container.removeEventListener("scroll", checkScrollArrows);
    }
  }, [tabItems]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      checkScrollArrows();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabClick = (index: number) => {
    if (!tabItems[index]?.disabled) {
      setActiveIndex(index);
      // Scroll active tab into view
      scrollToTab(index);
    }
  };

  const scrollToTab = (index: number) => {
    const container = headerContainerRef.current;
    const tabButtons = container?.querySelectorAll("button");
    if (container && tabButtons && tabButtons[index]) {
      const tabButton = tabButtons[index] as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const tabRect = tabButton.getBoundingClientRect();

      // Calculate if tab is outside visible area
      const tabLeft = tabRect.left - containerRect.left + container.scrollLeft;
      const tabRight = tabLeft + tabRect.width;
      const visibleLeft = container.scrollLeft;
      const visibleRight = container.scrollLeft + container.clientWidth;

      if (tabLeft < visibleLeft) {
        // Tab is to the left of visible area
        container.scrollTo({
          left: tabLeft - 20, // Add some padding
          behavior: "smooth",
        });
      } else if (tabRight > visibleRight) {
        // Tab is to the right of visible area
        container.scrollTo({
          left: tabRight - container.clientWidth + 20, // Add some padding
          behavior: "smooth",
        });
      }
    }
  };

  const handleHorizontalScroll = (direction: "left" | "right") => {
    const container = headerContainerRef.current;
    if (!container) return;

    const scrollAmount = 200; // Adjust scroll distance as needed
    const targetScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className={`w-full drop-shadow ${className}`}>
      {/* Tab Headers */}
      <div
        ref={tabsWrapperRef}
        className="relative border-b border-gray-200 overflow-hidden"
      >
        {/* Left Arrow */}

        <button
          className={`${
            showLeftArrow ? "opacity-100" : "opacity-0 translate-x-[-100%]"
          } transition-all duration-400 cursor-pointer absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-gray-300 to-transparent flex items-center justify-center z-10 group`}
          onClick={() => handleHorizontalScroll("left")}
          aria-label="Scroll left"
        >
          <div className="group-hover:scale-120 transition-transform">
            <ArrowLeft />
          </div>
        </button>

        {/* Right Arrow */}

        <button
          className={`${
            showRightArrow ? "opacity-100" : "opacity-0 translate-x-full"
          } transition-all duration-400 cursor-pointer absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-gray-300 to-transparent flex items-center justify-center z-10 group`}
          onClick={() => handleHorizontalScroll("right")}
          aria-label="Scroll right"
        >
          <div className="group-hover:scale-120 transition-transform">
            <ArrowRight />
          </div>
        </button>

        {/* Scrollable Tab Container */}
        <div
          ref={headerContainerRef}
          className="flex gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{
            paddingLeft: showLeftArrow ? "32px" : "0px",
            paddingRight: showRightArrow ? "32px" : "0px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {tabItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              disabled={item.disabled}
              className={`
                px-6 py-3 text-sm font-medium transition-all rounded-t duration-200
                whitespace-nowrap flex-shrink-0 border border-gray-200
                ${
                  activeIndex === index
                    ? "z-[1] text-white bg-blue-600 border-blue-600"
                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                }
                ${
                  item.disabled
                    ? "cursor-not-allowed opacity-50 text-gray-400 hover:text-gray-400 hover:bg-transparent"
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
