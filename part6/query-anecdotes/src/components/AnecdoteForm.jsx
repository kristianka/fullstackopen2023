import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {

    const queryClient = useQueryClient();
    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData("anecdotes");
            queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
            // queryClient.invalidateQueries("anecdotes");
        },
        onError: (error) => {
            notificationDispatch({ type: "SET_MESSAGE", message: `Anecdote must be atleast 5 characters` });
        },
    });

    const notificationDispatch = useNotificationDispatch();

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        newAnecdoteMutation.mutate({ content });
        notificationDispatch({ type: "SET_MESSAGE", message: `Added new anecdote ${content}!` });
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm