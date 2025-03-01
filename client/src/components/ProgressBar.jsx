import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-green-600 h-3 rounded-full"
        style={{ width: `${progress > 100 ? 100 : progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
