/* eslint-disable react/prop-types */
import { gql, useQuery } from "@apollo/client"


const ALL_BOOKS = gql`
query {
    allBooks {
      title,
      author,
      published
    }
  }
`

const Books = (props) => {
    const { loading, data } = useQuery(ALL_BOOKS, { pollInterval: 10000 });
    if (!props.show) {
        return null
    }
    if (loading) {
        return <p>Loading from GraphQL...</p>
    }
    console.log(data)
    const books = data.allBooks;

    return (
        <div>
            <h2>books</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books && books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books