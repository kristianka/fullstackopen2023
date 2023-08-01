const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const Book = require("./schemas/Book")
const Author = require("./schemas/Author");
const User = require("./schemas/User");
const { GraphQLError } = require("graphql");
const jwt = require('jsonwebtoken')

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message)
    })

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
    }
`

const resolvers = {
    Query: {
        bookCount: async () => await Book.countDocuments({}),
        authorCount: async () => await Author.countDocuments({}),
        allBooks: async () => await Book.find({}).populate("author"),
        allBooksByGenre: async (root, args, context) => {
            const genre = args.genre;
            if (genre === "ALL") {
                return await Book.find({}).populate("author");
            }
            // case insensitive
            const res = await Book.find({ genres: { $regex: new RegExp(genre, 'i') } }).populate('author');
            return res;
        },
        allGenres: async (root, args, context) => {
            const books = await Book.find({}).populate("author");
            const uniqueGenresTemp = new Set();
            books.map(b => {
                b.genres.forEach(genre => {
                    if (!uniqueGenresTemp.has(genre.toUpperCase())) {
                        uniqueGenresTemp.add(genre.toUpperCase());
                    }
                })
            });
            const uniqueGenres = Array.from(uniqueGenresTemp);
            return uniqueGenres;
        },
        allAuthors: async () => await Author.find({}),
        me: async (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (parent) => {
            const books = await Book.find({ author: parent._id });
            return books.length;
        },
    },

    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('Not authenticated!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            try {
                const { title, author: authorName, published, genres } = args;

                // checks if author already exists so no need to duplicate authors
                let author = await Author.findOne({ name: authorName });
                if (!author) {
                    author = new Author({ name: authorName });
                    await author.save();
                }

                const book = new Book({
                    title,
                    published,
                    genres,
                    author: author._id,
                });

                await book.save();
                return await Book.findById(book._id).populate("author");
            } catch (error) {
                throw new GraphQLError("Adding book failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: title, authorName, published, genres, error
                    }
                });
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            console.log(currentUser)
            if (!currentUser) {
                throw new GraphQLError('Not authenticated!', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            try {
                let author = await Author.findOne({ name: args.name });
                author.born = args.setBornTo;
                await author.save();
                return author;
            } catch (error) {
                throw new GraphQLError("Editing author failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name, args, error
                    }
                })
            }
        },
        createUser: async (root, { username, favouriteGenre }) => {
            const user = new User({ username, favouriteGenre })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: username, favouriteGenre, error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET) || null;
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})