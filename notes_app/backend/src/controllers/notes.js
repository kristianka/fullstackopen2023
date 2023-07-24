import express from "express"
import jwt from "jsonwebtoken";
const noteRouter = express.Router();
import { Note } from "../models/note.js";
import { User } from "../models/user.js";
import { getUserFromReq } from "../utils/middleware.js";

const getTokenFrom = (req) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
}

// Note that express-async-error library handles
// errors for async functions
noteRouter.get("/", async (req, res, next) => {
    const notes = await Note
        .find({})
        .populate("user", { username: 1, name: 1 });
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

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).send("Invalid token");
    }
    const user = await User.findById(decodedToken.id);

    if (req.body.content === undefined) {
        return res.status(400).send("Missing content");
    }

    const note = new Note({
        content: req.body.content,
        important: req.body.important === undefined ? false : req.body.important,
        user: user._id
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
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

noteRouter.delete("/:id", getUserFromReq, async (req, res, next) => {
    if (!req.user.id) {
        return res.status(401).json({ error: "Invalid token" });
    }
    const note = await Note.findById(req.params.id);

    if (note?.user.toString() != req.user.id.toString()) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    // check if note exists if the user is authorized
    if (note) {
        // delete the note
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Successfully deleted" });
    } else {
        res.status(404).json({ error: "Not found" });
    }
});

export default noteRouter;