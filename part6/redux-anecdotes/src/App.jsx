import Anecdotes from './components/AnecdoteList'
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from './components/Filter'
import Notification from "./components/Notification"

const App = () => {
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