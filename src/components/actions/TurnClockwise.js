import React, { useState } from "react";

export default function TurnClockwise() {
    const [degrees, setDegrees] = useState(0);
  return (
    <div 
        className="flex flex-row flex-wrap items-center bg-blue-400 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable
        onDragStart={(e) => {
            e.dataTransfer.setData("action", "turnClockwise");
            e.dataTransfer.setData("degrees", degrees);
        }}
    >
        Turn Clockwise <input type="number" value={degrees} onChange={(e) => setDegrees(e.target.value)} className="w-10 mx-1 text-black border border-black" /> degrees
    </div>
  );
}
