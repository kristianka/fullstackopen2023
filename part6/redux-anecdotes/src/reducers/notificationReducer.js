import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "Initial notification",
    reducers: {
        /// Set's notification and clears it after 5 seconds
        setNotification(state, action) {
            console.log("setting notification")
            return action.payload;
        },
        clearNotification() {
            return "";
        },
    }
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;