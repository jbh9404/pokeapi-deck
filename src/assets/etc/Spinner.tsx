import React, { FunctionComponent } from "react";

interface IiconType {
  onClick?: any;
  width: string;
  height: string;
}

const Spinner: FunctionComponent<IiconType> = ({ onClick, width, height }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto" }}
      width={width}
      height={height}
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="#dd8b59"
        strokeDasharray="164.93361431346415 56.97787143782138"
        strokeWidth="10"
      >
        <animateTransform
          attributeName="transform"
          dur="1.6949152542372883s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default Spinner;
