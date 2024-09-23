import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  editInstruction,
  removeInstruction,
} from "../../redux/slices/instructions/slice";

export default function Repeat({ prevTimes, id, index, uniqueId }) {
  const [times, setTimes] = useState(prevTimes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      editInstruction({
        id,
        editInstructionIndex: index,
        instruction: { uniqueId, action: "repeat", times: times },
      })
    );
  }, [times]);

  return (
    <div className="flex flex-row flex-wrap items-center justify-between bg-pink-600 text-white px-2 py-1 my-2 text-sm cursor-pointer">
      <p>
        Repeat{" "}
        <input
          type="number"
          value={times}
          onChange={(e) => setTimes(e.target.value)}
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
