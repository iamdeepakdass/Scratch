import React, { useState } from "react";

export default function Repeat() {
  const [times, setTimes] = useState(1);

  return (
    <div
      className="flex flex-row flex-wrap items-center bg-pink-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("action", "repeat");
        e.dataTransfer.setData("times", times);
      }}
    >
      Repeat{" "}
      <input
        type="number"
        value={times}
        onChange={(e) => setTimes(e.target.value)}
        className="w-10 mx-1 text-black border border-black"
      />{" "}
      times
    </div>
  );
}
