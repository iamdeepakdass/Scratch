import React from 'react';

const GoToRandom = () => {
  return (
    <div 
        className="flex flex-row flex-wrap items-center bg-red-400 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        draggable
        onDragStart={(e) => {
            e.dataTransfer.setData("action", "goToRandom");
        }}
    >
        Goto Random
    </div>
    );
};

export default GoToRandom;
