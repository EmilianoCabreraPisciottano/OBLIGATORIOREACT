import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaTareas: []
}


export const tareasSlice = createSlice({
    name: "tareas",
    initialState,
    reducers:{
        cargarListaTareas: (state, action) =>{
           state.listaTareas = action.payload;
            
        },
        agregarTarea:(state, action) =>{
            state.listaTareas.push(action.payload);            
        }
    }
});


export const { cargarListaTareas, agregarTarea } = tareasSlice.actions;
export default tareasSlice.reducer;