import { createSlice } from "@reduxjs/toolkit";

// NOTE!!! This is for all users, not the one logged in
const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
        resetUsers() {
            return null;
        }
    }
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;