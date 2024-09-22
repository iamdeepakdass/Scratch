import React, { useState } from 'react';

export default function Say() {
    const [text, setText] = useState("Hello");

    return (
        <div 
            className="flex flex-row flex-wrap items-center bg-yellow-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("action", "say");
                e.dataTransfer.setData("text", text);
            }}
        >
            Say <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-10 mx-1 text-black border border-black" />
        </div>
    );
}