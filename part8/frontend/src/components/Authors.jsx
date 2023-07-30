/* eslint-disable react/prop-types */
import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react';

const ALL_AUTHORS = gql`
query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $born
    ) {
        name,
        born
    }
  }
`

const Authors = (props) => {
    const { loading, data } = useQuery(ALL_AUTHORS);
    const [name, setName] = useState("");
    const [born, setBorn] = useState(0);
    const [updateAuthor] = useMutation(UPDATE_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] });

    if (!props.show) {
        return null
    }
    if (loading) {
        return <p>Loading from GraphQL...</p>
    }
    console.log(data)
    const authors = data.allAuthors;
    const submit = async (event) => {
        event.preventDefault()
        console.log('add book...')
        updateAuthor({ variables: { name, born: Number(born) } })
    }
    console.log(name)
    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors && authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <div>
                    name
                    {/* <input value={name} onChange={({ target }) => setName(target.value)} /> */}
                    <select name="authorName" value={name} onChange={({ target }) => setName(target.value)}>
                        {authors && authors.map(a => (
                            <option key={a.name} value={a.name}>{a.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    born
                    <input value={born} onChange={({ target }) => setBorn(target.value)} />
                </div>
                <button type="submit">Update author</button>
            </form>

        </div>
    )
}

export default Authors