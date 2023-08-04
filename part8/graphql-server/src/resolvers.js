const Book = require("./schemas/Book")
const Author = require("./schemas/Author");
const User = require("./schemas/User");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken")

const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()


const resolvers = {
    Query: {
        bookCount: async () => await Book.countDocuments({}),
        authorCount: async () => await Author.countDocuments({}),
        allBooks: async () => await Book.find({}).populate("author"),
        allBooksByGenre: async (root, args, context) => {
            const genre = args.genre;
            if (genre === "ALL") {
                const books = await Book.find({}).populate("author");
                return books
            }
            // case insensitive
            const res = await Book.find({ genres: { $regex: new RegExp(genre, "i") } }).populate("author");
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
        // allAuthors: async () => await Author.find({}),
        // solves n + 1 problem
        allAuthors: async () => {
            const authors = await Author.aggregate([
                {
                    $lookup: {
                        from: "books",
                        localField: "_id",
                        foreignField: "author",
                        as: "books",
                    },
                },
                // bookCount by array size
                {
                    $project: {
                        name: 1,
                        bookCount: { $size: "$books" },
                    },
                },
            ]);

            return authors;
        },

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
                throw new GraphQLError("Not authenticated!", {
                    extensions: {
                        code: "BAD_USER_INPUT",
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
                const addedBook = await Book.findById(book._id).populate("author");
                pubsub.publish("BOOK_ADDED", { bookAdded: addedBook })
                return addedBook;
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
                throw new GraphQLError("Not authenticated!", {
                    extensions: {
                        code: "BAD_USER_INPUT",
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
                    throw new GraphQLError("Creating the user failed", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: username, favouriteGenre, error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== "secret") {
                throw new GraphQLError("wrong credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT"
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
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED")
        }
    }
}

module.exports = resolvers;