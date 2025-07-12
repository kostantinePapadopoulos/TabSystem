import React from "react";

interface ArrowIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
}

const ArrowLeft: React.FC<ArrowIconProps> = ({
  width = 24,
  height = 24,
  fill = "#222222",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="layer1">
      <path
        d="M 13 3.2910156 L 12.646484 3.6464844 L 6.2910156 10 L 12.646484 16.353516 L 13 16.708984 L 13.708984 16 L 13.353516 15.646484 L 7.7089844 10 L 13.353516 4.3535156 L 13.708984 4 L 13 3.2910156 z"
        style={{
          fill,
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 1,
        }}
      />
    </g>
  </svg>
);

export default ArrowLeft;
