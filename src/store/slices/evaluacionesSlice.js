import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaEvaluaciones: []
}


export const evaluacionesSlice = createSlice({
    name: "evaluaciones",
    initialState,
    reducers:{
        cargarListaEvaluaciones: (state, action) =>{
           state.listaEvaluaciones = action.payload;

        },
        agregarEvaluacion:(state, action) =>{
            state.listaEvaluaciones.push(action.payload);
        }
    }
});


export const { cargarListaEvaluaciones, agregarEvaluacion } = evaluacionesSlice.actions;
export default evaluacionesSlice.reducer;