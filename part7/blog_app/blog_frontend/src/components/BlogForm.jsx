/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ author: "", title: "", url: "" });

    const handleTitleChange = (event) => {
        setNewBlog({ ...newBlog, title: event.target.value });
    };
    const handleAuthorChange = (event) => {
        setNewBlog({ ...newBlog, author: event.target.value });
    };
    const handleUrlChange = (event) => {
        setNewBlog({ ...newBlog, url: event.target.value });
    };

    const addBlog = (event) => {
        event.preventDefault();
        const newBlogCopy = newBlog;
        createBlog(newBlogCopy);
        setNewBlog({ author: "", title: "", url: "" });
    };

    return (
        <div className="formDiv">
            <form onSubmit={addBlog}>
                <TextField value={newBlog.title} onChange={handleTitleChange} label="Title"></TextField>
                <TextField value={newBlog.author} onChange={handleAuthorChange} label="Author"></TextField>
                <TextField value={newBlog.url} onChange={handleUrlChange} label="Link"></TextField>
                <Button variant="contained" color="inherit" type="submit" >Add</Button>
            </form>
        </div>
    );
};

export default BlogForm;