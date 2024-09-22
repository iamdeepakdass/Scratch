import { createSlice } from "@reduxjs/toolkit";

export const instructionsSlice = createSlice({
    initialState: [{
        id: "0",
        instructions: [],
    }],
    name: "instructions",
    reducers: {
        add: (state, action) => {
            return [...state, { 
                id: action.payload.id,
                instructions: []
             }]
        },
        remove: (state, action) => {
            const instructionsIndex = state.findIndex(sprite => sprite.id === action.payload);
            if(instructionsIndex !== -1) {
                state.splice(instructionsIndex, 1);
            }
        },
        addInstruction: (state, action) => {
            const instructionsIndex = state.findIndex(sprite => sprite.id === action.payload.id);
            if(instructionsIndex !== -1) {
                state[instructionsIndex].instructions.push(action.payload.instruction);
            }
        },
        removeInstruction: (state, action) => {
            const instructionsIndex = state.findIndex(sprite => sprite.id === action.payload.id);
            if(instructionsIndex !== -1) {
                state[instructionsIndex].instructions.splice(action.payload.removeInstructionIndex, 1);
            }
        },
        editInstruction: (state, action) => {
            const instructionsIndex = state.findIndex(sprite => sprite.id === action.payload.id);
            if(instructionsIndex !== -1) {
                state[instructionsIndex].instructions[action.payload.editInstructionIndex] = action.payload.instruction;
            }
        }
    }
})

export const { add, remove, addInstruction, removeInstruction, editInstruction } = instructionsSlice.actions;
export const instructionsReducer = instructionsSlice.reducer;