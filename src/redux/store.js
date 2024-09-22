import { configureStore } from "@reduxjs/toolkit";
import { spriteReducer } from "./slices/sprite/slice";
import { instructionsReducer } from "./slices/instructions/slice";

export const store = configureStore({
    reducer: {
        sprite: spriteReducer,
        instructions: instructionsReducer
    },
})