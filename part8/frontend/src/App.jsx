import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommendations from "./components/Recommendations"
import { gql } from "@apollo/client"
import { useQuery, useMutation, useSubscription, useApolloClient } from "@apollo/client"

const SUB = gql`
    subscription {
        bookAdded {
            title,
            author {
                name,
                born,
                bookCount,
            },
            published,
            genres
        }
    }       
`
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
            <Login show={page === "login"} user={loggedUser} setLoggedUser={setLoggedUser} />
            <Recommendations show={page === "recommendations"} user={loggedUser}></Recommendations>
            <NewBook show={page === "add"} user={loggedUser} />
        </div>
    )
}

export default App