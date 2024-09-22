import React from "react";
import { useDispatch } from "react-redux";
import { removeInstruction } from "../../redux/slices/instructions/slice";

export default function GoToRandom({id, index}) {
    const dispatch = useDispatch();
    
  return (
    <div 
        className="flex flex-row flex-wrap items-center justify-between bg-red-400 text-white px-2 py-1 my-2 text-sm cursor-pointer"
    >
        <p>Goto Random</p>
        <img src="/icons/dustbin.svg" alt="dustbin" className="w-5 h-5 cursor-pointer" onClick={() => dispatch(removeInstruction({id, removeInstructionIndex: index}))} />
    </div>
  );
}