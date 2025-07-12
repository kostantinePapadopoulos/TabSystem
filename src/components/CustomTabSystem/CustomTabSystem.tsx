import React, { useState, useEffect, useRef, type ReactNode } from "react";
import ArrowLeft from "./src/ArrowLeft";
import ArrowRight from "./src/ArrowRight";

//Created by kpap (ψωνάρα)
//https://github.com/kostantinePapadopoulos/TabSystem
//Full animated tab system, triggers animation on tab change and readjusts height with transition if new tab content height is diffrent
//On Header tab overflow creates horyzontal scroller with animated left/right arrows

//Basic component props read before use!
interface TabSystemProps {
  tabItems: TabItem[]; // Array of tab data
  defaultActiveIndex?: number; // Active tab index onLoad if not provided will show first tab
  //(keepInactiveTabContentOnBackground Default false) TRUE: Load all tab contents on first load , this will keep the states of each tab content running adn persistent all time, if api calls occur in tab contents all api of all tabs will occur on page load
  //FALSE: mount the tab content on tab change this will reset state and refetch data f.e everytime we change tabs
  mountAllTabs?: boolean;
}

//Tab data props
interface TabItem {
  tabTitle: string | ReactNode; // Title as jsx or string for the tab button
  tabContent: string | ReactNode; // Tab content as jsx or string
  disabled?: boolean; // if tab is diabled with default false
}

const CustomTabSystem: React.FC<TabSystemProps> = ({
  tabItems,
  defaultActiveIndex = 0,
  mountAllTabs = false,
}) => {
  // Find the first non-disabled tab index starting from defaultActiveIndex
  const findNextEnabledTab = (startIndex: number) => {
    // First, try to find an enabled tab starting from the given index
    for (let i = startIndex; i < tabItems.length; i++) {
      if (!tabItems[i]?.disabled) {
        return i;
      }
    }
    // If no enabled tab found from startIndex to end, search from beginning
    for (let i = 0; i < startIndex; i++) {
      if (!tabItems[i]?.disabled) {
        return i;
      }
    }
    // If all tabs are disabled, return null
    return null;
  };

  const getInitialActiveIndex = () => {
    // If the default index is not disabled, use it
    if (!tabItems[defaultActiveIndex]?.disabled) {
      return defaultActiveIndex;
    }
    // Otherwise, find the next enabled tab
    return findNextEnabledTab(defaultActiveIndex);
  };

  const [activeIndex, setActiveIndex] = useState(getInitialActiveIndex());
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerContainerRef = useRef<HTMLDivElement | null>(null);
  const tabsWrapperRef = useRef<HTMLDivElement | null>(null);

  // Update active index if defaultActiveIndex or tabItems change
  useEffect(() => {
    const newActiveIndex = getInitialActiveIndex();
    setActiveIndex(newActiveIndex);
  }, [defaultActiveIndex, tabItems]);

  // Animate height when active tab changes
  useEffect(() => {
    if (activeIndex === null) return;
    const activeContent = contentRefs.current[activeIndex];
    if (activeContent) {
      setContentHeight(activeContent.scrollHeight);
    }
  }, [activeIndex]);

  // Set initial height after first render
  useEffect(() => {
    if (activeIndex === null) return;
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

  //mount all tab contents or only the active
  const renderTabContent = (item: TabItem, index: number) => {
    const isActiveTab = activeIndex === index;
    const shouldRender = mountAllTabs || isActiveTab;

    return shouldRender ? item.tabContent : null;
  };

  return (
    <div className={`w-full drop-shadow`}>
      {/* Tab Headers */}
      <div
        ref={tabsWrapperRef}
        className="relative border-b border-gray-200 overflow-hidden select-none"
      >
        {/* Left Arrow */}
        <button
          className={`${
            showLeftArrow ? "opacity-100" : "opacity-0 translate-x-[-100%]"
          } transition-all duration-400 cursor-pointer absolute left-0 top-0 h-full flex items-center justify-start z-10 group`}
          onClick={() => handleHorizontalScroll("left")}
          aria-label="Scroll left"
        >
          <div className="w-8 h-full flex justify-center items-center bg-gray-100">
            <div className="transition-transform group-hover:scale-110">
              <ArrowLeft fill="rgba(0, 52, 118, 1)" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-gray-100 to-transparent w-4 group-hover:w-6 transition-width duration-400 h-full"></div>
        </button>

        {/* Right Arrow */}
        <button
          className={`${
            showRightArrow ? "opacity-100" : "opacity-0 translate-x-full"
          } transition-all duration-400 cursor-pointer absolute right-0 top-0 h-full flex items-center justify-end z-10 group`}
          onClick={() => handleHorizontalScroll("right")}
          aria-label="Scroll right"
        >
          <div className="bg-gradient-to-l from-gray-100 to-transparent w-4 group-hover:w-6 transition-width duration-400 h-full"></div>
          <div className="w-8 h-full flex justify-center items-center bg-gray-100">
            <div className="transition-transform group-hover:scale-110">
              <ArrowRight fill="rgba(0, 52, 118, 1)" />
            </div>
          </div>
        </button>

        {/* Scrollable Tab Container */}
        <div
          ref={headerContainerRef}
          className="flex gap-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{
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
                    ? "z-1 text-white bg-primary"
                    : "text-gray-600 hover:bg-primary/30 bg-opacit"
                }
                ${
                  item.disabled
                    ? "cursor-not-allowed opacity-50 text-gray-400 duration-200 hover:text-gray-400 hover:bg-transparent"
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
            {renderTabContent(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTabSystem;
