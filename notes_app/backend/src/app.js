import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import notesRouter from "./controllers/notes.js";
import { unknownEndpoint, errorHandler } from "./utils/middleware.js";
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
    .then(console.log("Connected to MongoDB notes application"))
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message);
        process.exit(1);
    });

morgan.token("body", req => {
    return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(cors());
app.use(express.static("build"));

app.use("/api/notes", notesRouter);
app.use(unknownEndpoint);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
