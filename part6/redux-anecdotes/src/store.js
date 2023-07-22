import { configureStore } from "@reduxjs/toolkit"
import anecdoteService from "./services/anecdotes.js";
import filterReducer from "./reducers/filterReducer.js"
import anecdoteReducer, { setAnecdotes } from "./reducers/anecdoteReducer.js"
import notificationReducer from "./reducers/notificationReducer.js";

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
});

const fetchFromApi = async () => {
    const res = await anecdoteService.getAll();
    store.dispatch(setAnecdotes(res));
};
fetchFromApi();

console.log(store.getState())

export default store;