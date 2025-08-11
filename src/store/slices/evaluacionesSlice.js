import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listaEvaluaciones: [],
  listaObjetivos: [],
};

export const evaluacionesSlice = createSlice({
  name: "evaluaciones",
  initialState,
  reducers: {
    cargarListaEvaluaciones: (state, action) => {
      state.listaEvaluaciones = action.payload;
    },
    agregarEvaluacion: (state, action) => {
      state.listaEvaluaciones.push(action.payload);
    },
    cargarObjetivos: (state, action) => {
      state.listaObjetivos = action.payload;
    },
    eliminarRegistro: (state, action) => {
      state.listaEvaluaciones = state.listaEvaluaciones.filter(evaluacion => evaluacion.id !== action.payload.id);
    }
  },
});

export const { cargarListaEvaluaciones, agregarEvaluacion,cargarObjetivos } =
  evaluacionesSlice.actions;
export default evaluacionesSlice.reducer;
