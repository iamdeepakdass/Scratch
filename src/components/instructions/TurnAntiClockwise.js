import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editInstruction, removeInstruction } from "../../redux/slices/instructions/slice";

export default function TurnAntiClockwise({prevDegrees, id, index, uniqueId}) {
    const [degrees, setDegrees] = useState(prevDegrees);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(editInstruction({id, editInstructionIndex: index, instruction: {uniqueId, action: "turnAntiClockwise", degrees: degrees}}));
    }, [degrees]);
  return (
    <div 
        className="flex flex-row flex-wrap items-center justify-between bg-blue-400 text-white px-2 py-1 my-2 text-sm cursor-pointer"
    >
        <p>Turn Anti Clockwise <input type="number" value={degrees} onChange={(e) => setDegrees(e.target.value)} className="w-10 mx-1 text-black border border-black" /> degrees</p>
        <img src="/icons/dustbin.svg" alt="dustbin" className="w-5 h-5 cursor-pointer" onClick={() => dispatch(removeInstruction({id, removeInstructionIndex: index}))} />
    </div>
  );
}
