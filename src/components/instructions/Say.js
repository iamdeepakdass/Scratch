import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editInstruction, removeInstruction } from "../../redux/slices/instructions/slice";

export default function Say({prevText, id, index, uniqueId}) {
    const [text, setText] = useState(prevText);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(editInstruction({id, editInstructionIndex: index, instruction: {uniqueId, action: "say", text: text}}));
    }, [text]);

    return (
        <div 
            className="flex flex-row flex-wrap items-center justify-between bg-yellow-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
            <p>Say <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-10 mx-1 text-black border border-black" /></p>
            <img src="/icons/dustbin.svg" alt="dustbin" className="w-5 h-5 cursor-pointer" onClick={() => dispatch(removeInstruction({id, removeInstructionIndex: index}))} />
        </div>
    );
}