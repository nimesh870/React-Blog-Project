import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : [],
    loading : false,
}

const postSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {
        addPost : (state , action) => {
            state.posts.push(action.payload)
        },

        removePost : (state , action) => {
            state.posts = state.posts.filter( (post) => post.$id !== action.payload )
        },

        setLoading : (state) => {
            state.loading = true;
        },

        setPosts : (state , action) => {
            state.posts = action.payload
            state.loading = false
        },

        clearPosts : (state) => {
            state.posts = [];
        }
    }
})

export const {addPost , removePost , setPosts , clearPosts} = postSlice.actions;
export default postSlice.reducer;