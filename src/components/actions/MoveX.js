import React, { useState } from "react";

export default function MoveX() {
    const [steps, setSteps] = useState(0);
  return (
    <div 
        className="flex flex-row flex-wrap items-center bg-green-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable
        onDragStart={(e) => {
            e.dataTransfer.setData("action", "moveX");
            e.dataTransfer.setData("steps", steps);
        }}
    >
        Move <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} className="w-10 mx-1 text-black border border-black" /> steps in X direction
    </div>
  );
}
