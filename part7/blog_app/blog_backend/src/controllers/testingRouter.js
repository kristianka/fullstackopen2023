import express from "express";
import mongoose from "mongoose";
import { Blog } from "../models/blog.js";
import { User } from "../models/user.js";

const testingRouter = express.Router();

testingRouter.post("/reset", async (req, res) => {
    console.log("in delete")
    await Blog.deleteMany({});
    await User.deleteMany({});
    res.status(204).end();
});

export default testingRouter;