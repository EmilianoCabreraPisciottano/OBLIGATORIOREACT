import { configureStore } from "@reduxjs/toolkit";
import registrosReducer from "./slices/registrarSlice"
import evaluacionesReducer from "./slices/evaluacionesSlice"

export const store = configureStore({
    reducer:{
        registros: registrosReducer,
        evaluaciones: evaluacionesReducer,

    }
})