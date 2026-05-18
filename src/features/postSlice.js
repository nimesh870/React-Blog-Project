import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : []
}

const postSlice = {
    name : 'post',
    initialState,
    reducers : {
        addPost : (state , payload) => {
            state.posts.push(action.payload)
        },

        removePost : (state , action) => {
            state.posts = state.posts.filter( (post) => post.$id !== action.payload )
        }
    }
}

export const {addPost , removePost} = postSlice.actions;
export default postSlice.reducer;