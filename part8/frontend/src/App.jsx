import { useState, useEffect } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommendations from "./components/Recommendations"

export const updateCache = (cache, query, addedBook) => {
    const { allBooksByGenre } = cache.readQuery(query);
    cache.writeQuery({
        ...query,
        data: {
            allBooksByGenre: [...allBooksByGenre, addedBook],
        },
    });
}


const App = () => {
    const [page, setPage] = useState("authors")
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        const user = window.localStorage.getItem("bookslist-user-token");
        if (user) {
            setLoggedUser(user);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem("bookslist-user-token", token.data.login.value);
        console.log("logg", token.data.login.value)
        setLoggedUser(token.data.login.value);
    }

    const handleLogout = () => {
        localStorage.removeItem("bookslist-user-token");
        setLoggedUser(null)
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                {!loggedUser && <button onClick={() => setPage("login")}>Login</button>}
                {loggedUser && <button onClick={() => setPage("recommendations")}>Recommendations</button>}
                {loggedUser && <button onClick={handleLogout}>Logout</button>}
                {loggedUser && <button onClick={() => setPage("add")}>add book</button>}
            </div>

            <Authors show={page === "authors"} user={loggedUser} />
            <Books show={page === "books"} />
            <Login show={page === "login"} login={handleLogin} />
            <Recommendations show={page === "recommendations"} user={loggedUser}></Recommendations>
            <NewBook show={page === "add"} user={loggedUser} />
        </div>
    )
}

export default App