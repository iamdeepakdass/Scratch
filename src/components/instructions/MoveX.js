import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editInstruction, removeInstruction } from "../../redux/slices/instructions/slice";

export default function MoveX({prevSteps, id, index, uniqueId}) {
    const [steps, setSteps] = useState(prevSteps);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(editInstruction({id, editInstructionIndex: index, instruction: {uniqueId, action: "moveX", steps: steps}}));
    }, [steps]);
  return (
    <div 
        className="flex flex-row flex-wrap items-center justify-between bg-green-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
    >
        <p>Move <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} className="w-10 mx-1 text-black border border-black" /> steps in X direction</p>
        <img src="/icons/dustbin.svg" alt="dustbin" className="w-5 h-5 cursor-pointer" onClick={() => dispatch(removeInstruction({id, removeInstructionIndex: index}))} />
    </div>
  );
}
