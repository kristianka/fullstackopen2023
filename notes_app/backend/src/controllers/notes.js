import express from "express"
const noteRouter = express.Router();
import { Note } from "../models/note.js";

noteRouter.get("/", (req, res, next) => {
    Note.find({})
        .then(notes => {
            res.json(notes);
        })
        .catch(err => next(err));
});

noteRouter.get("/info", (req, res, next) => {
    const currentTime = new Date().toUTCString();
    Note.count()
        .then(count => {
            res.send(`Notes app has ${count} notes <br /> ${currentTime}`);
        })
        .catch(err => next(err));
});

noteRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    Note.findById(id)
        .then(note => {
            if (note) {
                res.status(200).send(note);
            }
            next();
        })
        .catch(err => next(err));
});

noteRouter.post("/", (req, res, next) => {
    const note = new Note({
        content: req.body.content,
        important: req.body.important || false
    });
    console.log("IN POST")

    if (note.content === undefined) {
        return res.status(400).send("Missing content");
    }

    note.save()
        .then(savedNote => {
            console.log(`Added ${note.content}`);
            res.status(201).json(savedNote);
        })
        .catch(err => next(err));
});

noteRouter.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const updatedNote = {
        content: req.body.content,
        important: req.body.important || false
    };

    Note.findByIdAndUpdate(id, updatedNote, { new: true, runValidators: true, context: "query" })
        .then(updatedNote => {
            res.status(200).json(updatedNote);
            console.log(updatedNote);
        })
        .catch(err => next(err));
});

noteRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then(note => {
            if (note) {
                console.log(`Deleted ${note.content}`);
                res.status(204).end();
            }
            else {
                console.log(`No matches found with the id ${id}`);
                res.status(404).send("Not found");
            }
        })
        .catch(err => next(err));
});

export default noteRouter;