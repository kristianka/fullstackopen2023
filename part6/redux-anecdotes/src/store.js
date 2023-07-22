import { configureStore } from "@reduxjs/toolkit"
import filterReducer from "./reducers/filterReducer.js"
import anecdoteReducer from "./reducers/anecdoteReducer.js"
import notificationReducer from "./reducers/notificationReducer.js";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
});
console.log(store.getState())

export default store;