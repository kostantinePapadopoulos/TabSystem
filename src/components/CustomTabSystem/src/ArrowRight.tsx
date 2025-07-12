import React from "react";

interface ArrowIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
}

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
    <g>
      <path
        d="M 7,3.2910156 6.2910156,4 6.6464844,4.3535156 12.291016,10 6.6464844,15.646484 6.2910156,16 7,16.708984 7.3535156,16.353516 13.708984,10 7.3535156,3.6464844 Z"
        fill={fill}
      />
    </g>
  </svg>
);

export default ArrowRight;
