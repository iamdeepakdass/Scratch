import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editInstruction, removeInstruction } from "../../redux/slices/instructions/slice";

export default function MoveXY({prevStepsX, prevStepsY, id, index, uniqueId}) {
    const [stepsX, setStepsX] = useState(prevStepsX);
    const [stepsY, setStepsY] = useState(prevStepsY);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(editInstruction({id, editInstructionIndex: index, instruction: {uniqueId, action: "moveXY", stepsX: stepsX, stepsY: stepsY}}));
    }, [stepsX, stepsY]);
    return (
        <div 
            className="flex flex-row flex-wrap items-center justify-between bg-green-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
            <p>Move <input type="number" value={stepsX} onChange={(e) => setStepsX(e.target.value)} className="w-10 mx-1 text-black border border-black" /> steps in X direction and <input type="number" value={stepsY} onChange={(e) => setStepsY(e.target.value)} className="w-10 mx-1 text-black border border-black" /> steps in Y direction</p>
            <img src="/icons/dustbin.svg" alt="dustbin" className="w-5 h-5 cursor-pointer" onClick={() => dispatch(removeInstruction({id, removeInstructionIndex: index}))} />
        </div>
    );
}