import React, { useState } from "react";

export default function MoveXY() {
    const [stepsX, setStepsX] = useState(0);
    const [stepsY, setStepsY] = useState(0);
  return (
    <div 
        className="flex flex-row flex-wrap items-center bg-green-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable
        onDragStart={(e) => {
            e.dataTransfer.setData("action", "moveXY");
            e.dataTransfer.setData("stepsX", stepsX);
            e.dataTransfer.setData("stepsY", stepsY);
        }}
    >
      Move 
      <input type="number" value={stepsX} onChange={(e) => setStepsX(e.target.value)} className="w-10 mx-1 text-black border border-black" /> 
      steps in X direction,
      <input type="number" value={stepsY} onChange={(e) => setStepsY(e.target.value)} className="w-10 mx-1 text-black border border-black" /> 
      steps in Y direction
    </div>
  );
}
