import React, { useState } from 'react';

export default function Increase() {
    const [size, setSize] = useState(1);

    return (
        <div 
            className="flex flex-row flex-wrap items-center justify-between bg-gray-400 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("action", "increase");
                e.dataTransfer.setData("size", size);
            }}
        >
            Increase size by <input type="number" value={size} onChange={(e) => setSize(e.target.value)} className="w-10 mx-1 text-black border border-black" /> times
        </div>
    );
}   