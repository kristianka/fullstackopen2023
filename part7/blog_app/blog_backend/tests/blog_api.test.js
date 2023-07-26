import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app.js";
import bcrypt from "bcrypt";
import { Blog } from "../src/models/blog.js";
import { User } from "../src/models/user.js";
import { usersInDb } from "./test_helper.js";
import { initialBlogs, nonExistingId, blogsInDb } from "../src/utils/test_helper.js"

const api = supertest(app);
mongoose.set("bufferTimeoutMS", 30000);


describe("when there is initially some blogs saved without users", () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
    })

    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("amount of blogs is returned", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    // modified to remove id
    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs");
        const blogs = response.body.map(({ id, ...rest }) => rest);
        expect(blogs).toEqual(initialBlogs);
    });

    test("unique identifier is id", async () => {
        const response = await api.get("/api/blogs")
        response.body.forEach(blog => {
            expect(blog).toHaveProperty("id");
        });
    })
})

describe("when there is initially one user at db", () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        const passwordHash = await bcrypt.hash("sekret", 10)
        const user = new User({ username: "root", name: "root", password: passwordHash })
        await user.save()
    })

    describe("user creation", () => {
        test("creation succeeds with a fresh username", async () => {
            const usersAtStart = await usersInDb()
            const newUser = {
                username: "kristian1",
                name: "kristiaaaaaaaaaaaan",
                password: "jeejee123"
            }
            await api
                .post("/api/users")
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            const usersAtEnd = await usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
        })

        test("creation fails with proper statuscode and message if username already taken", async () => {
            const usersAtStart = await usersInDb()
            const newUser = {
                username: "root",
                name: "Superuser",
                password: "salainen",
            }

            const result = await api
                .post("/api/users")
                .send(newUser)
                .expect(400)
                .expect("Content-Type", /application\/json/)

            expect(result.body.error).toContain("expected `username` to be unique")
            const usersAtEnd = await usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test("creation fails if username is too short", async () => {
            const usersAtStart = await usersInDb()
            const newUser = {
                username: "ro",
                name: "Superuser",
                password: "salainen",
            }

            const result = await api
                .post("/api/users")
                .send(newUser)
                .expect(400)
                .expect("Content-Type", /application\/json/)

            expect(result.body.error).toContain("Username minimum length is 3")
            const usersAtEnd = await usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test("creation fails if password is too short", async () => {
            const usersAtStart = await usersInDb()
            const newUser = {
                username: "einari55",
                name: "einari",
                password: "12",
            }

            const result = await api
                .post("/api/users")
                .send(newUser)
                .expect(400)
                .expect("Content-Type", /application\/json/)

            expect(result.body.error).toContain("Password minimum length is 3")
            const usersAtEnd = await usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })
    })

    describe("blog creation", () => {
        test("posting a blog fails without token aka logging in", async () => {
            const blogsAtStart = await blogsInDb();
            const newBlog = {
                title: "Test title",
                author: "Test author",
                url: "testurl.com",
                likes: 123
            }
            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(401)
                .expect("Content-Type", /application\/json/)

            const blogsAtEnd = await blogsInDb();
            expect(blogsAtEnd).toEqual(blogsAtStart);
        })

        test("returns 400 if missing title", async () => {
            const blogsAtStart = await blogsInDb();
            const newBlog = {
                author: "tester man",
                url: "test.com/"
            }
            const newUser = {
                username: "kristian1",
                name: "kristiaaaaaaaaaaaan",
                password: "jeejee123"
            }
            // create user
            await api
                .post("/api/users")
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            // login
            const loginInfo = {
                username: newUser.username,
                password: newUser.password
            }
            const loginReply = await api
                .post("/api/login")
                .send(loginInfo)
                .expect(200)
                .expect("Content-Type", /application\/json/)

            await api
                .post("/api/blogs")
                .set("Authorization", `Bearer ${loginReply.body.token}`)
                .send(newBlog)
                .expect(400)
                .expect("Content-Type", /application\/json/)

            const blogsAtEnd = await blogsInDb();
            expect(blogsAtEnd).toEqual(blogsAtStart);
        })

        test("returns 400 if missing url", async () => {
            const blogsAtStart = await blogsInDb();
            const newBlog = {
                title: "test",
                author: "tester man",
            }
            const newUser = {
                username: "kristian1",
                name: "kristiaaaaaaaaaaaan",
                password: "jeejee123"
            }
            // create user
            await api
                .post("/api/users")
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            // login
            const loginInfo = {
                username: newUser.username,
                password: newUser.password
            }
            const loginReply = await api
                .post("/api/login")
                .send(loginInfo)
                .expect(200)
                .expect("Content-Type", /application\/json/)

            await api
                .post("/api/blogs")
                .set("Authorization", `Bearer ${loginReply.body.token}`)
                .send(newBlog)
                .expect(400)
                .expect("Content-Type", /application\/json/)

            const blogsAtEnd = await blogsInDb();
            expect(blogsAtEnd).toEqual(blogsAtStart);
        })

        test("adding a new blog with a new user succeeds", async () => {
            // create a new user
            const usersAtStart = await usersInDb()
            const newUser = {
                username: "kristian1",
                name: "kristiaaaaaaaaaaaan",
                password: "jeejee123"
            }

            const userCreationReply = await api
                .post("/api/users")
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            // login
            const loginInfo = {
                username: newUser.username,
                password: newUser.password
            }
            const loginReply = await api
                .post("/api/login")
                .send(loginInfo)
                .expect(200)
                .expect("Content-Type", /application\/json/)

            // let's create a new blog
            const newBlog = {
                title: "Test title",
                author: "Test author",
                url: "testurl.com",
                likes: 123
            }
            await api
                .post("/api/blogs")
                .set("Authorization", `Bearer ${loginReply.body.token}`)
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            const usersAtEnd = await usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)

            const blogsAtEnd = await blogsInDb();
            const foundBlog = blogsAtEnd.find(blog => blog.title === newBlog.title && blog.author === newBlog.author &&
                blog.url === newBlog.url && blog.likes === newBlog.likes);

            expect(foundBlog).toBeDefined();
            expect(foundBlog.user.toString()).toBe(userCreationReply.body.id.toString())
        })

        test("default likes to 0 if missing", async () => {
            const newUser = {
                username: "kristian1",
                name: "kristiaaaaaaaaaaaan",
                password: "jeejee123"
            }

            const userCreationReply = await api
                .post("/api/users")
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            // login
            const loginInfo = {
                username: newUser.username,
                password: newUser.password
            }
            const loginReply = await api
                .post("/api/login")
                .send(loginInfo)
                .expect(200)
                .expect("Content-Type", /application\/json/)

            const newBlog = {
                title: "test entry without likes",
                author: "tester man",
                url: "test.com/"
            }

            await api
                .post("/api/blogs")
                .set("Authorization", `Bearer ${loginReply.body.token}`)
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            const blogsAtEnd = await blogsInDb();
            const foundBlog = blogsAtEnd.find(blog => blog.title === newBlog.title && blog.author === newBlog.author &&
                blog.url === newBlog.url && blog.likes === 0);

            expect(foundBlog).toBeDefined();
            expect(foundBlog.user.toString()).toBe(userCreationReply.body.id.toString())

        })
    })

    describe("blog deletion", () => {
        test("user deleting own blog succeeds", async () => {
            // create a new user
            const usersAtStart = await usersInDb()
            const newUser = {
                username: "kristian1",
                name: "kristiaaaaaaaaaaaan",
                password: "jeejee123"
            }

            await api
                .post("/api/users")
                .send(newUser)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            // login
            const loginInfo = {
                username: newUser.username,
                password: newUser.password
            }
            const loginReply = await api
                .post("/api/login")
                .send(loginInfo)
                .expect(200)
                .expect("Content-Type", /application\/json/)

            // let's create a new blog
            const newBlog = {
                title: "Test title",
                author: "Test author",
                url: "testurl.com",
                likes: 123
            }
            const postReply = await api
                .post("/api/blogs")
                .set("Authorization", `Bearer ${loginReply.body.token}`)
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)

            // let's delete the blog
            await api
                .delete(`/api/blogs/${postReply.body.id}`)
                .set("Authorization", `Bearer ${loginReply.body.token}`)
                .expect(200)
                .expect("Content-Type", /application\/json/)

            const usersAtEnd = await usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)

            // search for a blog matching details 
            const blogsAtEnd = await blogsInDb();
            const foundBlog = blogsAtEnd.find(blog => blog.title === newBlog.title && blog.author === newBlog.author &&
                blog.url === newBlog.url && blog.likes === newBlog.likes);

            expect(!foundBlog).toBeDefined();
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})

// describe("modifying likes of a blog", () => {
//     test("succeeds with status code 200", async () => {
//         const blogsAtStart = await blogsInDb()
//         let blogToUpdate = blogsAtStart[0]
//         blogToUpdate.likes = 123;
//         await api
//             .put(`/api/blogs/${blogToUpdate.id}`)
//             .send(blogToUpdate)
//             .expect(200)

//         const blogsAtEnd = await blogsInDb()
//         expect(blogsAtEnd).toHaveLength(initialBlogs.length)
//         const likes = blogsAtEnd.map(r => r.likes)
//         expect(likes).toContain(blogToUpdate.likes)
//     })
// })

