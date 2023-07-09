import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app.js";
import { Note } from "../src/models/note.js";
import { initialNotes, nonExistingId, notesInDb } from "./test_helper.js"

const api = supertest(app);
mongoose.set("bufferTimeoutMS", 30000);

describe("when there is initially some notes saved", () => {
    beforeEach(async () => {
        await Note.deleteMany({})
        await Note.insertMany(initialNotes)
    })

    test("notes are returned as json", async () => {
        await api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    }, 10000)

    test("all notes are returned", async () => {
        const response = await api.get("/api/notes")
        expect(response.body).toHaveLength(initialNotes.length)
    }, 10000)

    test("a specific note is within the returned notes", async () => {
        const response = await api.get("/api/notes")
        const contents = response.body.map(r => r.content)
        expect(contents).toContain(
            "Browser can execute only JavaScript"
        )
    }, 10000)

    describe("viewing a specific note", () => {
        test("succeeds with a valid id", async () => {
            const notesAtStart = await notesInDb()
            const noteToView = notesAtStart[0]
            const resultNote = await api
                .get(`/api/notes/${noteToView.id}`)
                .expect(200)
                .expect("Content-Type", /application\/json/)

            expect(resultNote.body).toEqual(noteToView)
        }, 10000)

        test("fails with statuscode 404 if note does not exist", async () => {
            const validNonexistingId = await nonExistingId()
            console.log(validNonexistingId)
            await api
                .get(`/api/notes/${validNonexistingId}`)
                .expect(404)
        }, 10000)

        test("fails with statuscode 400 id is invalid", async () => {
            const invalidId = "5a3d5da59070081a82a3445"
            await api
                .get(`/api/notes/${invalidId}`)
                .expect(400)
        }, 10000)
    })

    describe("addition of a new note", () => {
        test("succeeds with valid data", async () => {
            const newNote = {
                content: "async/await simplifies making async calls",
                important: true,
            }
            await api
                .post("/api/notes")
                .send(newNote)
                .expect(201)
                .expect("Content-Type", /application\/json/)
            const notesAtEnd = await notesInDb()
            expect(notesAtEnd).toHaveLength(initialNotes.length + 1)
            const contents = notesAtEnd.map(n => n.content)
            expect(contents).toContain(
                "async/await simplifies making async calls"
            )
        }, 10000)

        test("fails with status code 400 if data invalid", async () => {
            const newNote = {
                important: true
            }
            await api
                .post("/api/notes")
                .send(newNote)
                .expect(400)
            const notesAtEnd = await notesInDb()
            expect(notesAtEnd).toHaveLength(initialNotes.length)
        }, 10000)
    })

    describe("deletion of a note", () => {
        test("succeeds with status code 204 if id is valid", async () => {
            const notesAtStart = await notesInDb()
            const noteToDelete = notesAtStart[0]
            await api
                .delete(`/api/notes/${noteToDelete.id}`)
                .expect(204)

            const notesAtEnd = await notesInDb()
            expect(notesAtEnd).toHaveLength(
                initialNotes.length - 1
            )
            const contents = notesAtEnd.map(r => r.content)
            expect(contents).not.toContain(noteToDelete.content)
        }, 10000)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})