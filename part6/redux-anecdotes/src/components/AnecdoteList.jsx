/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()
    const voteAnecdote = () => {
        dispatch(likeAnecdote(anecdote))
        dispatch(setNotification(`Voted "${anecdote.content}"`));
        setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
    }
    return (
        <li>
            {anecdote.content}
            <br /> Votes: {anecdote.votes} <button onClick={voteAnecdote}>+1</button>
        </li>
    )
}
const Anecdotes = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter === "ALL") {
            return anecdotes.slice().sort((a, b) => b.votes - a.votes);
        }
        return anecdotes
            .slice()
            .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
            .sort((a, b) => b.votes - a.votes);
    });

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <Anecdote key={anecdote.id} anecdote={anecdote} />
                )}
            </ul>
        </div>
    )
}

export default Anecdotes