import Express from "express";
import jwt from "jsonwebtoken";
import { Blog } from "../models/blog.js"
import { User } from "../models/user.js"
import { Comment } from "../models/comment.js";
import { getUserFromReq } from "../utils/middleware.js";
const blogRouter = Express.Router();

// Note that express-async-error library handles
// errors for async functions

// Get blogs
blogRouter.get("/", async (req, res) => {
    const blogs = await Blog
        .find({})
        .populate("user", { username: 1, name: 1 })
        .populate("comments");
    res.json(blogs)
});

// Add blogs
blogRouter.post("/", getUserFromReq, async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
        return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        author: req.body.author,
        title: req.body.title,
        url: req.body.url,
        likes: req.body.likes === undefined ? 0 : req.body.likes,
        user: user._id
    })

    if (!blog.title || !blog.url) {
        return res.status(400).json({ error: "Missing title or url" });
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", getUserFromReq, async (req, res) => {
    if (!req.user.id) {
        return res.status(401).json({ error: "Invalid token" });
    }
    const blog = await Blog.findById(req.params.id);
    console.log(blog.user)
    console.log(req.user);
    if (blog?.user.toString() != req.user.id.toString()) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    // check if blog exists if the user is authorized
    if (blog) {
        // delete the blog
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Successfully deleted" });
    } else {
        res.status(404).json({ error: "Not found" });
    }
});

// add a like
blogRouter.put("/:id", getUserFromReq, async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
        console.log("no token")
        return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findById(decodedToken.id);
    const id = req.params.id;
    const originalBlog = await Blog.findById(id);

    if (!originalBlog) {
        return res.status(404).json({ error: "Not found" });
    }

    const updatedBlog = {
        title: originalBlog.title,
        author: originalBlog.author,
        url: originalBlog.url,
        likes: originalBlog.likes + 1
    };
    if (user && originalBlog) {
        await Blog.findByIdAndUpdate(id, updatedBlog, { new: true, runValidators: true, context: "query" });
        res.status(200).json(updatedBlog);
    }
});

// Comments
blogRouter.post("/:id/comments", async (req, res) => {
    console.log("posting comment")
    const { id } = req.params;
    const { content } = req.body;
    if (!id || !content) {
        return res.status(400).json({ error: "Missing blog id or comment body" });
    }
    const comment = new Comment({ content, blog: id });
    await comment.save();

    const blog = await Blog.findById(id);
    blog.comments.push(comment);
    await blog.save();
    res.status(201).json(comment);
});

blogRouter.get("/:id/comments", async (req, res) => {
    const { id } = req.params;
    console.log("getting comments from id", id)
    const comments = await Comment.find({ blog: id });
    res.status(200).json(comments);
})

export default blogRouter;
