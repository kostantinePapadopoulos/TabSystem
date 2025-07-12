import React from "react";
import type { ArrowIconProps } from "./ArrowIconProps";

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
        d="M 14 2.5 L 13.2 3.3 L 5.5 10 L 13.2 16.7 L 14 17.5 L 15.5 16 L 14.7 15.2 L 8.5 10 L 14.7 4.8 L 15.5 4 L 14 2.5 z"
        style={{
          fill,
          fillOpacity: 1,
          stroke: "none",
          strokeWidth: 2,
        }}
      />
    </g>
  </svg>
);

export default ArrowLeft;
