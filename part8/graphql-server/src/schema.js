const typeDefs = `
    type User {
        username: String!,
        favouriteGenre: String!,
        id: ID!
    },
    type Token {
        value: String!
    },
    type Author {
        name: String!,
        id: String!
        born: Int,
        bookCount: Int!
    },
    type Book {
        title: String!,
        published: Int!,
        author: Author!,
        id: String!,
        genres: [String!]
    },
    type Mutation {
        addBook(title: String!, author: String!, published: Int, genres: [String!]) : Book,
        editAuthor(name: String!,setBornTo: Int!) : Author,
        createUser(username: String!,favouriteGenre: String!) : User,
        login(username: String!, password: String!) : Token
    },
    type Query {
      bookCount: Int!,
      authorCount: Int!,
      allBooks(author: String, genre: String) : [Book!]!,
      allBooksByGenre(author: String, genre: String) : [Book!]!,
      allGenres: [String!],
      allAuthors: [Author!]!,
      me: User
    },
    type Subscription {
        bookAdded: Book!
    }    
`
module.exports = typeDefs;