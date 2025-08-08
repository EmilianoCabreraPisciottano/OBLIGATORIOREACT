import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuenta: 0
}


// immer
export const contadorSlice = createSlice({
    name: "contador",
    initialState,
    reducers:{
        incrementar: state =>{
            // state.cuenta= state.cuenta + 1;
            state.cuenta++;
        },
        resetear: state => {
            state.cuenta = 0;
        }
    }
});


export const { incrementar, resetear } = contadorSlice.actions;
export default contadorSlice.reducer;