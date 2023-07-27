import { createSlice } from "@reduxjs/toolkit";
// comments might seem self-explanatory but they help me a lot lol
const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            // set reducer's blogs
            return action.payload;
        },
        addBlog(state, action) {
            // add blog to the reducer
            state.push(action.payload);
        },
        likeBlog(state, action) {
            // like the blog in reducer
            const { id, likes } = action.payload;
            const blogToUpdate = state.find(blog => blog.id === id);
            if (blogToUpdate) {
                blogToUpdate.likes = likes;
            }
        },
        deleteBlog(state, action) {
            // delete the blog from reducer
            const id = action.payload;
            return state.filter((blog) => blog.id !== id);
        }
    }
});

export const { setBlogs, addBlog, likeBlog, deleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;