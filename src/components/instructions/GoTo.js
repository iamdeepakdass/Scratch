import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  editInstruction,
  removeInstruction,
} from "../../redux/slices/instructions/slice";

export default function GoTo({ prevX, prevY, id, index, uniqueId }) {
  const [x, setX] = useState(prevX);
  const [y, setY] = useState(prevY);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      editInstruction({
        id,
        editInstructionIndex: index,
        instruction: { uniqueId, action: "goTo", x: x, y: y },
      })
    );
  }, [x, y]);
  return (
    <div className="flex flex-row flex-wrap items-center justify-between bg-red-400 text-white px-2 py-1 my-2 text-sm cursor-pointer">
      <p>
        Goto x:{" "}
        <input
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
          className="w-10 mx-1 text-black border border-black"
        />{" "}
        and y:{" "}
        <input
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
          className="w-10 mx-1 text-black border border-black"
        />
      </p>
      <img
        src="/icons/dustbin.svg"
        alt="dustbin"
        className="w-5 h-5 cursor-pointer"
        onClick={() =>
          dispatch(removeInstruction({ id, removeInstructionIndex: index }))
        }
      />
    </div>
  );
}
