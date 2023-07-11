import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app.js";
import { Blog } from "../src/models/blog.js";
import { initialBlogs, nonExistingId, blogsInDb } from "../src/utils/test_helper.js"

const api = supertest(app);
mongoose.set("bufferTimeoutMS", 30000);


describe("when there is initially some blogs saved", () => {
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

    // results in error when _id etc are removed
    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body).toEqual(initialBlogs)
    })

    test("unique identifier is id", async () => {
        const response = await api.get("/api/blogs")
        response.body.forEach(blog => {
            expect(blog).toHaveProperty("id");
        });
    })

    describe("addition of a new blog", () => {
        test("succeeds with valid data", async () => {
            const newBlog = {
                title: "test entry",
                author: "tester man",
                url: "test.com/",
                likes: 70,
            }
            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)
            const blogsAtEnd = await blogsInDb()
            expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
            const contents = blogsAtEnd.map(n => n.title)
            expect(contents).toContain("test entry")
        })

        test("default likes to 0 if missing", async () => {
            const newBlog = {
                title: "test entry without likes",
                author: "tester man",
                url: "test.com/"
            }
            await api
                .post("/api/blogs")
                .send(newBlog)
            const blogsAtEnd = await blogsInDb()
            const contents = blogsAtEnd.map(n => n.likes)
            expect(contents.slice(-1)).toContain(0)
        })

        test("returns 400 if missing title", async () => {
            const newBlog = {
                author: "tester man",
                url: "test.com/"
            }
            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(400)
        })

        test("returns 400 if missing URL", async () => {
            const newBlog = {
                title: "testing without url",
                author: "tester man"
            }
            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(400)
        })
    })

    describe("deletion of a blog", () => {
        test("succeeds with status code 204 if id is valid", async () => {
            const blogsAtStart = await blogsInDb()
            const blogToDelete = blogsAtStart[0]
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await blogsInDb()
            expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
            const title = blogsAtEnd.map(r => r.title)
            expect(title).not.toContain(blogToDelete.title)
        })
    })

    describe("modifying likes of a blog", () => {
        test("succeeds with status code 200", async () => {
            const blogsAtStart = await blogsInDb()
            let blogToUpdate = blogsAtStart[0]
            blogToUpdate.likes = 123;
            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(200)

            const blogsAtEnd = await blogsInDb()
            expect(blogsAtEnd).toHaveLength(initialBlogs.length)
            const likes = blogsAtEnd.map(r => r.likes)
            expect(likes).toContain(blogToUpdate.likes)
        })
    })

})




afterAll(async () => {
    await mongoose.connection.close()
})