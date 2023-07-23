import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {

    const queryClient = useQueryClient();
    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: () => {
            queryClient.invalidateQueries("anecdotes");
        }
    })

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    }
    const res = useQuery("anecdotes", getAnecdotes, {
        refetchOnWindowFocus: false
    });
    const anecdotes = res.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification res={res} />
            <AnecdoteForm />

            {anecdotes && anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App