import { useState } from 'react'
/* eslint-disable react/prop-types */
import { gql, useMutation } from '@apollo/client'

const CREATE_BOOK = gql`
mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title,
      author {
        name
      },
      published,
      genres,
    }
  }
`

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [createBook] = useMutation(CREATE_BOOK, {
        onError: (error) => {
            console.log(error);
        },
    });
    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        console.log('add book...')
        const res = await createBook({
            variables: { title, author, published: Number(published), genres },
            context: {
                headers: { Authorization: `Bearer ${props?.user?.data?.login?.value}` }
            }
        })
        console.log("res", res)
        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook