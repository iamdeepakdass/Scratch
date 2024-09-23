import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  editInstruction,
  removeInstruction,
} from "../../redux/slices/instructions/slice";

export default function Increase({ prevSize, id, index, uniqueId }) {
  const [size, setSize] = useState(prevSize);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      editInstruction({
        id,
        editInstructionIndex: index,
        instruction: { uniqueId, action: "increase", size: size },
      })
    );
  }, [size]);

  return (
    <div className="flex flex-row flex-wrap items-center justify-between bg-gray-400 text-white px-2 py-1 my-2 text-sm cursor-pointer">
      <p>
        Increase size by{" "}
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-10 mx-1 text-black border border-black"
        />{" "}
        times
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
