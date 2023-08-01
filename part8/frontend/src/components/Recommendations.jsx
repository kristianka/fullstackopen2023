/* eslint-disable react/prop-types */
import { gql, useQuery } from "@apollo/client"

const ALL_BOOKS = gql`
query {
    allBooks {
      title,
      published,
      genres,
      author {
        name,
        born
      }
    }
  },
`
const ME = gql`
query {
    me {
        favouriteGenre,
        username
  }
}
`
const Recommendations = (props) => {
    let favGenreBooks = [];
    const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS, { context: { pollInterval: 10000 } });
    const { loading: meLoading, data: meData } = useQuery(ME, { context: { headers: { Authorization: `Bearer ${props?.user?.data?.login?.value}` } }, pollInterval: 10000 });

    if (!props.show) {
        return null
    }
    if (booksLoading || meLoading) {
        return <p>Loading from GraphQL...</p>
    }

    const books = booksData.allBooks;
    const user = meData.me;
    books.map(b => {
        b.genres.forEach(genres => {
            if (genres.includes(user.favouriteGenre)) {
                favGenreBooks.push(b)
            }
        })
    });
    return (
        <div>
            <h3>Books in your favourite genre!</h3>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {favGenreBooks.length > 0 && favGenreBooks.map(b => (
                        <tr key={b.title}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations;