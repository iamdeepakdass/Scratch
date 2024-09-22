import React, { useState } from "react";

function CoordinateInput() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const handleGoClick = () => {
    alert(`Go to x: ${x}, y: ${y}`);
  };

  return (
    <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
      <div className="flex flex-col items-center">
        <span>Go to </span>
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center my-1">
            <span>x: </span>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="mx-1 px-1 text-black"
              placeholder="Enter x"
            />
          </div>
          <div className="flex flex-row items-center my-1">
            <span>y: </span>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(e.target.value)}
              className="mx-1 px-1 text-black"
              placeholder="Enter y"
            />
          </div>
        </div>
        <button
          onClick={handleGoClick}
          className="bg-green-500 px-2 py-1 my-1 text-white rounded"
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default CoordinateInput;
