import express from "express"
const noteRouter = express.Router();
import { Note } from "../models/note.js";

// Note that express-async-error library handles
// errors for awaits

noteRouter.get("/", async (req, res, next) => {
    const notes = await Note.find({});
    res.json(notes);
});

noteRouter.get("/info", async (req, res, next) => {
    const currentTime = new Date().toUTCString();
    const count = await Note.count();
    res.send(`Notes app has ${count} notes <br /> ${currentTime}`);
});

noteRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (note) {
        res.status(200).send(note);
    } else {
        next();
    }
});

noteRouter.post("/", async (req, res, next) => {
    const note = new Note({
        content: req.body.content,
        important: req.body.important || false
    });

    if (note.content === undefined) {
        return res.status(400).send("Missing content");
    }

    const savedNote = await note.save();
    console.log(`Added ${note.content}`);
    res.status(201).json(savedNote);
});

noteRouter.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const updatedNote = {
        content: req.body.content,
        important: req.body.important || false
    };

    await Note.findByIdAndUpdate(id, updatedNote, { new: true, runValidators: true, context: "query" });
    res.status(200).json(updatedNote);
});

noteRouter.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    const note = await Note.findByIdAndDelete(id);
    if (note) {
        console.log(`Deleted ${note.content}`);
        res.status(204).end();
    } else {
        console.log(`No matches found with the id ${id}`);
        res.status(404).send("Not found");
    }
});

export default noteRouter;