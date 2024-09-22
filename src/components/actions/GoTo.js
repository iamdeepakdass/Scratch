import React, { useState } from 'react';

const GoTo = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
  return (
    <div 
        className="flex flex-row flex-wrap items-center bg-red-400 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable
        onDragStart={(e) => {
            e.dataTransfer.setData("action", "goTo");
            e.dataTransfer.setData("x", x);
            e.dataTransfer.setData("y", y);
        }}
    >
        Goto x: <input type="number" value={x} onChange={(e) => setX(e.target.value)} className="w-10 mx-1 text-black border border-black" /> and
        y: <input type="number" value={y} onChange={(e) => setY(e.target.value)} className="w-10 mx-1 text-black border border-black" />
    </div>
  );
};

export default GoTo;
