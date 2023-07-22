import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

// 'If it hurts, do it more often',
// 'Adding manpower to a late software project makes it later!',
// 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 'Premature optimization is the root of all evil.',
// 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'

const anecdotesAtStart = [];
const getId = () => (100000 * Math.random()).toFixed(0);
// const generateId = () => Number((Math.random() * 1000000).toFixed(0));
const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const anecdoteSlice = createSlice({
    name: "anecdote",
    initialState: anecdotesAtStart.map(asObject),
    reducers: {
        createAnecdote(state, action) {
            // const newAnecdote = action.payload;
            // state.push(asObject(newAnecdote));
            state.push(action.payload);
        },
        // likeAnecdote(state, action) {
        //     const anecdoteToLike = state.find(anecdote => anecdote.id === action.payload.id);
        //     if (anecdoteToLike) {
        //         anecdoteToLike.votes += 1;
        //     }
        // },
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
        likeAnecdote(state, action) {
            const updatedAnecdote = action.payload;
            const index = state.findIndex((anecdote) => anecdote.id === updatedAnecdote.id);
            if (index !== -1) {
                state[index] = updatedAnecdote;
            }
        }
    }
});

export const initalizeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll();
        dispatch(setAnecdotes(anecdotes));
    }
};

export const createAnecdote = (anecdote) => {
    return async dispatch => {
        const newAnecdote = await anecdotesService.createNew(anecdote);
        dispatch(appendAnecdote(newAnecdote));
    }
};

export const updateAnecdote = (anecdote) => {
    return async (dispatch) => {
        const updatedAnecdote = await anecdotesService.update(anecdote);
        dispatch(likeAnecdote(updatedAnecdote));
    };
};

export const { likeAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;