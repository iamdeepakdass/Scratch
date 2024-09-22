import { createSlice } from "@reduxjs/toolkit";

export const spriteSlice = createSlice({
    initialState: [{
        id: "0",
        name: "Sprite",
        img: "/icons/fig0.svg",
        posX: 0,
        posY: 0,
        angle: 0,
        flip: false
    }],
    name: "sprite",
    reducers: {
        add: (state, action) => {
            return [...state, { 
                id: action.payload.id,
                name: action.payload.name,
                img: action.payload.img,
                posX: 0,
                posY: 0,
                angle: 0,
                flip: false
             }]
        },
        remove: (state, action) => {
            const spriteIndex = state.findIndex(sprite => sprite.id === action.payload);
            if(spriteIndex !== -1) {
                state.splice(spriteIndex, 1);
            }
        }
    }
})

export const { add, remove } = spriteSlice.actions;
export const spriteReducer = spriteSlice.reducer;