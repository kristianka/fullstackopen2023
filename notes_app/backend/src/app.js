import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "express-async-errors";
import dotenv from "dotenv"
import notesRouter from "./controllers/notes.js";
import usersRouter from "./controllers/users.js"
import loginRouter from "./controllers/login.js";
import testingRouter from "./controllers/testingRouter.js";
import { getTokenFromReq, unknownEndpoint, errorHandler } from "./utils/middleware.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.NODE_ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI)
    .then(console.log("Connected to MongoDB notes application"))
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message);
        process.exit(1);
    });

morgan.token("body", req => {
    return JSON.stringify(req.body);
});

if (process.env.NODE_ENV !== "test") app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.use(getTokenFromReq);

app.use("/api/login", loginRouter);
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "test") {
    app.use("/api/testing", testingRouter);
}
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;