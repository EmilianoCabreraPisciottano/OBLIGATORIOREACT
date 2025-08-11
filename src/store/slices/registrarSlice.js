import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listaUsuarios: []
};

export const registrarSlice = createSlice({
    name: 'registrar',
    initialState,
    reducers: {
        agregarRegistro: (state, action) => {
            state.listaUsuarios.push(action.payload);
        },
        eliminarRegistro: (state, action) => {
            state.listaUsuarios = state.listaUsuarios.filter(registro => registro.id !== action.payload.id);
        }
    }
});

export const { agregarRegistro, eliminarRegistro } = registrarSlice.actions;
export default registrarSlice.reducer;
