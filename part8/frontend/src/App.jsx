import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'


const App = () => {
    const [page, setPage] = useState('authors')
    const [loggedUser, setLoggedUser] = useState(null);
    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {!loggedUser && <button onClick={() => setPage("login")}>Login</button>}
                {loggedUser && <button onClick={() => setPage("recommendations")}>Recommendations</button>}
                {loggedUser && <button onClick={() => setLoggedUser(null)}>Logout</button>}
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors show={page === 'authors'} user={loggedUser} />
            <Books show={page === 'books'} />
            <Login show={page === "login"} user={loggedUser} setLoggedUser={setLoggedUser} />
            <Recommendations show={page === "recommendations"} user={loggedUser}></Recommendations>
            <NewBook show={page === 'add'} user={loggedUser} />
        </div>
    )
}

export default App