import React from "react";
import type { ArrowIconProps } from "./ArrowIconProps";

const ArrowRight: React.FC<ArrowIconProps> = ({
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
        d="M 6 2.5 L 6.8 3.3 L 14.5 10 L 6.8 16.7 L 6 17.5 L 4.5 16 L 5.3 15.2 L 11.5 10 L 5.3 4.8 L 4.5 4 L 6 2.5 z"
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

export default ArrowRight;
