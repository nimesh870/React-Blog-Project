import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible : false,
    message : '',
    type : ''
}

const toastSlice = createSlice({
    name : 'toast',
    initialState,
    reducers : {
        showToast : (state , action) => {
            state.visible = true;
            state.message = action.payload.message;
            state.type = action.payload.type || 'success'
        },

        hideToast : (state , action) => {
            state.visible = false;
        }
    }
})

export const { showToast , hideToast } = toastSlice.actions;
export default toastSlice.reducer;