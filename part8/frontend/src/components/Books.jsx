/* eslint-disable react/prop-types */
import { gql, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"


// const ALL_BOOKS = gql`
// query {
//     allBooks {
//       title,
//       published,
//       genres,
//       author {
//         name,
//         born
//       }
//     }
//   }
// `

const BOOKS_BY_GENRE = gql`
query($genre: String) {
    allBooksByGenre(genre: $genre) {
      title,
      published,
      genres,
      author {
        name,
        bookCount,
        born
      }
    }
  }
`

const BOOK_GENRES = gql`
query {
    allGenres
  }
`

const Books = (props) => {
    // const { loading, data } = useQuery(ALL_BOOKS, { pollInterval: 10000 });
    const [selectedGenre, setSelectedGenre] = useState("ALL");
    const { data: booksByGenre, refetch } = useQuery(BOOKS_BY_GENRE, { variables: { genre: selectedGenre } });
    const { data: bookGenres } = useQuery(BOOK_GENRES)

    useEffect(() => {
        refetch({ genre: selectedGenre });
    }, [selectedGenre, refetch]);

    if (!props.show) {
        return null
    }
    const books = booksByGenre?.allBooksByGenre || [];

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    return (
        <div>
            <h2>books</h2>
            <h4>Genre: {selectedGenre}</h4>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books && books.map(b => {
                        return (
                            <tr key={b.title}>
                                <td>{b.title}</td>
                                <td>{b.author.name}</td>
                                <td>{b.published}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                {bookGenres && bookGenres.allGenres.map(b => {
                    return (
                        <button key={b} value={b} onClick={handleGenreChange}>{b}</button>
                    )
                })}
                <button key="all" value="ALL" onClick={handleGenreChange}>ALL</button>
            </div>
        </div >
    )
}

export default Books