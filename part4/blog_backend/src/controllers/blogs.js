import Express from "express";
import { Blog } from "../models/blog.js"
const blogRouter = Express.Router();

// Note that express-async-error library handles
// errors for async functions

// Get blogs
blogRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs)
});

// Add blogs
blogRouter.post("/", async (req, res) => {
    let blog = new Blog(req.body);
    if (!blog.title || !blog.url) {
        return res.status(400).send("Missing title or url");
    }
    if (isNaN(blog.likes)) {
        blog.likes = 0;
    }
    const savedNote = await blog.save();
    res.status(201).json(savedNote);
});

blogRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    if (blog) {
        res.status(204).end();
    } else {
        res.status(404).send("Not found");
    }
});

blogRouter.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const originalBlog = await Blog.findById(id);
    const updatedBlog = {
        title: req.body.title || originalBlog.title,
        author: req.body.author || originalBlog.author,
        url: req.body.url || originalBlog.url,
        likes: req.body.likes || originalBlog.likes,
    };
    await Blog.findByIdAndUpdate(id, updatedBlog, { new: true, runValidators: true, context: "query" });
    res.status(200).json(updatedBlog);
});


export { blogRouter };
