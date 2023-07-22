import Anecdotes from './components/AnecdoteList'
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from './components/Filter'
import Notification from "./components/Notification"


import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initalizeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initalizeAnecdotes());
    }, [dispatch]);
    return (
        <div>
            <AnecdoteForm />
            <Filter />
            <Notification />
            <Anecdotes />
        </div>
    )
}

export default App